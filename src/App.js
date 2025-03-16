import './App.css';
import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import About from "./pages/About";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/create_task"  element={<CreateTask />} />
                  <Route path="/about" element={<About />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
