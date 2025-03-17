import './App.css';
import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/create_task"  element={<CreateTask />} />
                  <Route path="/about" element={<About />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
