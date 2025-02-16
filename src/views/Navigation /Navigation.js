import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './Navigation.scss';
import ListTodo from "../Todo/Todolist";
import { useNavigate } from 'react-router-dom';
import ListUser from "../Users/ListUser";
import LazyLoading from "../Lazy Loading and Pagination/lazyLoading";
import Pagination from "../Lazy Loading and Pagination/Pagination";
import UserProfile from "../routerparameter/routerParameter";
import Color from "../Higher oder component/Color";
import logo from '../../assets/images/123.jpg';

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const Navigation = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/"); // Chuyển hướng đến trang Home
  };

  const ColorHome = Color(Home);

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ListTodo" className={({ isActive }) => (isActive ? "active" : "")}>
              ListTodo
            </NavLink>
          </li>
          <li>
            <NavLink to="/User" className={({ isActive }) => (isActive ? "active" : "")}>
              ListUser
            </NavLink>
            <NavLink to="/NewFeed" className={({ isActive }) => (isActive ? "active" : "")}>
              New Feed
            </NavLink>
            <NavLink to="/Pagination" className={({ isActive }) => (isActive ? "active" : "")}>
              Pagination
            </NavLink>
          </li>
        </ul>
      </nav>

      <img src={logo} alt="Logo" />

      <Routes>
        <Route path="/" element={<ColorHome />} />
        <Route path="/ListTodo" element={<ListTodo />} />
        <Route path="/User" element={<ListUser />} />
        <Route path="/NewFeed" element={<LazyLoading />} />
        <Route path="/Pagination" element={<Pagination />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default Navigation;
