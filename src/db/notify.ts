import type { Prisma } from '@prisma/client';
import type { DBConstructor } from '.';

export class DBNotifyService {
  constructor(
    private ctx: DBConstructor,
    private db: Prisma.NotifyDelegate
  ) { }

  async getById(id: number) {
    return this.db.findUnique({ where: { id } });
  }

  async getByUserId(userId: number) {
    return this.db.findMany({ where: { userId } });
  }

  async upsert(userId: number, meta: Record<string, any>) {
    const notify = await this.db.findFirst({ where: { userId } });

    if (!notify) {
      return this.db.create({ data: { meta, user: { connect: { id: userId } } } });
    } else {
      return this.db.update({
        where: { id: notify.id },
        data: { meta }
      });
    }
  }
}
