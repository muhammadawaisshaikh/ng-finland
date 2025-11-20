import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import { CardComponent } from '../../shared/card/card.component';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterModule, ButtonComponent, CardComponent, SectionHeaderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  communityHighlights = signal([
    {
      id: 1,
      title: 'Monthly Meetups',
      subtitle: 'Every 2nd Thursday',
      image: 'https://www.travelinglifestyle.net/wp-content/uploads/2019/02/digital-nomads.jpg',
      imageAlt: 'Angular meetup in Helsinki',
      actionText: 'Learn More',
      action: () => this.scrollToEvents()
    },
    {
      id: 2,
      title: 'Workshop Series',
      subtitle: 'Hands-on Learning',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      imageAlt: 'Angular workshop session',
      actionText: 'View Schedule',
      action: () => this.scrollToEvents()
    },
    {
      id: 3,
      title: 'Open Source',
      subtitle: 'Community Projects',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      imageAlt: 'Open source collaboration',
      actionText: 'Contribute',
      action: () => this.openGitHub()
    }
  ]);

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToEvents() {
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToEvent() {
    window.location.href = '/events/ngfinland2026';
  }

  /**
   * Open the community Linktree containing Slack / Discord and other links.
   */
  joinCommunity() {
    window.open('https://discord.gg/tBmBxHCz', '_blank', 'noopener,noreferrer');
  }

  openGitHub() {
    window.open('https://github.com/ngfinland', '_blank');
  }
}
