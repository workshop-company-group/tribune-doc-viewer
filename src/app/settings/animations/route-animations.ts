import {
  animate,
  AnimationMetadata,
  AnimationQueryMetadata,
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
  })
]);

const moveLeftAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':enter', [style({ transform: 'translateX(100%) scale(0.1)' })]),
  query(':leave', [style({ transform: 'translateX(0) scale(1)' })]),
  group([
    query(':enter', [animate('.3s ease-in', style({ transform: 'translateX(0) scale(1)' }))]),
    query(':leave', [animate('.3s ease-in', style({ transform: 'translateX(-100%) scale(0.1)' }))]),
  ]),
];

const moveRightAnimation: AnimationMetadata[] = [
  initialRouterStyle,
  initialRouteStyles,
  query(':enter', [style({ transform: 'translateX(-100%) scale(0.1)' })]),
  query(':leave', [style({ transform: 'translateX(0) scale(1)' })]),
  group([
    query(':enter', [animate('.3s ease-in', style({ transform: 'translateX(0) scale(1)' }))]),
    query(':leave', [animate('.3s ease-in', style({ transform: 'translateX(100%) scale(0.1)' }))]),
  ]),
];


export const routeAnimations = trigger('routeAnimations', [
  transition('general => recording, recording => broadcasting', moveLeftAnimation),
  transition('broadcasting => recording, recording => general', moveRightAnimation),
]);
