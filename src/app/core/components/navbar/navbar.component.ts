import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule, ButtonComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollToRegistration() {
    // This will scroll to the registration section on the home page
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openDiscord() {
    window.open('https://discord.gg/tBmBxHCz', '_blank', 'noopener,noreferrer');
  }
}
