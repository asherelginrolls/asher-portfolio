# asher-portfolio

Personal site for Asher Elgin Rolls, AI-native growth operator.

A single-page portfolio with a brutalist-editorial design and a live three.js
data instrument in the hero that morphs through real numbers from my work
(YouTube 7K to 100K, campaign Instagram 10K to 107K, and a $1M deep-tech
pipeline).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 and TypeScript
- Tailwind CSS v4
- framer-motion for scroll reveals, lenis for smooth scroll
- Raw three.js for the hero instrument

Fully static. No backend and no environment variables.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
```
