# RK's Premium SaaS Portfolio

A high-performance, adaptive portfolio engineered with cinematic motion, liquid glass UI, and device-native responsiveness across mobile, tablet, and desktop. Designed to provide a top-tier SaaS-style user experience.

![Portfolio Preview](./public/preview.png)

## 🚀 Features

- **Liquid Glassmorphism UI:** Sophisticated translucent surfaces with dynamic reflections, inner glows, and layered drop shadows.
- **Cinematic WebGL Background:** A highly performant, dynamic WebGL shader background (`ColorBends`) that gracefully degrades to CSS fallbacks on unsupported or lower-end mobile devices.
- **Interactive Project Showcase:** A custom-built, seamlessly looping horizontal carousel with tactile drag-to-scroll, hover-to-center snapping, and focus-mode cinematic scaling.
- **Intelligent Navigation:** A modern floating navbar with smart hide/reveal on scroll and interactive pill indicators.
- **Fluid Micro-Interactions:** Custom framer-motion animations on every element, including a custom mouse cursor that reacts to interactive components.
- **Mobile-First Responsiveness:** Flawless adaptive layouts that switch from desktop mouse-interactions to native touch-based scrolling.

## 💻 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Graphics/Shaders:** [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) (react-three-fiber / native shaders)
- **Deployment:** [Vercel](https://vercel.com/)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rethankumar-cv/RK-S-portfolio.git
   cd RK-S-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

- `app/` - Next.js App Router layout and pages.
- `components/` - Reusable UI components.
  - `Hero.tsx` - High-impact landing section.
  - `About.tsx` - Liquid glass profile showcase.
  - `Projects.tsx` - Interactive horizontal project carousel.
  - `Skills.tsx` - Glowing tech stack showcase.
  - `ui/` - Granular structural components (`GlassContainer`, `BackgroundCanvas`, `CustomCursor`).
- `lib/` - Utility functions, hooks, and helpers.
- `styles/` - Global CSS and Tailwind directives.

## 💡 Performance Optimizations

- **Intersection Observer API:** Used to pause off-screen animations and trigger on-scroll visual states dynamically.
- **Hardware Acceleration:** Animations utilize `transform` and `opacity` properties to ensure smooth 60fps rendering without layout thrashing.
- **GPU-Accelerated Shaders:** WebGL background offloaded to the GPU to maintain main-thread responsiveness.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
