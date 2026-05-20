import { Link } from 'react-router-dom';
import { PublicHeader } from '../../components/layout/PublicHeader';

export function HomePage() {
  return (
    <div className="page page--home page--landing">
      <PublicHeader />

      <main className="page__main">
        <section className="hero">
          <div className="hero__content">
            <span className="hero__badge">Inteligência de Dados</span>
            <h1>Inteligência Comercial em Tempo Real para o mercado de celulose</h1>
            <p className="hero__lead">
              Transforme os dados públicos do COMEX STAT em uma experiência clara, modular e pronta para expansão global.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary" to="/dashboard">
                Começar Agora
              </Link>
              <Link className="button button--ghost" to="/reports">
                Agendar Demo
              </Link>
            </div>
          </div>

          <div className="hero__panel hero-visual-card">
            <div className="hero-visual-card__header">
              <h3>
                <span className="material-symbols-outlined">query_stats</span>
                Volume de Exportação 2024
              </h3>
              <span className="status-pill status-pill--live">LIVE</span>
            </div>

            <div className="hero-bars">
              <span style={{ height: '40%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '50%' }} />
            </div>

            <div className="hero-bars__labels">
              <span>JAN</span>
              <span>FEV</span>
              <span>MAR</span>
              <span>ABR</span>
              <span>MAI</span>
            </div>

            <div className="hero-float-chip">
              <div className="hero-float-chip__value">
                <span className="material-symbols-outlined">trending_up</span>
                <strong>+12.4%</strong>
              </div>
              <p>Crescimento Mensal</p>
            </div>
          </div>
        </section>

        <section className="trusted-strip">
          <p>Confiança de Instituições Globais</p>
          <div className="trusted-strip__logos">
            <span>GOV.TRADE</span>
            <span>BANCO NACIONAL</span>
            <span>GLOBAL LOGISTICS</span>
            <span>CUSTOMS MONITOR</span>
            <span>AGRO INTELLIGENCE</span>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading section-heading--center">
            <h2>Funcionalidades de Alta Performance</h2>
            <p>Estrutura pensada para leitura rápida, alta densidade de dados e evolução gradual do produto.</p>
          </div>

          <div className="features-grid">
            <article className="feature-card feature-card--wide">
              <div className="feature-card__icon">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <h3>Dados Oficiais e Auditados</h3>
                <p>Integração direta com a fonte pública, sem camada intermediária e com expansão planejada por país.</p>
                <div className="mini-stats-grid">
                  <div>
                    <span>Update Latency</span>
                    <strong>0.5 Seconds</strong>
                  </div>
                  <div>
                    <span>Data Accuracy</span>
                    <strong>99.99%</strong>
                  </div>
                </div>
              </div>
            </article>

            <article className="feature-card feature-card--dark">
              <div className="feature-card__icon feature-card__icon--accent">
                <span className="material-symbols-outlined">update</span>
              </div>
              <h3>Monitoramento Live</h3>
              <p>Receba alertas sobre flutuações de preços e volumes em rotas estratégicas do mercado de celulose.</p>
            </article>

            <article className="feature-card">
              <div className="feature-card__icon">
                <span className="material-symbols-outlined">map</span>
              </div>
              <h3>Distribuição Regional</h3>
              <p>Mapa e leitura regional para estados, portos, zonas francas e fábricas de celulose.</p>
              <div className="feature-card__image feature-card__image--map" />
            </article>

            <article className="feature-card feature-card--chart">
              <div className="feature-card__header-row">
                <h3>Fluxo Comercial Global</h3>
                <span className="status-pill status-pill--active">Ativo</span>
              </div>
              <div className="trade-flow-visual" />
              <div className="feature-card__footer-metrics">
                <div>
                  <span>Exports</span>
                  <strong>$342B</strong>
                </div>
                <div>
                  <span>Imports</span>
                  <strong>$291B</strong>
                </div>
                <div>
                  <span>Balance</span>
                  <strong className="text-secondary">+$51B</strong>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-card">
            <h2>Pronto para liderar o mercado com dados reais?</h2>
            <p>Uma base enxuta, modular e pronta para conectar municípios, fábricas, NCM/SH e expansão internacional.</p>
            <div className="cta-card__actions">
              <button type="button" className="button button--primary">Criar Conta Gratuita</button>
              <button type="button" className="button button--ghost button--ghost-light">Falar com um Especialista</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2024 PULP COMEX STAT Intelligence Platform. Data sourced from Official Customs Records.</p>
        <div className="landing-footer__links">
          <a href="#">Legal Notice</a>
          <a href="#">Terms of Trade</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Methodology</a>
        </div>
      </footer>
    </div>
  );
}