import { State, Subscriber } from './utils/constants';

class Timer {
  idleTime: number;
  subscriber: Subscriber;
  state: string;
  timer: ReturnType<typeof setTimeout>;
  initialized: boolean;

  constructor(idleTime: number, subscriber: Subscriber) {
    this.idleTime = idleTime;
    this.subscriber = subscriber;

    this.initialized = false;
    this.state = State.Initial;
    this.timer = null;

    this.init();
  }

  public cancel() {
    clearTimeout(this.timer);
  }

  public setTimerState(newState: string): void {
    clearTimeout(this.timer);

    if (newState === State.Active) {
      this.timer = setTimeout(
        () => this.setTimerState(State.Idle),
        this.idleTime
      );
    }

    if (this.state !== newState) {
      this.state = newState;
    }

    if (this.state === State.Idle) {
      this.subscriber();

      clearTimeout(this.timer);

      this.initialized = false;
    }
  }

  private init() {
    if (!this.initialized) {
      this.setTimerState(State.Active);

      this.initialized = true;
    }
  }
}

export default Timer;
