# NewsFast
Live demo: https://newssfastnews.vercel.app/
Demo Video:https://youtu.be/XxinQneyeXY
## Project Explanation

NewsFast is a responsive news web application that fetches and displays real-time news articles using the NewsData API. Users can browse news by categories such as Technology, Business, Sports, and Lifestyle, and search articles using keywords.

The application dynamically retrieves the latest news and displays article details in a clean and user-friendly interface. It also includes loading states and error handling to improve user experience.

Features:
- Fetch latest news from a public API
- Browse articles by category
- Search articles by keywords
- Loading spinner while fetching data
- Error handling for failed API requests
- Responsive UI design

---

## Tech Stack Used

Frontend:
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap
- React Router DOM

API:
- NewsData API

React Concepts:
- useState
- useEffect
- useMemo
- useNavigate
- useParams

Tools:
- Fetch API
- npm

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/RahulBera752/newssfast.git
```

### 2. Navigate to the project folder

```bash
cd newssfast
```

### 3. Install dependencies

```bash
npm install
```

### 4. Add your NewsData API key

Replace the API key inside `Home.js` and `News.jsx`

Example:

```js
apikey=YOUR_NEWSDATA_API_KEY
```

Get API key from:

https://newsdata.io

### 5. Start the application

```bash
npm start
```

### 6. Open in browser

```txt
http://localhost:3000
```
