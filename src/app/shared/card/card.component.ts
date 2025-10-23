import { Component, Input, signal, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() imageAlt = '';
  @Input() actionText = '';
  @Input() variant: 'default' | 'elevated' | 'outlined' = 'default';
  @Input() hover = true;

  @Output() onAction = new EventEmitter<void>();

  get cardClasses() {
    const baseClasses = 'bg-white rounded-xl transition-all duration-300';
    
    const variantClasses = {
      default: 'shadow-lg',
      elevated: 'shadow-xl hover:shadow-2xl',
      outlined: 'border-2 border-gray-200 shadow-sm'
    };
    
    const hoverClass = this.hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
    
    return `${baseClasses} ${variantClasses[this.variant]} ${hoverClass}`;
  }
}
