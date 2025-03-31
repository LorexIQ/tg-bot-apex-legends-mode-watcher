import { errorHandler } from '@/helpers/errorHandler';
import { ReqError } from '@/helpers/ReqError';
import menuMain from '@/menus/main';
import type { MyContext } from '@root/context';

export async function commandStart(ctx: MyContext) {
  await errorHandler(async () => {
    if (!ctx.from) throw new ReqError('Неизвесный клиент');

    await ctx.reply(
      'Привет! Этот бот предназначен для отправки уведомлений в чат об запуске ожидаемых режимов в Apex Legends.\n'
      + 'На данный момент бот находится в разработке и доступно только базовое уведомление о запуске гонки вооружения.\n\n'
      + '<b>Настройки:</b>\n'
      + `- Уведомления: ${ctx.user?.notifyEnabled ? 'Включено' : 'Выключено'}`,
      {
        reply_markup: menuMain
      }
    );
  }, ctx);
}
