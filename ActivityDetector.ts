import Timer from './Timer';

import { debounce, DESKTOP_EVENTS, MOBILE_EVENTS } from './utils';

import { 
  DEBOUNCE_DELAY,
  Deactivate,
  Options, 
  PLatform, 
  State, 
  Subscriber, 
  Unsubscribe
} from './utils/constants';

export class ActivityDetector {
  init: boolean;
  events: string[];
  timers: any;
  count: number;

  constructor({ init = false } = {}) {
    this.init = init;

    this.events = null;
    this.timers = new Map<number, unknown>();
    this.count = 0;

    if (init) {
      this.activate();
    }
  }

  private handleActivityEvent = debounce(() => {
    this.timers.forEach((timer: Timer) => {
      timer.setTimerState(State.Active);
    });
  }, DEBOUNCE_DELAY);

  public subscribe(time: number, subcriber: Subscriber): Unsubscribe {
    const subscription = new Timer(time, subcriber);
    const count = this.count;
    
    this.timers.set(count, subscription);
    this.count++;

    return (completed) => {
      this.timers.delete(count);
      
      if (typeof completed === 'function') {
        completed();
      }
    };
  }

  public activate({ platform = '', events = [] }: Options = {}): Deactivate { 
    this.events = [...DESKTOP_EVENTS, ...MOBILE_EVENTS];

    if (platform === PLatform.Browser) {
      this.events = [...DESKTOP_EVENTS, ...events];
    }

    if (platform === PLatform.Mobile) {
      this.events = [...MOBILE_EVENTS, ...events];
    }

    if (platform === PLatform.Override && events.length) {
      this.events = [...events];
    }

    console.log(this.events);

    this.events.forEach((event) => {
      window.addEventListener(event, this.handleActivityEvent);
    });

    const deactivate = () => {
      this.events.forEach((event) => {
        window.removeEventListener(event, this.handleActivityEvent);
      });

      this.timers.forEach((timer: Timer) => {
        timer.cancel();
      });

      this.timers.clear();
    };

    return deactivate;
  }
}

export default ActivityDetector;
