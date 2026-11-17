import { ArrowRight, Camera, Check, Mail, Play } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { validateEmail } from '../lib/music-logic';
import { SiteLogo } from './SiteLogo';

export function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState('');
  const [sending, setSending] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateEmail(email);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError('');
    setSending(true);
    window.setTimeout(() => {
      setSubscribed(result.email);
      setEmail('');
      setSending(false);
    }, 500);
  }

  return (
    <footer className="site-footer">
      <div className="page-container">
        <section className="newsletter-panel">
          <div className="newsletter-glow newsletter-glow--green" />
          <div className="newsletter-glow newsletter-glow--purple" />
          <div className="newsletter-content">
            <span className="newsletter-icon"><Mail size={23} /></span>
            <p className="section-eyebrow"><span /> O MELHOR DA SEMANA, NO SEU E-MAIL</p>
            <h2>Receba a nossa <em>newsletter</em> semanal</h2>
            <p className="newsletter-description">
              Toda sexta, lançamentos que importam, um álbum clássico para redescobrir e a playlist da redação. Sem spam.
            </p>
            {subscribed ? (
              <div className="newsletter-success" role="status">
                <span><Check size={20} /></span>
                <div>
                  <strong>Inscrição confirmada! 🎶</strong>
                  <p>O próximo drop será enviado para {subscribed}.</p>
                  <button type="button" onClick={() => setSubscribed('')}>Inscrever outro e-mail</button>
                </div>
              </div>
            ) : (
              <form className={`newsletter-form${error ? ' has-error' : ''}`} onSubmit={submit} noValidate>
                <label className="visually-hidden" htmlFor="newsletter-email">Seu e-mail</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError('');
                  }}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                />
                <button type="submit" className="button button-neon button-large" disabled={sending}>
                  {sending ? 'Assinando...' : 'Assinar'} <ArrowRight size={17} />
                </button>
                {error && <p className="newsletter-error" id="newsletter-error">{error}</p>}
              </form>
            )}
            <p className="newsletter-proof">+ 48 mil leitores já recebem o MusicDrop toda semana.</p>
            <p className="newsletter-demo-note">Demonstração: a inscrição é confirmada apenas nesta página, sem envio para um servidor.</p>
          </div>
        </section>

        <div className="footer-bottom">
          <SiteLogo />
          <nav aria-label="Links do rodapé">
            <Link to="/noticias">Notícias</Link>
            <Link to="/artistas">Artistas</Link>
            <Link to="/albuns">Álbuns</Link>
            <Link to="/indicacoes">Indicações</Link>
          </nav>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">            <Camera size={17} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">            <Play size={16} fill="currentColor" /></a>
          </div>
        </div>
        <p className="copyright">© 2026 MusicDrop · Notícias, blog e curadoria musical.</p>
      </div>
    </footer>
  );
}
