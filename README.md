# Ashwini Hegde — Portfolio

Personal portfolio site built with Next.js, Tailwind CSS v4, and Framer Motion. All content is driven by two data files — no component editing needed for personal updates.

---

## Tech Stack

| Tool | Version |
|---|---|
| Next.js (App Router) | 15 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Zustand | 5 |
| Lenis (smooth scroll) | 1.3 |
| TypeScript | 5 |

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Tailwind config, color palette, base styles
│   ├── layout.tsx           # Root layout (fonts, cursor, scroll provider)
│   └── page.tsx             # Page assembly — imports all sections
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Fixed top nav with mobile menu
│   │   └── Footer.tsx       # Footer + scroll-to-top button
│   ├── sections/
│   │   ├── Hero.tsx         # Landing section with animated background blobs
│   │   ├── About.tsx        # Scroll-linked text reveal + 3D tilt stat cards
│   │   ├── Projects.tsx     # Project grid with expandable descriptions
│   │   └── Contact.tsx      # Email CTA + social links
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx   # Lenis smooth scroll wrapper
│   └── ui/
│       └── CustomCursor.tsx # Two-layer magnetic cursor (dot + ring)
│
├── data/
│   ├── personal.json        # ← ALL personal content lives here
│   ├── personal.ts          # TypeScript types + JSON loader
│   ├── projects.ts          # ← Project cards defined here
│   └── README.md            # Detailed field-by-field data guide
│
├── hooks/
│   └── useMousePosition.ts  # Mouse position hook
│
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│
├── public/
│   └── images/              # Project screenshots and assets
│
├── store/
│   └── uiStore.ts           # Zustand store (mobile menu, cursor variant)
│
├── Dockerfile
├── docker-compose.yaml
└── next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Customization

### Personal info — `data/personal.json`

This is the only file you need to edit for most changes:

```
name, title, email, greeting
about paragraphs
stat cards (icon, label, sublabel)
contact heading, social links
navigation items
SEO metadata
CTA button text and links
```

See [`data/README.md`](data/README.md) for a full field-by-field reference.

### Projects — `data/projects.ts`

Each project card follows this structure:

```ts
{
  id: 1,
  title: "Project Title",
  description: [
    "First bullet point",
    "Second bullet point",
    "Third bullet point",
  ],
  image: "/images/project.png",   // place image in public/images/
  imageAlt: "Alt text",
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",         // optional
  tags: ["Go", "React", "Docker"],
  gradient: "from-emerald-500 to-cyan-500"  // fallback if image missing
}
```

Projects are displayed in the order they appear in the array.

### Images

Put all project images in `public/images/` and reference them as:

```ts
image: "/images/your-image.png"
```

### Colors

The palette is defined in `app/globals.css` under `@theme`:

```css
@theme {
  --color-purple-500: #7aba54;   /* primary green accent */
  --color-blue-500: #8097ab;  /* secondary purple-grey accent */
}
```

Both colors cascade through all components — changing them here updates the entire site.

---

## Docker

```bash
# Build and run
docker compose up --build

# Stop
docker compose down
```

The container runs the production build on port 3000 (mapped to host port 3000 by default — check `docker-compose.yaml` to change).

---

## Deployment

### Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Deploy — no extra config needed

### Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- A `netlify.toml` is already included

---

## Sections Overview

| Section | What it does |
|---|---|
| **Hero** | Name, title, description, CTA buttons. Background blobs follow the cursor. |
| **About** | Paragraphs with scroll-linked word-by-word highlight. 3D tilt stat cards with floating animation. |
| **Projects** | Card grid. Click any card to open GitHub. Expandable bullet descriptions. |
| **Contact** | Email button + social icon links. |
