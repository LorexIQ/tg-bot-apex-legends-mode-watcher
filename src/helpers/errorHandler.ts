import useLogger from '@composables/useLogger';
import { ReqError } from './ReqError';
import type { Context } from 'grammy';

export async function errorHandler(func: () => Promise<any>, ctx: Context) {
  const logger = useLogger();

  try {
    await func();
  } catch (e: any) {
    if (e instanceof ReqError) {
      await ctx.reply(e.message, {
        reply_markup: { remove_keyboard: true },
        parse_mode: 'HTML'
      });
    } else {
      logger.error(e);
      await ctx.reply('Произошла ошибка, попробуйте позже');
    }
  }
}
