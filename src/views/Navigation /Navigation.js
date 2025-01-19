import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './Navigation.scss';
import ListTodo from "../Todo/Todolist";
import { useNavigate } from 'react-router-dom';
import ListUser from "../Users/ListUser";
import LazyLoading from "../Lazy Loading/lazyLoading";


const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const handleRedirect = () => {
      // const navigate = useNavigate() ;
      // navigate('/')
}

const Navigation = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Chuyển hướng đến trang Home
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/ListTodo" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ListTodo
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/User" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ListUser
            </NavLink>

            <NavLink 
              to="/NewFeed" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              New Feed
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <button onClick={handleRedirect}>Call Back</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListTodo" element={<ListTodo />} />
        <Route path="/User" element={<ListUser />} />
        <Route path="/NewFeed" element={<LazyLoading />} />
      </Routes>
    </>
  );
};

export default Navigation;
