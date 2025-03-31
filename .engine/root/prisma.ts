import useLogger from '@composables/useLogger';
import { PrismaClient } from '@prisma/client';

export default class PrismaConstructor {
  private logger = useLogger('Prisma');
  private prisma = new PrismaClient();

  user = this.prisma.user;
  session = this.prisma.session;
  notify = this.prisma.notify;

  public async connect() {
    try {
      await this.prisma.$connect();
      this.logger.info('Успешно подключено');
    } catch (error) {
      this.logger.error('Ошибка подключения', error);
    }
  }

  public async disconnect() {
    await this.prisma.$disconnect();
  }

  public async getPrisma() {
    return this.prisma;
  }
}
