import type { Languages, Prisma } from '@prisma/client';
import type { DBConstructor } from '.';
import type { GrammyUser, PrismaUser } from '@/types';
import { ReqError } from '@/helpers/ReqError';

export class DBUserService {
  constructor(
    private ctx: DBConstructor,
    private db: Prisma.UserDelegate
  ) { }

  async middleware(tgUser: GrammyUser): Promise<PrismaUser> {
    if (tgUser.is_bot) throw new ReqError('Неизвесный клиент');

    const userData: Prisma.UserUncheckedCreateInput = {
      id: tgUser.id,
      isBot: tgUser.is_bot,
      firstName: tgUser.first_name,
      lastName: tgUser.last_name,
      username: tgUser.username,
      languageCode: tgUser.language_code as Languages,
      isPremium: tgUser.is_premium ?? false,
      role: 'user'
    };

    return this.db.upsert({
      where: { id: tgUser.id },
      create: userData,
      update: userData
    });
  }

  async getById(id: number) {
    return this.db.findUnique({ where: { id } });
  }

  async getUsersWithNotifyEnabled() {
    return this.db.findMany({
      where: { notifyEnabled: true },
      include: {
        notifies: true
      }
    });
  }

  async switchNotifyStatus(userId: number): Promise<PrismaUser> {
    const user = await this.getById(userId);

    if (!user) throw new ReqError('Пользователь не найден');

    return this.db.update({
      where: { id: userId },
      data: { notifyEnabled: !user.notifyEnabled }
    });
  }
}
