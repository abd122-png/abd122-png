import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
  };
  try {
    const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
    } else {
        const error = await response.json();
        setMessage(error.error || 'Une erreur est survenue');
    }
    navigate('/login');
} catch (err) {
    console.error(err);
    setMessage('Une erreur est survenue lors de la communication avec le serveur');
}
};

  return (
    <div className="container mt-5 w-25">
      <h2 className="text-center mb-5" >Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group text-center">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group text-center">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div class="text-center">
        <button type="submit" className="btn btn-primary btn-center">S'inscrire</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;