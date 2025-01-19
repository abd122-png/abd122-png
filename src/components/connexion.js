import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If login is successful, redirect to the dashboard
        navigate('/');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mt-5 w-25">
      <h2 className="text-center">Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Se connecter</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
