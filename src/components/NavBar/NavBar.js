import React from 'react';
import { Logo } from '../Logo/Logo.js';
import '../Logo/Logo.css';
import { AppNav } from '../AppNav/AppNav.js';
import '../AppNav/AppNav.css';
import { hookContext } from '../../App.js';

export const NavBar = () => {
  const { session } = React.useContext(hookContext);
  return (
  <div id="nav">
    <div className="nav-left">
      <Logo/>
      <ul>
        <a className="navLink" href="https://github.com/LocalNewsTV/home-to-do-list">Repo</a>
        <a className="navLink" href="https://github.com/LocalNewsTV">GitHub</a>
        <a className="navLink" href="https://LocalNewsTV.github.io/">Portfolio</a>
      </ul>
    </div>
    <div className="nav-right">
      {session && <AppNav/>}
    </div>
  </div>
  )
}