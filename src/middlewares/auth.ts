import useDB from '@/db';
import type { MyContext } from '@root/context';
import type { NextFunction } from 'grammy';

export async function middlewareAuth(ctx: MyContext, next: NextFunction) {
  const db = useDB();

  if (!ctx.from || ctx.from?.is_bot) return;

  ctx.session.userLastMessageId = ctx.message?.message_id ?? 0;

  try {
    ctx.user = await db.user.middleware(ctx.from!);
    await next();
  } catch (e) {
    console.error(e);
    await ctx.reply('Вы не авторизованы. Пожалуйста, авторизуйтесь с помощью команды /start');
  }
}
