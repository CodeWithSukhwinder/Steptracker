import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class StepRecord extends Model {
  static table = 'step_records';

  @field('user_id') userId!: string;
  @field('step_count') stepCount!: number;
  @field('date_key') dateKey!: string;
  @readonly @date('timestamp') timestamp!: number;
}
