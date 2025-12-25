# GPAsim

GPAsim is a simple web application that allows college students to simulate their GPA. Users can enter a list of courses with their unit counts and letter grades, and the app automatically calculates and displays both semester and cumulative GPA.

## Features

- **Add and remove courses**: Dynamically add or remove course rows
- **Grade selection**: Dropdown menu for letter grades (A-F) to ensure valid input
- **Input validation**: Prevents empty or zero unit values
- **Automatic GPA calculation**: 
  - Cumulative GPA automatically calculated from all courses entered
  - Updates in real-time as courses are added, modified, or removed
- **Clean UI**: Modern, minimal design with improved spacing and typography
- **Clear all button**: Quickly remove all courses at once
- **Accurate calculations**: GPA rounded to 2 decimal places using standard 4.0 scale

## Tech Stack

- **Next.js** (App Router)
- **React** with TypeScript
- **CSS Modules** for styling
- **Client-side only** (no backend required, all calculations happen in the browser)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Status

This is an MVP (Minimum Viable Product) focused on learning and getting a working product quickly. Currently in active development.
