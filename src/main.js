import './style.css'

// Lista de países disponíveis na API
const countries = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'DE', name: 'Alemanha', flag: '🇩🇪' },
  { code: 'FR', name: 'França', flag: '🇫🇷' },
  { code: 'ES', name: 'Espanha', flag: '🇪🇸' },
  { code: 'IT', name: 'Itália', flag: '🇮🇹' },
  { code: 'JP', name: 'Japão', flag: '🇯🇵' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colômbia', flag: '🇨🇴' },
  { code: 'AU', name: 'Austrália', flag: '🇦🇺' },
]

const currentYear = new Date().getFullYear()
const yearOptions = []
for (let y = currentYear - 2; y <= currentYear + 2; y++) {
  yearOptions.push(y)
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <span class="header-icon">📅</span>
      <h1>Feriados do Mundo</h1>
      <p class="subtitle">Descubra os feriados de qualquer país</p>
    </header>

    <div class="filters">
      <div class="filter-group">
        <label for="country-select">País</label>
        <select id="country-select">
          ${countries.map(c => `<option value="${c.code}" ${c.code === 'BR' ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label for="year-select">Ano</label>
        <select id="year-select">
          ${yearOptions.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
        </select>
      </div>
      <button id="search-btn" type="button">Buscar</button>
    </div>

    <div id="results" class="results">
      <div class="placeholder-text">Selecione um país e ano para ver os feriados</div>
    </div>

    <div id="stats" class="stats hidden"></div>
  </div>
`

const countrySelect = document.querySelector('#country-select')
const yearSelect = document.querySelector('#year-select')
const searchBtn = document.querySelector('#search-btn')
const resultsDiv = document.querySelector('#results')
const statsDiv = document.querySelector('#stats')

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

async function fetchHolidays() {
  const country = countrySelect.value
  const year = yearSelect.value

  resultsDiv.innerHTML = '<div class="loading-text">Buscando feriados...</div>'
  statsDiv.classList.add('hidden')

  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`)

    if (!response.ok) throw new Error('Erro ao buscar feriados')

    const holidays = await response.json()

    if (holidays.length === 0) {
      resultsDiv.innerHTML = '<div class="placeholder-text">Nenhum feriado encontrado para este país/ano.</div>'
      return
    }

    renderHolidays(holidays, country)
    renderStats(holidays)
  } catch (error) {
    resultsDiv.innerHTML = '<div class="error-text">❌ Erro ao buscar feriados. Tente novamente.</div>'
    console.error('Erro na API:', error)
  }
}

function renderHolidays(holidays, countryCode) {
  const countryInfo = countries.find(c => c.code === countryCode)

  // Agrupa feriados por mês
  const grouped = {}
  holidays.forEach(h => {
    const date = new Date(h.date + 'T00:00:00')
    const month = date.getMonth()
    if (!grouped[month]) grouped[month] = []
    grouped[month].push({ ...h, dateObj: date })
  })

  let html = `<div class="results-header">
    <h2>${countryInfo.flag} Feriados de ${countryInfo.name} — ${yearSelect.value}</h2>
    <span class="holiday-count">${holidays.length} feriados</span>
  </div>`

  html += '<div class="months-grid">'

  for (const [monthIndex, monthHolidays] of Object.entries(grouped)) {
    html += `
      <div class="month-section">
        <h3 class="month-title">${monthNames[monthIndex]}</h3>
        <div class="holiday-list">
          ${monthHolidays.map(h => {
            const day = h.dateObj.getDate()
            const dayName = dayNames[h.dateObj.getDay()]
            const isToday = isSameDay(h.dateObj, new Date())
            const typeLabel = getTypeLabel(h.types)

            return `
              <div class="holiday-card ${isToday ? 'today' : ''}">
                <div class="holiday-date">
                  <span class="day-number">${day}</span>
                  <span class="day-name">${dayName}</span>
                </div>
                <div class="holiday-info">
                  <span class="holiday-name">${h.localName}</span>
                  <span class="holiday-name-intl">${h.name}</span>
                  ${typeLabel ? `<span class="holiday-type">${typeLabel}</span>` : ''}
                </div>
                ${isToday ? '<span class="today-badge">HOJE</span>' : ''}
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  html += '</div>'
  resultsDiv.innerHTML = html
}

function renderStats(holidays) {
  // Conta feriados por dia da semana
  const dayCounts = new Array(7).fill(0)
  holidays.forEach(h => {
    const date = new Date(h.date + 'T00:00:00')
    dayCounts[date.getDay()]++
  })

  const maxCount = Math.max(...dayCounts)

  statsDiv.innerHTML = `
    <h3>📊 Distribuição por dia da semana</h3>
    <div class="stats-bars">
      ${dayCounts.map((count, i) => `
        <div class="stats-bar-item">
          <span class="stats-day">${dayNames[i].slice(0, 3)}</span>
          <div class="stats-bar-bg">
            <div class="stats-bar" style="height: ${maxCount > 0 ? (count / maxCount) * 100 : 0}%;"></div>
          </div>
          <span class="stats-count">${count}</span>
        </div>
      `).join('')}
    </div>
  `
  statsDiv.classList.remove('hidden')
}

function isSameDay(d1, d2) {
  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
}

function getTypeLabel(types) {
  if (!types || types.length === 0) return ''
  const map = {
    Public: '🏛️ Nacional',
    Bank: '🏦 Bancário',
    School: '🎒 Escolar',
    Optional: '📌 Opcional',
    Authorities: '⚖️ Governo',
    Observance: '👁️ Observância',
  }
  return types.map(t => map[t] || t).join(', ')
}

// Eventos
searchBtn.addEventListener('click', fetchHolidays)

// Carregar Brasil ao abrir
fetchHolidays()