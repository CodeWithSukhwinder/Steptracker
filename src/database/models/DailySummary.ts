import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class DailySummary extends Model {
  static table = 'daily_summaries';

  @field('user_id') userId!: string;
  @field('date_key') dateKey!: string;
  @field('total_steps') totalSteps!: number;
}
