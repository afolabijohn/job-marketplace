import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import './App.css';
import Home from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import JobsFilter from './Jobs/JobsFilter';
import Jobscard from './Jobs/Jobscard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job/:id" element={<JobsFilter />} />
          <Route path="/apply/:id" element={<Jobscard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
