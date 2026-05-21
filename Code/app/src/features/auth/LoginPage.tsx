import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeSwitcher } from '../../components/theme/ThemeSwitcher';
import { supabaseConfigured } from '../../lib/supabase';

type Step = 'email' | 'otp';
type Status = 'idle' | 'loading' | 'error';

export function LoginPage() {
  const { sendOtp, verifyOtp, session } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('email');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session) navigate('/dashboard', { replace: true });
  }, [session, navigate]);

  useEffect(() => {
    if (step === 'otp') otpRef.current?.focus();
  }, [step]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const { error } = await sendOtp(email.trim());
    if (error) {
      setErrorMsg(error);
      setStatus('error');
    } else {
      setStatus('idle');
      setStep('otp');
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 8) return;
    setStatus('loading');
    const { error } = await verifyOtp(email.trim(), otp.trim());
    if (error) {
      setErrorMsg(error);
      setStatus('error');
      setOtp('');
    }
  }

  function handleOtpChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    setOtp(digits);
    if (status === 'error') { setStatus('idle'); setErrorMsg(''); }
  }

  function goBack() {
    setStep('email');
    setOtp('');
    setStatus('idle');
    setErrorMsg('');
  }

  return (
    <div className="login-page">
      <div className="login-page__topbar">
        <Link to="/" className="login-page__brand">PULP COMEX STAT</Link>
        <ThemeSwitcher />
      </div>

      <main className="login-page__main">
        <div className="login-card">
          <div className="login-card__icon">
            <span className="material-symbols-outlined">
              {step === 'email' ? 'query_stats' : 'mark_email_read'}
            </span>
          </div>

          {!supabaseConfigured && (
            <div className="login-card__error" style={{ margin: '0 0 12px' }}>
              <span className="material-symbols-outlined">warning</span>
              <span>
                Supabase não configurado — crie{' '}
                <code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>Code/app/.env</code>{' '}
                com <code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>VITE_SUPABASE_URL</code> e{' '}
                <code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>VITE_SUPABASE_ANON_KEY</code>.
              </span>
            </div>
          )}

          {step === 'email' ? (
            <>
              <h1 className="login-card__title">Acesse sua conta</h1>
              <p className="login-card__subtitle">
                Informe seu e-mail e enviaremos um código de 6 dígitos para verificação.
              </p>

              <form className="login-card__form" onSubmit={handleEmailSubmit} noValidate>
                <label className="login-card__label" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="login-card__input"
                  placeholder="voce@empresa.com.br"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') { setStatus('idle'); setErrorMsg(''); }
                  }}
                  disabled={status === 'loading'}
                  autoComplete="email"
                  autoFocus
                />

                {status === 'error' && (
                  <p className="login-card__error">
                    <span className="material-symbols-outlined">error</span>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="button button--primary login-card__submit"
                  disabled={status === 'loading' || !email.trim()}
                >
                  {status === 'loading' ? (
                    <><span className="login-spinner" aria-hidden="true" />Enviando código...</>
                  ) : (
                    <><span className="material-symbols-outlined">send</span>Enviar código</>
                  )}
                </button>
              </form>

              <p className="login-card__footer-note">
                Ao acessar, você concorda com os <a href="#">Termos de Uso</a> e a{' '}
                <a href="#">Política de Privacidade</a>.
              </p>
            </>
          ) : (
            <>
              <h1 className="login-card__title">Verifique seu e-mail</h1>
              <p className="login-card__subtitle">
                Enviamos um código de 6 dígitos para <strong>{email}</strong>.
                Insira-o abaixo para entrar.
              </p>

              <form className="login-card__form" onSubmit={handleOtpSubmit} noValidate>
                <label className="login-card__label" htmlFor="otp">Código de verificação</label>
                <input
                  id="otp"
                  ref={otpRef}
                  type="text"
                  inputMode="numeric"
                  className="login-card__input login-card__input--otp"
                  placeholder="00000000"
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  disabled={status === 'loading'}
                  autoComplete="one-time-code"
                  maxLength={8}
                />

                {status === 'error' && (
                  <p className="login-card__error">
                    <span className="material-symbols-outlined">error</span>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="button button--primary login-card__submit"
                  disabled={status === 'loading' || otp.length !== 8}
                >
                  {status === 'loading' ? (
                    <><span className="login-spinner" aria-hidden="true" />Verificando...</>
                  ) : (
                    <><span className="material-symbols-outlined">verified_user</span>Verificar código</>
                  )}
                </button>
              </form>

              <p className="login-card__footer-note">
                Não recebeu?{' '}
                <button
                  type="button"
                  style={{ background: 'none', border: 0, padding: 0, color: 'var(--secondary)', cursor: 'pointer', fontWeight: 600, fontSize: 'inherit' }}
                  onClick={goBack}
                >
                  Reenviar código
                </button>
                {' '}ou verifique o spam.
              </p>
            </>
          )}
        </div>
      </main>

      <footer className="login-page__footer">
        <p>© {new Date().getFullYear()} PULP COMEX STAT · Dados oficiais do MDIC / ComexStat</p>
      </footer>
    </div>
  );
}
