import { JSONFilePreset } from 'lowdb/node';
import { Database, LowDatabase } from '../../types/Database.js';
/**
 * Simple DB
 * Not optimized for performance
 */

export const DBClient = async (dataDir: string): Promise<LowDatabase> => {
  const defaultData: Database = { users: [] };
  const db = await JSONFilePreset(dataDir, defaultData);
  return db;
};
