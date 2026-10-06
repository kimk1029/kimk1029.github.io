# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: recruiters and tech leads who arrive from a resume link and decide within 30 seconds to 2 minutes whether to interview 김규현 (Kim Kyu-hyun). Their job is to judge fit fast, then reach out by email.

## Product Purpose
Personal portfolio for a frontend engineer with 9+ years of React/Next.js. Success means a reviewer leaves convinced he ships real products end to end and emails him.

## Positioning
AI product engineer first: solo-built six products with an AI-native workflow (Claude Code, MCP, Agent Skills, Agent Harness, lightweight evals) and shipped five; three are live and operated (ARVO TCG, dopamine.land, DATEBASE). Web3 frontend at NEOWIZ Neopin (wallet extension, DEX, smart-contract integration, design system lead) and full-stack years at Trumpia are the credibility behind it, not the headline.

## Operating Context
Visitors open the site from a resume (PDF/docx) or job platform link, often on desktop during screening, sometimes on mobile. Project detail pages exist per project at `/projects/[slug]`.

## Capabilities and Constraints
- Next.js 14 App Router, static export (`output: 'export'`) deployed to GitHub Pages via GitHub Actions on push to `master`. No server runtime.
- Content lives in `app/data.ts` (experience, skills, 17 projects). Korean primary language with English labels.
- Installed: Tailwind CSS, framer-motion, lucide-react.

## Evidence on Hand
- Real metrics from resume: Lighthouse ~20% improvement (SWR), main data fetching ~34% faster (admin migration), UI revision rounds 4–5 → 1–2 (design system), chart rendering 30%+ faster (Trumpia), 6 products built / 5 shipped / 3 operated.
- Live URLs: arvotcg.com, dopamine.land, datebase.site, poke-30.com.
- No real project screenshots yet; `data.ts` uses picsum placeholders. Do not present placeholders as real screenshots.
- No testimonials or client logos. Do not invent any.

## Brand Commitments
- Public contact: email (kimk1029@naver.com) and GitHub only. Phone number and location must not be shown.

## Product Principles
1. Shipped and operated beats claimed: lead with live products and verifiable numbers.
2. Respect the 30-second scan: the positioning and the way to contact must be legible without scrolling far.
3. The site itself is proof of frontend craft; interaction quality is part of the argument.
4. Every claim traces to the resume; no inflation.
