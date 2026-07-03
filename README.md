# Whirl

Whirl is a playful snack brand website built with React and Vite. The project focuses on bold visual branding, smooth motion, responsive layouts, and a simple interactive shopping-bag experience.

It presents a fictional snack brand with animated flavor cards, flavor detail drawers, a cart-style bag popover, a brand story page, and custom Whirl-themed visuals.

## Features

- Responsive landing page for a modern snack brand
- Animated hero section and flavor cards using GSAP
- Interactive flavor detail drawer with add-to-bag feedback
- Shopping bag popover with item quantities and clear-bag action
- Dedicated brand story page
- Custom Whirl favicon and brand mark in the navbar/footer
- Route scroll reset for clean page navigation
- Smooth UI details using Framer Motion and Lucide icons

## Tech Stack

- React
- Vite
- React Router
- GSAP
- Framer Motion
- Zustand
- Lucide React
- Tailwind CSS tooling

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

On Windows PowerShell, if `npm` is blocked by execution policy, use `npm.cmd` instead:

```bash
npm.cmd run dev
```

## Project Structure

```text
src/
  components/
    layout/      Navbar, footer, layout, scroll behavior
    ui/          Flavor cards, drawer, visual sections
  data/          Flavor content
  lib/           Shared GSAP setup
  pages/         Landing and story pages
  router/        React Router configuration
  store/         Zustand cart store
```

## Pages

- `/` - Main landing page with hero, flavor lineup, benefits, and story CTA
- `/story` - Brand story page with manifesto, timeline, and flavor lineup

## Notes

This is a frontend-focused brand concept project. The bag/cart behavior is handled on the client with Zustand and does not connect to a checkout or backend service.
