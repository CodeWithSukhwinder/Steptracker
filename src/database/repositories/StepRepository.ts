import { Collection, Q } from '@nozbe/watermelondb';
import { database } from '../index';
import StepRecord from '../models/StepRecord';
import DailySummary from '../models/DailySummary';

export class StepRepository {
  private static stepRecords: Collection<StepRecord> = database.get<StepRecord>('step_records');
  private static dailySummaries: Collection<DailySummary> = database.get<DailySummary>('daily_summaries');

  static async addStepBatch(userId: string, stepCount: number, dateKey: string): Promise<void> {
    await database.write(async () => {
      await this.stepRecords.create((record: StepRecord) => {
        record.userId = userId;
        record.stepCount = stepCount;
        record.dateKey = dateKey;
        record.timestamp = Date.now();
      });
    });
  }

  static async getTodaySteps(userId: string, dateKey: string): Promise<number> {
    const records = await this.stepRecords
      .query(Q.where('user_id', userId), Q.where('date_key', dateKey))
      .fetch();
    return records.reduce((sum, record) => sum + record.stepCount, 0);
  }

  static async getHistory(userId: string, limit: number = 7): Promise<DailySummary[]> {
    return await this.dailySummaries
      .query(
        Q.where('user_id', userId),
        Q.sortBy('date_key', Q.desc),
        Q.take(limit)
      )
      .fetch();
  }

  static async saveDailySummary(userId: string, dateKey: string, totalSteps: number): Promise<void> {
    await database.write(async () => {
      const existing = await this.dailySummaries
        .query(Q.where('user_id', userId), Q.where('date_key', dateKey))
        .fetch();

      if (existing.length > 0) {
        await existing[0].update((record) => {
          record.totalSteps = totalSteps;
        });
      } else {
        await this.dailySummaries.create((record) => {
          record.userId = userId;
          record.dateKey = dateKey;
          record.totalSteps = totalSteps;
        });
      }
    });
  }

  static async getSummaryForDate(userId: string, dateKey: string): Promise<number> {
    const summaries = await this.dailySummaries
      .query(Q.where('user_id', userId), Q.where('date_key', dateKey))
      .fetch();
    return summaries.length > 0 ? summaries[0].totalSteps : 0;
  }
}
