export const DEBOUNCE_DELAY = 50;
export type Deactivate = () => void;
export type Unsubscribe = (completed?: () => void) => void;
export type Subscriber = () => void;
export type Options = {
  platform?: string;
  events?: string[];
}

export enum State {
  Active = 'active',
  Idle = 'idle',
  Initial = '',
}

export enum PLatform {
  Browser = 'browser',
  Mobile = 'mobile',
  Override = 'override'
}
