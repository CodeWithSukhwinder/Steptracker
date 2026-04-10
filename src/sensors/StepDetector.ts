import { AccelerometerData } from './AccelerometerService';

export class StepDetector {
  private lastStepTime = 0;
  private minStepInterval = 250; // ms
  private threshold = 1.2;
  private gravity = 9.8;
  
  private stepBuffer: number = 0;
  private readonly BUFFER_LIMIT = 10;

  constructor(private onStepBufferFull: (count: number) => void, private onLiveStep: () => void) {}

  detectRotationIndependentStep(data: AccelerometerData) {
    const { x, y, z } = data;
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const normalizedMagnitude = magnitude / this.gravity;

    const currentTime = Date.now();
    if (
      normalizedMagnitude > this.threshold &&
      currentTime - this.lastStepTime > this.minStepInterval
    ) {
      this.lastStepTime = currentTime;
      this.handleStep();
    }
  }

  private handleStep() {
    this.stepBuffer++;
    this.onLiveStep();

    if (this.stepBuffer >= this.BUFFER_LIMIT) {
      this.onStepBufferFull(this.stepBuffer);
      this.stepBuffer = 0;
    }
  }

  getPendingSteps(): number {
    return this.stepBuffer;
  }
  
  resetBuffer() {
    this.stepBuffer = 0;
  }
}
