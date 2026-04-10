import { AccelerometerService } from './AccelerometerService';
import { StepDetector } from './StepDetector';
import { StepRepository } from '../database/repositories/StepRepository';
import { useStepStore } from '../store/stepStore';
import { useUserStore } from '../store/userStore';
import { ForegroundService } from '../services/ForegroundService';
import { dateUtils } from '../utils/dateUtils';

export class BackgroundStepService {
  private static instance: BackgroundStepService;
  private accelerometer: AccelerometerService;
  private detector: StepDetector;

  private constructor() {
    this.detector = new StepDetector(
      this.handleBufferFull.bind(this),
      this.handleLiveStep.bind(this)
    );
    this.accelerometer = new AccelerometerService(
      this.detector.detectRotationIndependentStep.bind(this.detector)
    );
  }

  static getInstance(): BackgroundStepService {
    if (!BackgroundStepService.instance) {
      BackgroundStepService.instance = new BackgroundStepService();
    }
    return BackgroundStepService.instance;
  }

  start() {
    this.accelerometer.start();
  }

  stop() {
    this.accelerometer.stop();
    // Flush remaining steps if any
    const pending = this.detector.getPendingSteps();
    if (pending > 0) {
      this.handleBufferFull(pending);
    }
  }

  private async handleBufferFull(count: number) {
    const userId = useUserStore.getState().activeUserId;
    if (userId) {
      const dateKey = dateUtils.getTodayKey();
      await StepRepository.addStepBatch(userId, count, dateKey);
    }
  }

  private handleLiveStep() {
    useStepStore.getState().increment();
    const liveCount = useStepStore.getState().todayTotal;
    ForegroundService.updateNotification(`Total steps today: ${liveCount}`);
  }
}
