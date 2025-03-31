import type { Context } from 'grammy';
import { Bot, enhanceStorage, GrammyError, HttpError, session } from 'grammy';
import type { MyApi, MyContext } from './context';
import { ContextConstructorBuilder } from './context';
import env from '../../src/constants/env';
import useLogger from '@composables/useLogger';
import type { SessionConstructor } from './session';
import useDB from '@composables/usePrisma';
import { PrismaAdapter } from '@grammyjs/storage-prisma';
import { hydrate, hydrateApi } from '@grammyjs/hydrate';
import { middlewareAuth } from '@/middlewares';

export default class BotConstructor<
  C extends MyContext = MyContext,
  A extends MyApi = MyApi
> extends Bot<C, A> {
  private logger = useLogger('Bot');
  private db = useDB();

  constructor() {
    super(env.botToken, {
      ContextConstructor: ContextConstructorBuilder as unknown as new (...args: ConstructorParameters<typeof Context>) => C
    });

    this._initUses();
    this._systemHandlers();
  }

  private _initUses() {
    // Plugin Session
    this.use(session({
      initial: this._initialSession,
      storage: enhanceStorage({
        storage: new PrismaAdapter(this.db.session),
        millisecondsToLive: 60 * 60 * 24 * 30 * 1000
      })
    }));

    // Plugin Hydrate
    this.use(hydrate());
    this.api.config.use(hydrateApi());

    // Middlewares
    this.use(middlewareAuth);
  }

  private _initialSession(): SessionConstructor {
    return {
      userLastMessageId: 0
    };
  }

  private _systemHandlers() {
    this.catch((error) => {
      const ctx = error.ctx;
      const e = error.error;
      this.logger.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);

      if (e instanceof GrammyError) {
        this.logger.error('Ошибка в запросе:', e.description);
      } else if (e instanceof HttpError) {
        this.logger.error('Не удалось связаться с Telegram:', e);
      } else {
        this.logger.error('Неизвестная ошибка:', e);
      }
    });
  }

  run() {
    super.start({
      onStart: () => {
        this.logger.info('Успешно запущен');
      }
    });
  }
}
