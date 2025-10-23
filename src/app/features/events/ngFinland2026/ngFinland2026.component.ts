import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CardComponent } from '../../../shared/card/card.component';
import { SectionHeaderComponent } from '../../../shared/section-header/section-header.component';

interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  talkTitle: string;
  bio: string;
}

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

@Component({
  selector: 'app-ng-finland2026',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent, SectionHeaderComponent],
  templateUrl: './ngFinland2026.component.html',
  styleUrl: './ngFinland2026.component.scss'
})
export class NgFinland2026Component {
  featuredSpeakers = signal<Speaker[]>([
    {
      id: 1,
      name: 'Misko Hevery',
      title: 'Angular Team Lead',
      company: 'Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      talkTitle: 'The Future of Angular',
      bio: 'Creator of Angular and leading the framework evolution at Google.'
    },
    {
      id: 2,
      name: 'Sarah Drasner',
      title: 'Senior Director of Engineering',
      company: 'Netlify',
      image: 'https://heypresents.com/assets/talks/future-of-animation/cover-62ebaec2cd8c5429979f8287f6e87da458356ec865c6434148e6486665c0ee5f.jpg',
      talkTitle: 'Advanced Angular Patterns',
      bio: 'Award-winning speaker and expert in web performance and animations.'
    },
    {
      id: 3,
      name: 'Tomas Trajan',
      title: 'Angular Developer Expert',
      company: 'This is Angular',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      talkTitle: 'Angular Signals Deep Dive',
      bio: 'Angular GDE and creator of popular Angular libraries and tools.'
    }
  ]);

  platinumSponsors = signal<Sponsor[]>([
    {
      id: 1,
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      website: 'https://google.com',
      tier: 'platinum'
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      website: 'https://microsoft.com',
      tier: 'platinum'
    }
  ]);

  goldSponsors = signal<Sponsor[]>([
    {
      id: 3,
      name: 'Netlify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg',
      website: 'https://netlify.com',
      tier: 'gold'
    },
    {
      id: 4,
      name: 'Vercel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg',
      website: 'https://vercel.com',
      tier: 'gold'
    },
    {
      id: 5,
      name: 'Auth0',
      logo: 'https://wpmedia.tealium.com/wp-content/uploads/2022/04/auth0-logo.png',
      website: 'https://auth0.com',
      tier: 'gold'
    },
    {
      id: 6,
      name: 'Stripe',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFgNCm9j7xOAEE7DfXCwvgm-Uqyla4ILe6A&s',
      website: 'https://stripe.com',
      tier: 'gold'
    }
  ]);

  otherSponsors = signal<Sponsor[]>([
    {
      id: 7,
      name: 'Angular',
      logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/angular-icon.png',
      website: 'https://angular.io',
      tier: 'silver'
    },
    {
      id: 8,
      name: 'RxJS',
      logo: 'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png',
      website: 'https://rxjs.dev',
      tier: 'silver'
    },
  ]);

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  registerNow() {
    // In a real app, this would redirect to a registration system
    alert('Registration will open soon! Stay tuned for updates.');
  }
}
