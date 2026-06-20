# 🏆 GroupStage

A sleek, responsive dark-mode esports dashboard designed to manage and randomize tournament draw allocations for eFootball competitions. Seamlessly match players with random country selections, verify lists in real time, and generate beautiful group grids complete with high-resolution shareable screenshots.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

* **Balanced Group Draws:** Fairly distributes 16 players and 16 teams randomly across 4 distinct groups (Groups A to D).
* **Live Verification Zone:** Confirms list balances and counts inputs transparently before initiating drawing loops.
* **Dynamic Flag System:** Intercepts country names automatically and pairs them with correct country flag graphics courtesy of FlagCDN.
* **High-Res Screenshot Sharing:** Utilizes `html2canvas` directly in the browser to compile layout graphics into downloadable `.png` assets or hooks straight into native mobile/desktop system share sheets.
* **Persistent Local Cache:** Hydrates inputs utilizing local storage memory states to keep player fields intact during sudden browser reloads.

---

## 🚀 Quick Local Setup

1. **Clone the project:**
```bash
git clone [https://github.com/jagathvm/groupstage-app.git](https://github.com/jagathvm/groupstage-app.git)
cd groupstage-app
```

2. **Run it locally:**
   * **Option A:** Open `index.html` directly in any web browser of your choice.
   * **Option B (Recommended):** Run a static file server using Node inside your terminal for auto-refresh:

```bash
npx serve .
```

---

## 📁 Repository Structure

```text
├── index.html       # Application layout, structures, and external CDN scripts
├── style.css        # Responsive, custom dark-mode modern gamer aesthetics
├── script.js       # Core tournament shuffle logic, input processing, and canvas export rules
└── README.md        # Documentation guide
```

---

## 🛠️ Built With

* Vanilla Javascript ES6+
* CSS Custom Properties (Flexbox & Grid architecture)
* [FlagCDN](https://flagcdn.com/) - Integrated vector country flag rendering API
* [html2canvas](https://github.com/niklasvh/html2canvas) - Seamless background DOM canvas processing layout screenshot engine
