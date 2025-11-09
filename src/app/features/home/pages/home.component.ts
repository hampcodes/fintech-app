import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing-container">
      <!-- Navbar -->
      <nav class="navbar">
        <div class="navbar-content">
          <div class="logo">
            <span class="logo-icon">💎</span>
            <span class="logo-text">FinTech<span class="logo-highlight">App</span></span>
          </div>
          <div class="nav-buttons">
            <a routerLink="/login" class="nav-btn nav-btn-login">Iniciar Sesión</a>
            <a routerLink="/register" class="nav-btn nav-btn-register">Abrir Cuenta</a>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">🎉 Apertura 100% digital</div>
            <h1 class="hero-title">
              Tu banco digital<br>
              <span class="highlight">simple y seguro</span>
            </h1>
            <p class="hero-subtitle">
              Abre tu cuenta en minutos, administra tu dinero desde cualquier lugar
              y realiza transacciones sin complicaciones. La banca del futuro, hoy.
            </p>
            <div class="hero-buttons">
              <a routerLink="/register" class="btn btn-primary">
                <span>Abrir Cuenta Gratis</span>
                <span class="btn-icon">→</span>
              </a>
            </div>
            <div class="hero-features">
              <div class="hero-feature">
                <span class="check">✓</span> Sin costos ocultos
              </div>
              <div class="hero-feature">
                <span class="check">✓</span> 100% seguro
              </div>
              <div class="hero-feature">
                <span class="check">✓</span> Soporte 24/7
              </div>
            </div>
          </div>
          <div class="hero-separator">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(0, 168, 89, 0.15)" d="M45.7,-57.8C58.9,-49.3,69.2,-35.4,73.7,-19.6C78.2,-3.8,76.9,13.9,69.8,28.3C62.7,42.7,49.8,53.8,35.2,60.3C20.6,66.8,4.3,68.7,-11.8,67.2C-27.9,65.7,-43.8,60.8,-56.3,51.3C-68.8,41.8,-78,27.7,-80.7,12.2C-83.4,-3.3,-79.6,-20.2,-71.3,-35.7C-63,-51.2,-50.2,-65.3,-35.2,-73.1C-20.2,-80.9,-3.4,-82.4,11.8,-77.8C27,-73.2,32.5,-66.3,45.7,-57.8Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div class="hero-image">
            <div class="card-container">
              <div class="card-shadow-s">
                <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 150,50 Q 100,100 150,150 Q 200,200 150,250 Q 100,300 150,350"
                        fill="none"
                        stroke="rgba(0, 0, 0, 0.15)"
                        stroke-width="80"
                        stroke-linecap="round"
                        filter="url(#shadow-blur)"/>
                  <defs>
                    <filter id="shadow-blur">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div class="card-mockup">
                <!-- Frente de la tarjeta -->
                <div class="card-front">
                  <div class="card-shine"></div>
                  <div class="card-header">
                    <div class="card-logo">
                      <span class="logo-icon">💎</span>
                      <span class="card-brand">FinTech</span>
                    </div>
                    <div class="card-type">VISA</div>
                  </div>
                  <div class="card-chip">
                    <div class="chip-line"></div>
                    <div class="chip-line"></div>
                    <div class="chip-line"></div>
                    <div class="chip-line"></div>
                  </div>
                  <div class="contactless">📶</div>
                  <div class="card-info">
                    <div class="card-number">1234  5678  9012  3456</div>
                    <div class="card-details">
                      <div class="card-holder">
                        <div class="label">TITULAR</div>
                        <div class="card-name">HAMP</div>
                      </div>
                      <div class="card-expiry">
                        <div class="label">VÁLIDO HASTA</div>
                        <div class="expiry-date">12/28</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Reverso de la tarjeta -->
                <div class="card-back">
                  <div class="magnetic-strip"></div>
                  <div class="signature-panel">
                    <div class="signature">Hamp</div>
                    <div class="cvv-box">
                      <div class="cvv-label">CVV</div>
                      <div class="cvv-number">***</div>
                    </div>
                  </div>
                  <div class="card-back-info">
                    <p class="back-text">Esta tarjeta es propiedad de FinTech App. En caso de pérdida o robo, contacte inmediatamente al 0800-FINTECH</p>
                    <div class="card-back-logo">
                      <span class="logo-icon">💎</span>
                      <span>FinTech</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="features-container">
          <div class="section-header">
            <h2 class="section-title">Todo lo que necesitas en un solo lugar</h2>
            <p class="section-subtitle">Funcionalidades diseñadas para hacer tu vida financiera más fácil</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">💳</div>
              </div>
              <h3>Cuentas Digitales</h3>
              <p>Abre tu cuenta 100% digital en minutos. Sin papeleo, sin filas, sin complicaciones.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">⚡</div>
              </div>
              <h3>Transferencias Instantáneas</h3>
              <p>Envía y recibe dinero al instante, 24/7. Tus transacciones cuando las necesitas.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">📊</div>
              </div>
              <h3>Control Total</h3>
              <p>Monitorea todas tus transacciones en tiempo real. Tu dinero siempre bajo control.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <div class="feature-icon">🔒</div>
              </div>
              <h3>Seguridad Avanzada</h3>
              <p>Protección bancaria de nivel mundial. Tus datos seguros con encriptación de última generación.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits">
        <div class="benefits-container">
          <div class="benefits-content">
            <h2 class="benefits-title">¿Por qué elegir FinTechApp?</h2>
            <div class="benefits-list">
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <h4>Sin comisiones ocultas</h4>
                  <p>Transparencia total en todas nuestras operaciones</p>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <h4>Apertura en minutos</h4>
                  <p>Crea tu cuenta desde tu celular en menos de 5 minutos</p>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <h4>Soporte disponible</h4>
                  <p>Estamos aquí para ayudarte cuando lo necesites</p>
                </div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <h4>Tecnología segura</h4>
                  <p>Protección de última generación para tu tranquilidad</p>
                </div>
              </div>
            </div>
          </div>
          <div class="benefits-stats">
            <div class="stat-card">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Usuarios activos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">$10M+</div>
              <div class="stat-label">Transacciones procesadas</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime garantizado</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="wave-top">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        <div class="cta-background">
          <div class="cta-pattern"></div>
        </div>
        <div class="cta-container">
          <h2 class="cta-title">¿Listo para dar el siguiente paso?</h2>
          <p class="cta-subtitle">Únete a miles de usuarios que ya confían en nosotros para sus finanzas</p>
          <a routerLink="/register" class="btn btn-cta">
            <span>Abrir mi cuenta gratis</span>
            <span class="btn-icon">→</span>
          </a>
          <p class="cta-note">Sin costo de apertura • Sin mantenimiento • 100% digital</p>
        </div>
        <div class="wave-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,0 L0,0 Z" fill="white"/>
          </svg>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">
              <span class="logo-icon">💎</span>
              <span class="logo-text">FinTech<span class="logo-highlight">App</span></span>
            </div>
            <p class="footer-description">Tu banco digital de confianza</p>
          </div>
          <div class="footer-links">
            <div class="footer-column">
              <h4>Producto</h4>
              <a href="#">Cuentas</a>
              <a href="#">Transferencias</a>
              <a href="#">Seguridad</a>
            </div>
            <div class="footer-column">
              <h4>Empresa</h4>
              <a href="#">Nosotros</a>
              <a href="#">Blog</a>
              <a href="#">Contacto</a>
            </div>
            <div class="footer-column">
              <h4>Legal</h4>
              <a href="#">Términos</a>
              <a href="#">Privacidad</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 FinTech App. Todos los derechos reservados by HampCode.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
      background: var(--color-background-light);
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--color-background-light);
      box-shadow: var(--shadow-md);
      z-index: var(--z-index-fixed);
      padding: var(--spacing-md) 0;
    }

    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }

    .logo-icon {
      font-size: var(--font-size-3xl);
    }

    .logo-text {
      color: var(--color-primary);
    }

    .logo-highlight {
      color: var(--color-secondary);
    }

    .nav-buttons {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }

    .nav-btn {
      padding: 12px 28px;
      border-radius: var(--border-radius-lg);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      font-size: 0.95rem;
      transition: var(--transition-base);
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .nav-btn-login {
      color: var(--color-primary);
      background: rgba(0, 61, 122, 0.08);
      border: 2px solid var(--color-primary);
    }

    .nav-btn-login::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: var(--border-radius-round);
      background: var(--color-primary);
      transition: width 0.4s ease, height 0.4s ease, top 0.4s ease, left 0.4s ease;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    .nav-btn-login:hover {
      color: var(--color-text-light);
      border-color: var(--color-primary);
      box-shadow: 0 4px 12px rgba(0, 61, 122, 0.3);
    }

    .nav-btn-login:hover::before {
      width: 120%;
      height: 300%;
    }

    .nav-btn-register {
      background: var(--gradient-success);
      color: var(--color-text-light);
      border: 2px solid var(--color-secondary);
      box-shadow: 0 4px 12px rgba(0, 168, 89, 0.3);
    }

    .nav-btn-register:hover {
      background: linear-gradient(135deg, #00c96d 0%, var(--color-secondary) 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 168, 89, 0.4);
    }

    /* Hero Section */
    .hero {
      padding: 120px var(--spacing-lg) 80px;
      background: linear-gradient(135deg, var(--color-primary) 0%, #004a94 100%);
      color: var(--color-text-light);
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: var(--spacing-2xl);
      align-items: center;
    }

    .hero-separator {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.4;
    }

    .hero-separator svg {
      width: 120px;
      height: 120px;
      filter: drop-shadow(0 4px 8px rgba(0, 168, 89, 0.2));
    }

    .hero-badge {
      display: inline-block;
      background: rgba(0, 168, 89, 0.2);
      color: var(--color-secondary);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-2xl);
      font-size: 0.9rem;
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-xl);
      border: 1px solid var(--color-secondary);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: var(--spacing-xl);
    }

    .highlight {
      color: var(--color-secondary);
      display: block;
    }

    .hero-subtitle {
      font-size: var(--font-size-lg);
      line-height: 1.7;
      opacity: 0.95;
      margin-bottom: var(--spacing-2xl);
    }

    .hero-buttons {
      display: flex;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-2xl);
      flex-wrap: wrap;
    }

    .btn {
      padding: var(--spacing-md) var(--spacing-2xl);
      border-radius: var(--border-radius-lg);
      text-decoration: none;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-base);
      transition: var(--transition-base);
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      border: 2px solid transparent;
    }

    .btn-primary {
      background: var(--color-secondary);
      color: var(--color-text-light);
    }

    .btn-primary:hover {
      background: var(--color-secondary-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 168, 89, 0.3);
    }

    .btn-secondary {
      background: transparent;
      color: var(--color-text-light);
      border: 2px solid var(--color-text-light);
    }

    .btn-secondary:hover {
      background: var(--color-background-light);
      color: var(--color-primary);
    }

    .btn-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-icon {
      transform: translateX(4px);
    }

    .hero-features {
      display: flex;
      gap: var(--spacing-xl);
      flex-wrap: wrap;
    }

    .hero-feature {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: 0.95rem;
      opacity: 0.95;
    }

    .check {
      background: var(--color-secondary);
      color: var(--color-text-light);
      width: 20px;
      height: 20px;
      border-radius: var(--border-radius-round);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: var(--font-weight-bold);
    }

    /* Card Mockup with 3D Flip Effect */
    .hero-image {
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1000px;
    }

    .card-container {
      width: 420px;
      height: 260px;
      position: relative;
    }

    .card-shadow-s {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 15px;
      left: 20px;
      z-index: 0;
      opacity: 0.5;
    }

    .card-shadow-s svg {
      width: 100%;
      height: 100%;
      transform: rotate(-5deg);
    }

    .card-mockup {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.8s ease;
      cursor: pointer;
      z-index: 1;
    }

    .card-container:hover .card-mockup {
      transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
      border-radius: var(--border-radius-2xl);
      padding: 28px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    }

    /* Frente de la tarjeta */
    .card-front {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
      color: var(--color-text-light);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .card-shine {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.08), transparent);
      transform: rotate(45deg);
      pointer-events: none;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
    }

    .card-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .card-brand {
      color: var(--color-secondary);
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .card-type {
      font-size: 1.4rem;
      font-weight: 700;
      font-style: italic;
      letter-spacing: 2px;
      opacity: 0.9;
    }

    .card-chip {
      width: 50px;
      height: 40px;
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px;
      margin-top: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      z-index: 1;
    }

    .chip-line {
      width: 100%;
      height: 2px;
      background: rgba(0,0,0,0.3);
      border-radius: 1px;
    }

    .contactless {
      position: absolute;
      top: 28px;
      right: 80px;
      font-size: 2rem;
      opacity: 0.7;
      transform: rotate(90deg);
    }

    .card-info {
      z-index: 1;
    }

    .card-number {
      font-size: 1.6rem;
      letter-spacing: 4px;
      margin-bottom: 20px;
      font-weight: 500;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      font-family: 'Courier New', monospace;
    }

    .card-details {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .label {
      font-size: 0.65rem;
      opacity: 0.7;
      margin-bottom: 4px;
      letter-spacing: 1px;
      font-weight: 500;
    }

    .card-name {
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .expiry-date {
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 1px;
      font-family: 'Courier New', monospace;
    }

    /* Reverso de la tarjeta */
    .card-back {
      background: linear-gradient(135deg, #2a5298 0%, #1e3c72 50%, #7e22ce 100%);
      color: white;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .magnetic-strip {
      width: 100%;
      height: 50px;
      background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 50%, #1a1a1a 100%);
      margin-top: 28px;
      margin-bottom: 20px;
    }

    .signature-panel {
      background: rgba(255, 255, 255, 0.9);
      height: 45px;
      margin: 0 28px 20px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }

    .signature {
      color: #1a1a1a;
      font-family: 'Brush Script MT', cursive;
      font-size: 1.2rem;
      font-style: italic;
    }

    .cvv-box {
      background: white;
      padding: 6px 12px;
      border-radius: 4px;
      display: flex;
      gap: 8px;
      align-items: center;
      border: 1px dashed #ccc;
    }

    .cvv-label {
      font-size: 0.7rem;
      color: #666;
      font-weight: 600;
    }

    .cvv-number {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      color: #1a1a1a;
      font-weight: 700;
      letter-spacing: 2px;
    }

    .card-back-info {
      padding: 0 28px 28px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .back-text {
      font-size: 0.65rem;
      line-height: 1.4;
      opacity: 0.8;
      text-align: justify;
    }

    .card-back-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      opacity: 0.9;
    }

    /* Features Section */
    .features {
      padding: 100px var(--spacing-lg);
      background: var(--color-background);
    }

    .features-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-bottom: var(--spacing-md);
    }

    .section-subtitle {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--spacing-2xl);
    }

    .feature-card {
      background: var(--color-background-light);
      padding: var(--spacing-2xl) var(--spacing-xl);
      border-radius: var(--border-radius-xl);
      text-align: center;
      transition: var(--transition-base);
      border: 2px solid transparent;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
      border-color: var(--color-secondary);
    }

    .feature-icon-wrapper {
      width: 80px;
      height: 80px;
      background: var(--gradient-success);
      border-radius: var(--border-radius-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--spacing-xl);
    }

    .feature-icon {
      font-size: var(--font-size-3xl);
    }

    .feature-card h3 {
      font-size: 1.4rem;
      color: var(--color-primary);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-bold);
    }

    .feature-card p {
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Benefits Section */
    .benefits {
      padding: 100px var(--spacing-lg);
      background: var(--color-background-light);
    }

    .benefits-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .benefits-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-bottom: var(--spacing-2xl);
    }

    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .benefit-item {
      display: flex;
      gap: var(--spacing-md);
      align-items: start;
    }

    .benefit-icon {
      width: 32px;
      height: 32px;
      background: var(--color-secondary);
      color: var(--color-text-light);
      border-radius: var(--border-radius-round);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-bold);
      flex-shrink: 0;
    }

    .benefit-text h4 {
      font-size: var(--font-size-lg);
      color: var(--color-primary);
      margin-bottom: 4px;
      font-weight: var(--font-weight-semibold);
    }

    .benefit-text p {
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .benefits-stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }

    .stat-card {
      background: linear-gradient(135deg, var(--color-primary), #004a94);
      padding: var(--spacing-2xl);
      border-radius: var(--border-radius-xl);
      color: var(--color-text-light);
      text-align: center;
    }

    .stat-number {
      font-size: var(--font-size-3xl);
      font-weight: 800;
      color: var(--color-secondary);
      margin-bottom: var(--spacing-sm);
    }

    .stat-label {
      font-size: var(--font-size-lg);
      opacity: 0.95;
    }

    /* CTA Section */
    .cta {
      position: relative;
      padding: 120px var(--spacing-lg);
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, var(--color-primary) 100%);
      color: var(--color-text-light);
      overflow: hidden;
    }

    .cta-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.1;
      z-index: 0;
    }

    .cta-pattern {
      width: 100%;
      height: 100%;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(0, 168, 89, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 201, 109, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 30%);
    }

    .wave-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      transform: rotate(180deg);
    }

    .wave-top svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 80px;
    }

    .wave-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }

    .wave-bottom svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 80px;
    }

    .cta-container {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .cta-title {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .cta-subtitle {
      font-size: 1.3rem;
      opacity: 0.95;
      margin-bottom: var(--spacing-2xl);
      line-height: 1.6;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .btn-cta {
      padding: var(--spacing-lg) 48px;
      font-size: var(--font-size-lg);
      background: var(--color-background-light);
      color: var(--color-primary);
      margin-bottom: var(--spacing-xl);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .btn-cta::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: var(--border-radius-round);
      background: var(--color-primary);
      transition: width 0.6s ease, height 0.6s ease, top 0.6s ease, left 0.6s ease;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    .btn-cta:hover::before {
      width: 400%;
      height: 400%;
    }

    .btn-cta:hover {
      color: var(--color-text-light);
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }

    .cta-note {
      font-size: 0.95rem;
      opacity: 0.9;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Footer */
    .footer {
      background: var(--color-primary);
      color: var(--color-text-light);
      padding: 60px var(--spacing-lg) var(--spacing-lg);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 60px;
      margin-bottom: var(--spacing-2xl);
    }

    .footer-brand .logo-text {
      color: var(--color-text-light);
    }

    .footer-brand .logo-highlight {
      color: var(--color-secondary);
    }

    .footer-description {
      color: rgba(255, 255, 255, 0.9);
      margin-top: var(--spacing-md);
      font-size: var(--font-size-base);
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-2xl);
    }

    .footer-column h4 {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-md);
      color: var(--color-secondary);
      font-weight: var(--font-weight-bold);
    }

    .footer-column a {
      display: block;
      color: var(--color-text-light);
      text-decoration: none;
      opacity: 0.8;
      margin-bottom: 12px;
      transition: all 0.3s ease;
    }

    .footer-column a:hover {
      opacity: 1;
      color: var(--color-secondary);
      padding-left: 4px;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      opacity: 0.7;
    }

    /* Responsive */
    /* Tablet y pantallas medianas */
    @media (max-width: 992px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .hero-separator {
        display: none;
      }

      .hero-content {
        text-align: center;
      }

      .hero-title {
        font-size: 2.75rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-buttons {
        justify-content: center;
      }

      .hero-features {
        justify-content: center;
      }

      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }

      .benefits-container {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    /* Móviles */
    @media (max-width: 768px) {
      .navbar {
        padding: var(--spacing-md) 0;
      }

      .navbar-content {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .logo {
        font-size: 1.25rem;
      }

      .logo-icon {
        font-size: var(--font-size-xl);
      }

      .nav-buttons {
        width: 100%;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .nav-btn {
        width: 100%;
        padding: var(--spacing-md) var(--spacing-lg);
        justify-content: center;
      }

      .hero {
        padding: 120px var(--spacing-md) 50px;
      }

      .hero-container {
        gap: var(--spacing-2xl);
      }

      .hero-image {
        display: none;
      }

      .hero-badge {
        font-size: 0.85rem;
        padding: 6px 14px;
      }

      .hero-title {
        font-size: var(--font-size-3xl);
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: var(--font-size-base);
        line-height: 1.6;
        margin-bottom: var(--spacing-xl);
      }

      .hero-buttons {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .btn {
        width: 100%;
        justify-content: center;
        padding: 14px var(--spacing-xl);
      }

      .hero-features {
        flex-direction: column;
        gap: var(--spacing-md);
        align-items: center;
      }

      .features {
        padding: 60px var(--spacing-md);
      }

      .section-header {
        margin-bottom: var(--spacing-2xl);
      }

      .section-title {
        font-size: 1.75rem;
      }

      .section-subtitle {
        font-size: var(--font-size-base);
      }

      .features-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
      }

      .feature-card {
        padding: var(--spacing-2xl) var(--spacing-xl);
      }

      .benefits {
        padding: 60px var(--spacing-md);
      }

      .benefits-title {
        font-size: 1.75rem;
        margin-bottom: var(--spacing-2xl);
      }

      .benefit-item {
        gap: var(--spacing-md);
      }

      .benefit-text h4 {
        font-size: var(--font-size-lg);
      }

      .benefit-text p {
        font-size: var(--font-size-sm);
      }

      .benefits-stats {
        gap: var(--spacing-md);
      }

      .stat-card {
        padding: var(--spacing-2xl);
      }

      .stat-number {
        font-size: 2.5rem;
      }

      .stat-label {
        font-size: var(--font-size-base);
      }

      .cta {
        padding: 80px var(--spacing-md);
      }

      .cta-title {
        font-size: 1.75rem;
        margin-bottom: var(--spacing-md);
      }

      .cta-subtitle {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-2xl);
      }

      .btn-cta {
        padding: var(--spacing-md) var(--spacing-2xl);
        font-size: var(--font-size-lg);
      }

      .cta-note {
        font-size: 0.85rem;
      }

      .wave-top svg,
      .wave-bottom svg {
        height: 50px;
      }

      .footer {
        padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-md);
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-2xl);
        margin-bottom: var(--spacing-2xl);
      }

      .footer-brand {
        text-align: center;
      }

      .footer-links {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
        text-align: center;
      }

      .footer-column {
        text-align: center;
      }

      .footer-column a:hover {
        padding-left: 0;
      }

      .footer-bottom {
        padding-top: var(--spacing-lg);
        font-size: 0.85rem;
      }
    }

    /* Móviles pequeños */
    @media (max-width: 480px) {
      .hero-title {
        font-size: 1.75rem;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .benefits-title {
        font-size: 1.5rem;
      }

      .cta-title {
        font-size: 1.5rem;
      }

      .screen-balance {
        font-size: 2rem;
      }

      .stat-number {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent {}
