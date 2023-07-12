import { trigger, style, animate, transition } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('0.3s', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.3s', style({ transform: 'translateY(100%)', opacity: 0 }))
  ])
]);