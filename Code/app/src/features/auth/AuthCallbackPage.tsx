import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard', { replace: true });
      }
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) {
      handleCallback();
    } else {
      // Supabase implicit flow — onAuthStateChange picks up the session from the hash
      const { data: listener } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          listener.subscription.unsubscribe();
          navigate('/dashboard', { replace: true });
        }
      });
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="auth-callback-page">
        <div className="auth-callback-card">
          <span className="material-symbols-outlined auth-callback-card__icon auth-callback-card__icon--error">
            error
          </span>
          <h2>Falha na autenticação</h2>
          <p>{error}</p>
          <a className="button button--primary" href="/login">Tentar novamente</a>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-callback-page">
      <div className="auth-callback-card">
        <div className="login-spinner login-spinner--lg" aria-hidden="true" />
        <h2>Autenticando...</h2>
        <p>Aguarde enquanto verificamos seu acesso.</p>
      </div>
    </div>
  );
}
