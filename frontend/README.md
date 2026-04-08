# CourseHaven Frontend

CourseHaven ka frontend React + Vite + Tailwind CSS par built hai. Yeh learner-facing aur admin-facing dono flows ko cover karta hai, with a cleaner premium-style UI for browsing courses, signing in, purchasing content, and managing courses.

## Preview

![CourseHaven homepage preview](./public/home-preview.png)

## Highlights

- Premium homepage with bold hero section, stat cards, featured courses, and polished CTA layout
- Learner flows for signup, login, course browsing, checkout, and purchases
- Admin flows for signup, login, dashboard access, course creation, course updates, and course listing
- Stripe-ready frontend setup for payment flow integration
- Axios-based API communication with backend auth and course endpoints

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)

## Project Structure

```text
frontend/
|-- public/
|-- src/
|   |-- admin/
|   |-- components/
|   |-- utils/
|   |-- App.jsx
|   `-- main.jsx
|-- .env
|-- package.json
`-- vite.config.js
```

## Main Screens

- Home page with premium hero and featured course cards
- Login and signup pages for users
- Course listing page
- Buy course page
- Purchases page
- Admin login and signup
- Admin dashboard
- Create, update, and manage courses

## Routes

- `/`
- `/login`
- `/signup`
- `/courses`
- `/buy/:courseId`
- `/purchases`
- `/admin/signup`
- `/admin/login`
- `/admin/dashboard`
- `/admin/create-course`
- `/admin/update-course/:id`
- `/admin/our-courses`

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Frontend default Vite dev server usually runs on `http://localhost:5173`.

## Environment Variable

Create or update `.env` file inside `frontend/`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint checks

## API Integration

Frontend backend se course, auth, logout, and purchase-related endpoints consume karta hai. Backend base URL utility layer se manage ho raha hai, so make sure backend server active ho before testing full flows.

## UI Notes

Recent homepage redesign focuses on:

- dark premium visual language
- stronger typography hierarchy
- cleaner CTA buttons
- featured courses section with better card presentation
- learner and admin experience ko visually consistent banana

## Deployment

Production build generate karne ke liye:

```bash
npm run build
```

Generated output `frontend/dist/` me milta hai.
