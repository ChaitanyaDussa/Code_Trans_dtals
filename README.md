# Smart Code Translator — Part 2 (AI Features)

Completed implementation of the AI-powered core features on top of Part 1's
auth system: code translation, complexity analysis, optimization, explanation,
and operation history — powered by Google Gemini.

## Setup

### Server
```
cd server
npm install
cp .env.example .env   # then fill in MONGODB_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GEMINI_API_KEY
npm run dev
```

### Client
```
cd client
npm install
cp .env.example .env   # then fill in VITE_GOOGLE_CLIENT_ID
npm run dev
```

The client runs on http://localhost:5173 and the server on http://localhost:5000.

## What's included
- Gemini AI config + service wrapper, language constants, prompt templates,
  response-cleaning utilities.
- Code services: translate, analyze (Big-O), optimize, explain.
- History model + service (pagination, delete, clear-all) and controllers.
- Code + history routes, all authenticated, wired into the central route registry.
- Frontend: Monaco-based CodeEditor, LanguageSelector, OutputPanel (per-action
  rendering), HomePage (toolbar + dual-panel editor/output), HistoryPage
  (paginated list + detail view), full App routing with Navbar.

Get a Gemini API key at https://aistudio.google.com before running the server.
