import { accelerometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import { Subscription } from 'rxjs';

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

export class AccelerometerService {
  private subscription: Subscription | null = null;
  private alpha = 0.1;
  private lastValue: AccelerometerData = { x: 0, y: 0, z: 9.8 }; // Initial gravity baseline

  constructor(private onData: (data: AccelerometerData) => void) {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100); // 10Hz = 100ms
  }

  start() {
    this.subscription = accelerometer.subscribe(({ x, y, z }) => {
      const filtered = this.lowPassFilter({ x, y, z });
      this.onData(filtered);
    });
  }

  stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private lowPassFilter(newValue: AccelerometerData): AccelerometerData {
    this.lastValue = {
      x: this.alpha * newValue.x + (1 - this.alpha) * this.lastValue.x,
      y: this.alpha * newValue.y + (1 - this.alpha) * this.lastValue.y,
      z: this.alpha * newValue.z + (1 - this.alpha) * this.lastValue.z,
    };
    return this.lastValue;
  }
}
