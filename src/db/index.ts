import useLogger from '@composables/useLogger';
import usePrisma from '@composables/usePrisma';
import { DBUserService } from './user';
import { container } from 'tsyringe';
import { DBNotifyService } from './notify';

export class DBConstructor {
  private logger = useLogger('DB');
  private db = usePrisma();

  user = new DBUserService(this, this.db.user);
  notify = new DBNotifyService(this, this.db.notify);
}

export default function useDB() {
  const value = container.resolve(DBConstructor);
  if (value) return value;

  const db = new DBConstructor();
  container.register(DBConstructor, { useValue: db });
  return db;
}
