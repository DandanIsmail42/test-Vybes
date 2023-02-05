import React from "react";
import { NavLink } from "react-router-dom";




const Navbar = () => {
 

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
       
      >
        <div className="navbar-brand"  style={{lineHeight: '50px'}} >
          <NavLink to="/dashboard" className="navbar-item">
            <img src='https://www.littlebluebag.de/app/themes/stonyray/dist/images/rune.png' width="112" height="28" alt="logo" />
          </NavLink>  
         <h3>adm<span style={{color: 'red'}}>A</span>pp</h3>
        </div>
      
      </nav>
    </div>
  );
};

export default Navbar;