# ⚡ Futsal Companion

> AI-powered web app for tracking the Brazilian Futsal League — standings, stats, rules, and match summaries in one place.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat-square&logo=tailwindcss)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-latest-black?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## The Problem

Following the Liga Nacional de Futsal is harder than it should be. Standings are scattered across different websites, the rulebook is buried in PDFs nobody reads, and understanding tiebreaker criteria requires cross-referencing multiple sources. There is no single place that gives you the full picture with context.

Futsal Companion fixes that. It brings live standings, match data, and an AI layer that lets you ask questions in plain language and get clear, contextual answers.

---

## Features

- **Live Standings Table** — Updated classifications with group breakdowns, points, wins, losses, and goal difference
- **AI Match Summaries** — Automatically generated round summaries with highlights and narrative context
- **Conversational Q&A** — Ask questions like _"If team X wins tonight, where do they finish?"_ and get real answers based on live data
- **Rule Explainer** — Plain-language explanations of competition rules, tiebreaker criteria, promotion and relegation logic
- **Round History** — Browse past rounds with AI-generated recaps

---

## AI Architecture

This project uses a **context injection pattern** rather than fine-tuning or a vector database. Before each LLM call, the current standings, round results, and relevant competition rules are serialized and injected into the system prompt as structured context.

This means the model always reasons over real, fresh data instead of relying on training knowledge — which is critical for a competition that updates weekly.

```
User question
     │
     ▼
Fetch live data (standings + recent results)
     │
     ▼
Build system prompt with injected context
     │
     ▼
LLM call via Vercel AI SDK (streaming)
     │
     ▼
Streamed response rendered in chat UI
```

For match summary generation, the app uses **structured output** to ensure the model returns a consistent JSON shape that feeds directly into UI components without additional parsing logic.

For detailed decisions, see [`/docs/AI_ARCHITECTURE.md`](./docs/AI_ARCHITECTURE.md).

---

## Tech Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Framework      | Next.js 14+ (App Router) |
| Language       | TypeScript               |
| Styling        | TailwindCSS              |
| AI Integration | Vercel AI SDK            |
| LLM Provider   | OpenAI (GPT-4o)          |
| Data Fetching  | SWR + API-Football       |
| Deployment     | Vercel                   |

---

## Project Structure

```
futsal-companion/
├── app/
│   ├── (routes)/
│   │   ├── standings/        # Live table and group view
│   │   ├── chat/             # AI Q&A interface
│   │   └── rounds/           # Match history with summaries
│   └── api/
│       ├── chat/             # Streaming chat endpoint
│       └── summary/          # Match summary generation
├── components/
│   ├── standings/            # Table, group cards, team rows
│   ├── chat/                 # Chat UI, message bubbles, input
│   └── rounds/               # Round cards, result displays
├── lib/
│   ├── ai/
│   │   ├── prompts.ts        # System prompt builders
│   │   └── context.ts        # Context injection utilities
│   ├── api/
│   │   └── football.ts       # External API client
│   └── data/
│       └── rules.ts          # Competition rules as structured data
├── docs/
│   ├── AI_ARCHITECTURE.md
│   └── DECISIONS.md
└── types/
    └── index.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key
- An API-Football key (free tier available)

### Installation

```bash
git clone https://github.com/lucas-webdev/futsal-companion
cd futsal-companion
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

```env
OPENAI_API_KEY=your_key_here
API_FOOTBALL_KEY=your_key_here
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

- [x] Project setup and base architecture
- [ ] Live standings table with group breakdown
- [ ] AI Q&A chat with context injection
- [ ] Round results with AI-generated summaries
- [ ] Rule explainer with structured prompts
- [ ] Tiebreaker simulation ("what if" scenarios)
- [ ] Mobile-optimized layout
- [ ] Notifications for round updates

---

## Architecture Decisions

Key decisions and trade-offs are documented in [`/docs/DECISIONS.md`](./docs/DECISIONS.md). Some highlights:

**Why context injection instead of RAG?** The dataset is small enough (one season, one competition) that a vector database adds infrastructure complexity without meaningful benefit. A well-structured system prompt with serialized standings data is simpler, faster, and easier to debug.

**Why Vercel AI SDK?** It handles streaming, tool calling, and provider abstraction out of the box and integrates directly with Next.js App Router without extra configuration, which reduces boilerplate significantly.

**Why SWR for data fetching?** The standings data has a natural 24-hour stale window since rounds happen on weekends. SWR's revalidation model maps directly to that cadence without manual cache management.

---

## Contributing

This is a personal learning project with open source documentation. Feedback, issues, and suggestions are welcome. If you want to contribute, open an issue first to discuss the change.

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

_Built by [Lucas Medeiros](https://lucascmedeiros.com.br) — Senior Frontend Engineer exploring AI integration patterns in real-world applications._
