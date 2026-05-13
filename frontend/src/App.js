import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import LocalLanding from "./pages/LocalLanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dicas" element={<Blog />} />
          <Route path="/dicas/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:slug" element={<LocalLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
