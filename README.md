# 🍽️ Meal Recipe Explorer

A dynamic and user-friendly recipe web app that allows users to explore meals from around the world using [TheMealDB API](https://www.themealdb.com/api.php). This app enables category-based browsing, search functionality (by name or first letter), full recipe details, and a customizable favorites list using localStorage — all in a sleek, responsive interface.

---

## 🚀 Features

### 📂 Explore Meals by Category

### 🔎 Search Functionality
- **Search by Name**:
- **Search by First Letter**:

### 📖 Full Recipe Details
---

## ❤️ Add to Favorites
- Save meals locally using `localStorage`.
- "Add to Favorites" button appears on each meal card.
- Meals persist across sessions.
---
## ❌ Remove from Favorites
- Remove a meal instantly with the “Remove from Favorites” button.
- UI updates immediately without the need to refresh the page.
---
## 🌐 Responsive UI
- Fully responsive layout for all screen sizes (desktop, tablet, mobile).
- Clean card design with text overflow handling for long instructions.

---

## 🔗 API Endpoints Used

| Feature                       | API Endpoint                                                                 |
|------------------------------|------------------------------------------------------------------------------|
| List all meal categories     | `https://www.themealdb.com/api/json/v1/1/categories.php`                    |
| Search meal by name          | `https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`             |
| Search meal by first letter  | `https://www.themealdb.com/api/json/v1/1/search.php?f=c`                   |
| Get meals by category        | `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`             |
| Get full meal details by ID  | `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`               |

---

## 🛠️ Tech Stack

- HTML & CSS
- JavaScript (ES6)
- TheMealDB REST API
- Browser LocalStorage


