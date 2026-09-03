# StringLab

**Modern String Utility & Text Analytics Toolkit** — a client-side web app to analyze and transform text in real time.

Built as Project 4 of a 12-project vanilla JavaScript practice roadmap.

---

## Features

- **Live Text Analytics** — instantly get character count, word count, vowel count, and space count for any text
- **Vowel Insights** — classifies your text as "No Vowel", "Less Vowels", "Normal Vowels", or "Many Vowels" based on density
- **String Operations**
  - Uppercase / Lowercase
  - Capitalize each word
  - Trim leading & trailing spaces
  - Reverse
  - Find & Replace
  - Includes (concatenate/check text)
  - Split
- **Sample Text Loader** — pulls placeholder paragraphs from the Bacon Ipsum API for quick testing
- **Copy to Clipboard** — one-click copy of any operation result
- **Persistent State** — your text and stats are saved to `localStorage` and restored on page reload
- **Collapsible Sidebar Navigation** — smooth expand/collapse animation
- **Responsive Layout** — adapts from mobile to desktop

---
 
## Live Demo

- [Click here](https://string-lab-web-app.vercel.app/)

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties (CSS variables), gradients, flexbox, responsive design
- **Vanilla JavaScript** — DOM manipulation, event handling, `localStorage`, `fetch` API
- **Lucide Icons** — icon set (https://lucide.dev/)

No frameworks, no build step — pure front-end fundamentals.

---

## Project Structure

```
StringLab/
├── index.html      # Markup & page structure
├── style.css       # Main layout, components, and theme styling
├── sidebar.css     # Sidebar navigation styling & animations
├── script.js       # All app logic (analytics, operations, storage)
└── images/
    └── logo.webp
```

---

## Getting Started

No installation or build tools required — it's a static site.

1. Clone the repo
   ```bash
   https://github.com/Anees-ul-rehman-1/stringLab-webApp.git
   ```
2. Open `index.html` in your browser

   (or serve it locally with a tool like the VS Code "Live Server" extension)

---

## Roadmap Context

This project is part of a self-directed **12-project JavaScript practice roadmap**:

1. Number Guessing Game
2. Simple Calculator
3. GradeFlow (Grading System)
4. **StringLab (this project)**
5. To-Do List App
6. Age Calculator
7. Word Counter & Palindrome Checker
8. Student Record Manager
9. Expense Tracker
10. Random Joke Generator
11. Library Book Manager
12. Quiz App (Capstone)

---

## Author

[Anees Ul Rehman]( https://github.com/Anees-ul-rehman-1)

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.
