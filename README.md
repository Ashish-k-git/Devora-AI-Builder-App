# Devora

Devora is an AI-powered app builder built with Next.js. Authenticated users describe an application in natural language, generate React code with Gemini, preview it in a live Sandpack workspace, refine it with an AI agent, and export the result as a ZIP archive.

## Features

- Prompt-based React app generation with Gemini
- Live code editing and browser preview powered by Sandpack
- Image attachments for visual generation prompts, stored with Supabase Storage
- Persistent chat, generated files, dependencies, and workspaces in PostgreSQL
- Saved projects with workspace import and deletion
- Credit-based plans with Clerk authentication and billing
- Pro-only application improvements through a Cline-based AI agent
- Runtime preview error detection with AI-assisted fixes
- Generated app export as a ready-to-run ZIP package
- Prompt-injection, bot, sensitive-content, and rate-limit protection through Arcjet

## Tech Stack

- **Framework:** Next.js 16 App Router, React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Authentication and billing:** Clerk
- **Database:** PostgreSQL with Prisma ORM and `@prisma/adapter-pg`
- **AI:** Google Gemini through `@google/genai` and Cline SDK
- **Preview and export:** Sandpack, JSZip
- **Storage:** Supabase Storage
- **Security:** Arcjet
- **UI:** Radix UI, Lucide React, Motion, Sonner

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL database
- Clerk application
- Google Gemini API key
- Supabase project with a public Storage bucket named `workspace-images`
- Arcjet account and API key

### Installation

```bash
git clone <repository-url>
cd devora
npm install
```

Create `.env` in the project root and configure the variables listed below.


## Environment Variables


```dotenv

# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up


# PostgreSQL

DATABASE_URL=postgresql://...

DIRECT_URL=postgresql://...


# Google Gemini

GEMINI_API_KEY=...


# Supabase

NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=...


# Arcjet

ARCJET_KEY=ajkey_...

```


- `DATABASE_URL` is used by the Prisma PostgreSQL adapter at runtime.

- `DIRECT_URL` is used by Prisma configuration and migrations.

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` enable image uploads from the chat UI.

- Supabase Storage uploads require a public bucket named `workspace-images`.

- Keep secret keys in server environment files and never commit them.




Apply the Prisma schema:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
devora/
├── app/                              # Next.js App Router pages and API routes
│   ├── (auth)/                       # Clerk authentication route group
│   │   ├── layout.tsx                # Shared layout for auth pages
│   │   ├── sign-in/[[...sign-in]]/   # Clerk catch-all sign-in page
│   │   └── sign-up/[[...sign-up]]/   # Clerk catch-all sign-up page
│   ├── (main)/                       # Authenticated application route group
│   │   ├── layout.tsx                # Shared header/layout for app pages
│   │   ├── projects/page.tsx         # Saved-project dashboard
│   │   └── workspace/page.tsx        # AI generation workspace
│   ├── api/
│   │   ├── gen-ai-code/route.ts      # Gemini generation and streamed progress events
│   │   └── improve/route.ts          # Pro-mode Cline patch application
│   ├── favicon.ico                   # Browser/tab favicon
│   ├── globals.css                   # Global Tailwind and application styles
│   ├── layout.tsx                    # Root layout and global providers
│   └── page.tsx                      # Public landing page
├── actions/                          # Next.js server actions
│   ├── projects.ts                   # Project listing and project mutations
│   └── workspace.ts                  # Workspace loading and persistence actions
├── components/                       # React UI and workspace components
│   ├── ChatPanel.tsx                 # Generation prompt and conversation interface
│   ├── CodePanel.tsx                 # Generated file viewer and code editor
│   ├── DeleteProjectModal.tsx        # Project deletion confirmation
│   ├── Header.tsx                    # Main navigation and account controls
│   ├── ImportProjectButton.tsx       # Import existing project flow
│   ├── PricingModal.tsx              # Subscription and pricing dialog
│   ├── ProjectCard.tsx               # Saved-project card
│   ├── Reusables.tsx                 # Reusable workspace and UI helpers
│   ├── WorkspaceClient.tsx           # Main interactive workspace state and handlers
│   ├── WorkspaceMockup.tsx           # Workspace preview and visual mockup
│   ├── theme-provider.tsx            # Light/dark theme provider
│   ├── animate-ui/
│   │   └── components/backgrounds/   # Decorative animated background components
│   └── ui/                           # shadcn-style primitives and reusable controls
├── lib/                              # Server, database, and shared utilities
│   ├── arcjet.ts                     # Arcjet security and rate-limit configuration
│   ├── checkUser.ts                  # Clerk-to-database user synchronization
│   ├── constants.ts                  # Shared application constants
│   ├── data.ts                       # Demo or shared application data
│   ├── prisma.ts                     # Prisma client and PostgreSQL adapter setup
│   ├── utils.ts                      # General-purpose helper functions
│   └── generated/prisma/             # Prisma-generated client and model types
├── prisma/
│   ├── schema.prisma                 # User and workspace database models
│   └── migrations/
│       ├── migration_lock.toml       # Database provider migration lock
│       └── 20260919185639_create_model/
│           └── migration.sql         # Initial database migration
├── types/
│   ├── plans.ts                      # Credit-plan and pricing types
│   ├── project.ts                    # Project and project-list types
│   └── workspace.ts                  # Workspace, file, and chat types
├── public/
│   ├── longlogo.png                  # Full application logo
│   └── shortlogo.png                 # Compact application logo
├── .gitignore                        # Git ignore rules
├── components.json                   # shadcn/ui component configuration
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies and npm scripts
├── package-lock.json                 # Reproducible npm dependency lock
├── postcss.config.mjs                # PostCSS and Tailwind configuration
├── prisma.config.ts                  # Prisma CLI configuration
├── proxy.ts                          # Clerk and route protection middleware
├── tsconfig.json                     # TypeScript compiler configuration
├── vercel.json                       # Vercel deployment configuration
└── README.md                         # Setup and project documentation
```

`node_modules/`, `.next/`, and local environment files are intentionally excluded from the source tree. `lib/generated/prisma/` is generated by Prisma and should be regenerated with `npx prisma generate` instead of edited manually.

## Available Scripts

```bash
npm run dev       # Start the Next.js development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run ESLint
```

## Architecture / How It Works

1. Clerk authenticates users and synchronizes their account, plan, and credits in the local PostgreSQL database.
2. A prompt is sent to `/api/gen-ai-code`. The server checks Arcjet rules, validates the user's credits, streams Gemini status updates, and parses generated React files.
3. The generated file tree is saved atomically with a workspace and credit deduction.
4. Sandpack renders the generated application and supports code inspection, live preview, runtime error fixes, and ZIP export.
5. Pro users can send improvement requests to `/api/improve`, where Cline applies complete file patches and saves the final result.

## Deployment

Deploy as a Next.js application on a platform that supports Node.js server routes and server-sent events. Configure the environment variables above, provide a reachable PostgreSQL database, and use `npx prisma migrate deploy` or your migration workflow before startup.
