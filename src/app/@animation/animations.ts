import { animate, state, style, transition, trigger } from '@angular/animations';

export enum VisibilityState {
	Visible = 'visible',
	Hidden = 'hidden'
}

export enum Direction {
	Up = 'Up',
	Down = 'Down'
}

export const Animations = {
    menu: trigger('toggle', [
        state(
            VisibilityState.Hidden,
            style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
        state(
            VisibilityState.Visible,
            style({ opacity: 1, transform: 'translateY(0)' })
        ),
        transition('* => *', animate('200ms ease-in'))
    ])
}