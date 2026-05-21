## Habit Tracker

A lightweight habit tracking application built with React + Vite. The application allows users to create habits, mark daily completions, track streaks dynamically, and persist data locally using `localStorage`.

---

# Assessment Evaluation Answers

## 1. Local Run Instructions & Deployment
- **Local Dev Command:** `npm install && npm run dev`
- **Live Deployment Link:** https://habit-tracker-dw.vercel.app/ 

---

## 2. Tech Stack & Engineering

### Core Tech Stack
- **Framework & Build Tool:** React + Vite. Vite was chosen over Create React App for its instant Hot Module Replacement (HMR) and optimized esbuild bundling engine, providing a rapid development feedback loop. (plus due to prior experience)
- **Iconography:** `lucide-react` for crisp, lightweight SVG vectors that scale perfectly across display densities without adding heavy bundle weight.

### Architectural Decisions
- **Week Boundary Structure:** The calendar matrix is anchored to start on **Monday**. This was a design choice to align with standard professional and academic workweeks.
- **The Local-Offset Streak Engine:** Rather than storing streaks as static numbers in state, the streak count is dynamically evaluated on render from a collection of absolute date strings. To fix a classic local vs. UTC timezone bug where calculations lag or mismatch at midnight, the engine subtracts `date.getTimezoneOffset()`, binding the app's internal logic directly to the user’s local machine clock for instant, real-time feedback.

### Interaction & UI Design Choices
1. **Absolute Button Docking:** In the `New.jsx` input component, the "Confirm" button is absolutely positioned inside the input text field bar itself. 
2. **Context-Aware Action Groups:** Edit and Delete button rows utilize `opacity: 0` by default. They stay hidden to keep the data table clean and readable, fading into view only when the user hovers over a specific habit row.

---

## 3. Responsiveness & Accessibility (a11y)

### Responsive Breakdown
- **Mobile Viewports (360px - 480px):** The header elements auto wrap vertically, form buttons scale to full width to present comfortable tap targets, and the central table matrix utilizes a wrapper configured with `overflow-x: auto` and a soft gradient mask. This allows users to smoothly swipe horizontally across the 7 day layout on small devices without shrinking the text.
- **Desktop Viewports (1024px+):** The dashboard settles into a centered, maximum width containment grid (`1040px`) with multi column tabular layouts displaying side-by-side components.

### Accessibility Implementations
- **Implemented:** Form elements utilize standard `<form>` wrappers and semantic `<input type="text">` controls. This ensures that pressing the native browser **Enter** key automatically commits data access routes without needing custom, un-semantic keydown event listeners.
- **Skipped (Known Deficit):** Custom screen-reader aria-live announcements (`aria-live="polite"`) were intentionally omitted for cell checking and unchecking events due to time constraints, meaning screen-reader users will not hear real-time streak count changes announced audibly.

---

## 4. AI Usage & Code Refactoring
- **Tool Utilized:** Gemini
- **Code Modification Instance:** The AI initially provided a standard, static habit tracking layout where completion states were managed across isolated object dictionaries, and recommended using `.toISOString()` for date stamps. I refactored this implementation to convert class models into flat objects before passing them to React state, and completely rewrote the string generator to include local time zone offset logic to prevent time shifted render bugs.

---

## 5. Critical Reflection & Honest Gaps

1. **Framer Motion Micro-Animations:** Add micro interactions so that ticking a checkbox triggers a physics-based burst or wave effect through the table row.
2. **Responsiveness & Accessibility:** Work more on site responsiveness and accessibility.

---

## Features

- Create and delete habits
- Weekly habit tracking matrix
- Dynamic streak calculation
- Persistent local storage support
- Responsive mobile first layout
- Hover reveal contextual controls
- Lightweight and fast UI rendering

---

## Project Structure

```bash
src/
├── components/
│   ├── Habit.jsx
│   ├── Header.jsx
│   ├── New.jsx
│   └── View.jsx
├── layout/
│   └── MainLayout.jsx
├── models/
│   └── Habit.jsx
├── pages/
│   └── Main.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---