# RBC A/B Testing Assessment

This project demonstrates personalized content delivery and client-side A/B testing logic, simulating how an RBC landing page could dynamically adjust messaging based on user segments.

## 🔗 Live Demo

- **Main Page:** [rbc-assesment.vercel.app](https://rbc-assesment.vercel.app/)
- **A/B Testing Dashboard:** [rbc-assesment.vercel.app/test.html](https://rbc-assesment.vercel.app/test.html)

## 📁 Repository

[GitHub Repo](https://github.com/oseisaac/rbc-assesment.git)

---

## ✅ Features

- **A/B Testing Logic**  
  Users are randomly assigned to Group A or B (persisted via `localStorage` for consistency).

- **Segment-Based Personalization**  
  Messaging dynamically updates based on a `?segment=` query parameter (e.g., `student`, `newcomer`).

- **Sticky Experience**  
  A/B group selection remains consistent across sessions using localStorage.

- **Responsive Design**  
  Mobile-friendly layout styled to reflect a clean, RBC-like visual aesthetic.

- **Interactive Testing Tool**  
  The `/test.html` page provides a UI to simulate different segment + group scenarios and clear state.

---

## 🧪 How to Test

### Option 1: Use the Testing Dashboard

1. Open [`/test.html`](https://rbc-assesment.vercel.app/test.html)
2. Click a segment button to simulate different user types
3. Use the **Clear A/B Group** button to reset localStorage and retest

### Option 2: Manual URL Testing

| URL                            | Behavior                          |
| ------------------------------ | --------------------------------- |
| `/index.html`                  | Default messaging                 |
| `/index.html?segment=student`  | Student messaging (Group B only)  |
| `/index.html?segment=newcomer` | Newcomer messaging (Group B only) |

> Group A always receives default messaging, regardless of segment.  
> Group B receives personalized content if a valid segment is provided.

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)
- Vercel (for hosting)

---

## 📌 Notes

- Fully client-side implementation; no backend required.
- Built with simplicity, readability, and extensibility in mind.

---

## 🙋‍♂️ Author

**Isaac Ebhodaghe**  
[GitHub](https://github.com/oseisaac)
