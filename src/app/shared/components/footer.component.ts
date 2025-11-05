import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 <span class="brand">FinTech</span> App. Todos los derechos reservados by <span class="company">HampCode</span>.</p>
        <div class="footer-links">
          <a href="#">Términos y Condiciones</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #2d3748;
      color: white;
      padding: 2rem;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-text {
      color: #e2e8f0;
      margin: 0;
    }

    .brand {
      color: #fbbf24;
      font-weight: 600;
    }

    .company {
      color: #10b981;
      font-weight: 600;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s;
      font-weight: 500;
    }

    .footer-links a:hover {
      color: #fbbf24;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        text-align: center;
      }

      .footer-links {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class FooterComponent {}
