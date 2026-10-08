# DevBoard

DevBoard is a responsive event discovery web application for finding tech hackathons, workshops, conferences, and meetups.

It helps users discover opportunities, search and filter events, view complete event details, save favourites, register for events, and track their progress through a personalised profile.

## Live Demo

[Open DevBoard](https://rmsudhir2008-cyber.github.io/devboard/)

## Demo Login

Use these credentials to access the demo:

- Login ID: `frontdev`
- Password: `12345678`

> Note: This is a frontend demo login and is not intended as secure production authentication.

## Features

- Browse 2,000 tech opportunities
  - 500 Hackathons
  - 500 Workshops
  - 500 Conferences
  - 500 Meetups
- Case-insensitive search by event name, keyword, location, tag, or organiser
- Category filters and sorting by date or category
- Search and filtering work together
- Separate detailed page for every event
- Event details include date, location, member count, registration deadline, benefits, eligibility, speakers, organisers, and timeline
- Save and remove favourite events with instant updates
- Duplicate favourites and registrations are prevented
- Registration form with team size and focus-track selection
- Profile page with saved events, registrations, achievements, profile completion, and days remaining until registered events
- Personalised experience for Students, Professors, and Tech Analysts
- Light and dark mode
- Responsive desktop, tablet, and mobile layouts
- Loading state, empty state, and no-results state
- Subtle animations and micro-interactions
- Accessibility improvements using semantic HTML and ARIA labels

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser Local Storage
- GitHub Pages
- GitHub Actions

## Architecture

The project uses reusable React components instead of placing all functionality in one file.

```text
src/
├── components/
│   ├── LoginPage.jsx
│   ├── WelcomeLoader.jsx
│   ├── RolePicker.jsx
│   ├── Header.jsx
│   ├── Filters.jsx
│   ├── EventGrid.jsx
│   ├── EventCard.jsx
│   ├── OpportunityPage.jsx
│   ├── RegistrationForm.jsx
│   ├── ProfilePage.jsx
│   └── Toast.jsx
├── data/
│   ├── events.js
│   └── profiles.js
├── App.jsx
├── main.jsx
└── styles.css
