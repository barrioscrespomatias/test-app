import { trigger, style, animate, transition, keyframes } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('0.3s', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.3s', style({ transform: 'translateY(100%)', opacity: 0 }))
  ])
]);

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.5s', style({ opacity: 0 }))
  ])
]);

export const zoomInOutAnimation = trigger('zoomInOutAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0)', opacity: 0 }),
    animate('0.3s', style({ transform: 'scale(1)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.3s', style({ transform: 'scale(0)', opacity: 0 }))
  ])
]);

export const slideLeftRightAnimation = trigger('slideLeftRightAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('0.4s', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.4s', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const bounceAnimation = trigger('bounceAnimation', [
  transition(':enter', [
    animate('0.5s', keyframes([
      style({ transform: 'translateY(-100%)', offset: 0 }),
      style({ transform: 'translateY(15%)', offset: 0.3 }),
      style({ transform: 'translateY(-10%)', offset: 0.5 }),
      style({ transform: 'translateY(0)', offset: 1.0 })
    ]))
  ]),
  transition(':leave', [
    animate('0.5s', keyframes([
      style({ transform: 'translateY(0)', offset: 0 }),
      style({ transform: 'translateY(-10%)', offset: 0.5 }),
      style({ transform: 'translateY(100%)', offset: 1.0 })
    ]))
  ])
]);

export const flipAnimation = trigger('flipAnimation', [
  transition(':enter', [
    animate('0.6s', keyframes([
      style({ transform: 'rotateY(90deg)', opacity: 0, offset: 0 }),
      style({ transform: 'rotateY(0)', opacity: 1, offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('0.6s', keyframes([
      style({ transform: 'rotateY(0)', opacity: 1, offset: 0 }),
      style({ transform: 'rotateY(90deg)', opacity: 0, offset: 1 })
    ]))
  ])
]);


export const expandCollapseAnimation = trigger('expandCollapseAnimation', [
  transition(':enter', [
    style({ height: '0px', opacity: 0 }),
    animate('0.4s', style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.4s', style({ height: '0px', opacity: 0 }))
  ])
]);