import { StepRepository } from '../database/repositories/StepRepository';
import { useStepStore } from '../store/stepStore';
import { useUserStore } from '../store/userStore';
import { dateUtils } from '../utils/dateUtils';

export class SyncService {
  static async reconcile() {
    const userId = useUserStore.getState().activeUserId;
    if (!userId) return;

    const today = dateUtils.getTodayKey();
    
    // 1. Sync live count from DB if needed
    const dbTotal = await StepRepository.getTodaySteps(userId, today);
    useStepStore.getState().setTodayTotal(dbTotal);

    // 2. Handle rollover for previous days missing summaries
    await this.handleRollover(userId);
  }

  static async handleRollover(userId: string) {
    const yesterday = dateUtils.getYesterdayKey();
    
    // Check if yesterday's summary exists
    const existingSummary = await StepRepository.getSummaryForDate(userId, yesterday);
    
    if (existingSummary === 0) {
      // Aggregate yesterday's steps and save summary
      const totalSteps = await StepRepository.getTodaySteps(userId, yesterday);
      if (totalSteps > 0) {
        await StepRepository.saveDailySummary(userId, yesterday, totalSteps);
      }
    }
  }
}
