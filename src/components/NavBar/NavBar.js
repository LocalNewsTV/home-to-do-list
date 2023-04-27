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

    </div>
    <div className="nav-right">
      {session && <AppNav/>}
    </div>
  </div>
  )
}