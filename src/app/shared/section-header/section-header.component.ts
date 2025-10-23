import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() showDivider = true;
  @Input() centered = true;

  get titleClasses() {
    const sizeClasses = {
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-4xl',
      lg: 'text-4xl md:text-5xl',
      xl: 'text-5xl md:text-6xl'
    };
    
    const centerClass = this.centered ? 'text-center' : 'text-left';
    
    return `font-display font-bold text-gray-900 ${sizeClasses[this.size]} ${centerClass} animate-fade-in-up`;
  }
}
