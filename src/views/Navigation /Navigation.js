import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Navigation.scss';
import ListTodo from "../Todo/Todolist";
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const Navigation = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">ListTodo</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ListTodo />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
