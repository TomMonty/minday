import React from "react";
import { FaBrain, FaBook, FaTrophy, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = ({ active = "minday" }) => {
  return (
    <nav className="navbar">
      <NavItem icon={<FaBrain />} label="minday" active={active === "minday"} />
      <NavItem icon={<FaBook />} label="Librairie" active={active === "Librairie"} />
      <NavItem icon={<FaTrophy />} label="Challenges" active={active === "Challenges"} />
      <NavItem icon={<FaUser />} label="Profil" active={active === "Profil"} />
    </nav>
  );
};

const NavItem = ({ icon, label, active }) => {
    const routes = {
      minday: '/',
      Librairie: '/librairie',
      Challenges: '/challenges',
      Profil: '/profil'
    };
  
    return (
      <Link to={routes[label]} className={`nav-item ${active ? "active" : ""}`}>
        <div className="nav-icon">{icon}</div>
        <div className="nav-label">{label}</div>
      </Link>
    );
  };

export default Navbar;
