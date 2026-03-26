# 📅 Feriados do Mundo

An interactive global holidays explorer that displays holidays for any country and year with detailed information and statistics.

## Features

- **Multi-Country Selection** — Browse holidays from 15 different countries including Brazil, USA, Portugal, Japan, and more
- **Year Range Selection** — View holidays for years from 2 years in the past to 2 years in the future
- **Monthly Organization** — Holidays are grouped and displayed by month for easy scanning
- **Local & International Names** — Each holiday shows both the local name and English translation
- **Holiday Classification** — Displays the type of holiday (public, observance, bank, etc.)
- **Today Indicator** — Automatically highlights if today is a holiday with a "HOJE" (TODAY) badge
- **Holiday Count** — Shows total number of holidays for the selected country/year
- **Holiday Statistics** — Displays overview data about holidays

## How It Works

1. Select a **País** (Country) from the dropdown
2. Choose a **Ano** (Year) from the available options
3. Click **Buscar** (Search) to fetch the holidays
4. View all holidays grouped by month with dates, names, and types
5. See highlighted badges if any day is today

## Holiday Information Display

Each holiday card shows:
- **Date** — Day number and day of week name
- **Local Name** — Holiday name in the country's language (e.g., "Carnaval" in Portuguese)
- **International Name** — Holiday name in English
- **Holiday Type** — Classification of the holiday (Public Holiday, Observance, etc.)
- **Today Badge** — Special indicator if it's the current date

## Technologies Used

- **HTML** — Dynamic page structure
- **CSS** — Grid-based layout for months
- **JavaScript (ES6+)** — Async/await for API calls, date formatting, grouping logic

## API

- **Nager.date** — `https://date.nager.at/api/v3/publicholidays/{year}/{country}`

## Countries Supported

Brazil 🇧🇷, USA 🇺🇸, Portugal 🇵🇹, Argentina 🇦🇷, Germany 🇩🇪, France 🇫🇷, Spain 🇪🇸, Italy 🇮🇹, Japan 🇯🇵, UK 🇬🇧, Canada 🇨🇦, Mexico 🇲🇽, Chile 🇨🇱, Colombia 🇨🇴, Australia 🇦🇺

## Error Handling

- Loading state during API request: "Buscando feriados..."
- Graceful error message if holidays cannot be found
- Placeholder message when no selection is made

---

**Plan your travels and events with accurate holiday information! 📅✈️**
