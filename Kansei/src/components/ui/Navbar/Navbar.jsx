import React, { useContext } from "react";
import { TOP_LISTS, GENRE_LISTS } from "../../../constants";    
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { IconButton } from "@mui/material";
import ColorModeContext from "../../../context/ColorModeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Navbar() {
  const navItems = [
    { title: "Аниме", path: "/animes" },
    { title: "Манга", path: "/manga" },
    { title: "Новости", path: "/news" }
  ];
  
  const location = useLocation();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  
  return (
    <div className="top-bar">
      <div className="name">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Kansei
        </Link>
      </div>
      
      <div className="search-container">
        <Search />
      </div>
      
      <div className="theme-toggle">
        <IconButton color="inherit" onClick={toggleColorMode}>
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>

      <nav className="nav-menu">
        <ul>
          {navItems.map((item) => (
            <li key={item.title + item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}