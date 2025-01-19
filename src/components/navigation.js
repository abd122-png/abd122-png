import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Tableau de Bord</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Connexion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Inscription</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;