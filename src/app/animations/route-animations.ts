import {
  animate,
  AnimationMetadata,
  group,
  style,
  transition,
  trigger,
  query,
} from '@angular/animations';


const initialRouterStyle = style({ position: 'relative' });
const initialRouteStyles = query(':enter, :leave', [
  style({
    position: 'absolute',
    top: 0,
    left: 0,
  }),
]);

const slideUpAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':enter', [style({ transform: 'translateY(100%)', 'z-index': 10 })]),
  query(':enter', [animate('.3s ease-in', style({ transform: 'translateY(0)' }))]),
];

const slideDownAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':leave', [style({ transform: 'translateY(0)', 'z-index': 10 })]),
  query(':leave', [animate('.3s ease-in', style({ transform: 'translateY(100%)' }))]),
];

const moveLeftAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':enter', [style({ transform: 'translateX(100%)' })]),
  query(':leave', [style({ transform: 'translateX(0)' })]),
  group([
    query(':enter', [animate('.3s ease-in', style({ transform: 'translateX(0)' }))]),
    query(':leave', [animate('.3s ease-in', style({ transform: 'translateX(-100%)' }))]),
  ]),
];

const moveRightAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':enter', [style({ transform: 'translateX(-100%)' })]),
  query(':leave', [style({ transform: 'translateX(0)' })]),
  group([
    query(':enter', [animate('.3s ease-in', style({ transform: 'translateX(0)' }))]),
    query(':leave', [animate('.3s ease-in', style({ transform: 'translateX(100%)' }))]),
  ]),
];


export const routeAnimations = trigger('routeAnimations', [
  transition('main-menu => file-view, password => settings', moveLeftAnimation),
  transition('file-view => main-menu, settings => main-menu', moveRightAnimation),
  transition('main-menu => password', slideUpAnimation),
  transition('password => main-menu', slideDownAnimation),
]);
