import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'step_records',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'timestamp', type: 'number', isIndexed: true },
        { name: 'step_count', type: 'number' },
        { name: 'date_key', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'daily_summaries',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'date_key', type: 'string', isIndexed: true },
        { name: 'total_steps', type: 'number' },
      ],
    }),
  ],
});
