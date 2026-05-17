# Weather API

![build](https://github.com/umeshkumar258/Wheather-api/actions/workflows/nodejs.yml/badge.svg)
![license](https://img.shields.io/badge/license-MIT-green)

Simple demo: Node + Express backend serving a static frontend that fetches weather information.

## Description

This small project demonstrates a minimal weather lookup app with a Node/Express server (`server.js`) and a static frontend (`public/`):

- `public/index.html` — frontend UI
- `public/script.js` — client-side logic
- `public/style.css` — basic styles
- `server.js` — Express server that serves static files and can proxy requests

Use this repository as a learning example or a starting point for a small weather-related project.

## Features

- Minimal Node/Express setup
- Static frontend that calls a weather API (add your API key in a `.env` file)
- Easy to run locally

## Requirements

- Node.js 16+ (recommended)
- An API key from a weather provider if you plan to call an external API

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root (if your code uses environment variables) and add any keys, for example:

```
API_KEY=your_api_key_here
PORT=3000
```

3. Start the server:

```bash
npm start
```

4. Open the frontend in your browser: http://localhost:3000

## Files of interest

- [public/index.html](public/index.html) — UI
- [public/script.js](public/script.js) — client code
- [server.js](server.js) — server entry
- [package.json](package.json) — npm metadata and scripts

## How to publish to GitHub

If you already have a GitHub repository created, push with these commands:

```bash
git init
git add .
git commit -m "Initial commit: add Weather API demo"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Alternatively, use the GitHub CLI to create and push a new repo:

```bash
gh repo create <your-repo> --public --source=. --remote=origin --push
```

## Suggested repository description

"Minimal Weather API demo: Node/Express backend with a static frontend demonstrating weather lookup and fetch-based client calls. Good for learning and quick prototyping."

## Continuous Integration

This repository includes a GitHub Actions workflow that runs on pushes and pull requests against `main`. It installs dependencies and runs `npm test`.

If you add tests later, CI will run them automatically.

## License

This project is provided without a license. Add a `LICENSE` file if you have a preferred license (MIT recommended for demos).
