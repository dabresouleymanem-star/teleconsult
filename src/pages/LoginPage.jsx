// LoginPage.jsx — Page de connexion (OAuth2 simulé)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError('Veuillez entrer votre nom.');
      return;
    }
    login(username, 'practitioner');
    navigate('/dashboard');
  }

  return (
    <main role="main" aria-label="Connexion" style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem' }}>
      <h1>🏥 Téléconsultation</h1>
      <p>Connexion sécurisée (OAuth2 / SMART on FHIR)</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom du médecin</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
          style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0 1rem' }}
        />

        {error && <p role="alert" style={{ color: '#C0392B' }}>{error}</p>}

        <button type="submit" style={{ padding: '0.6rem 1.2rem' }}>
          Se connecter
        </button>
      </form>
    </main>
  );
}

export default LoginPage;