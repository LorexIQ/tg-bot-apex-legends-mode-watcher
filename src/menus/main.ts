import useDB from '@/db';
import { MenuConstructor } from '@root/menu';
import { GrammyError } from 'grammy';

const menuMain = new MenuConstructor('main-menu')
  .text(
    ctx => `Уведомления ${ctx.user?.notifyEnabled ? '✅' : '❌'}`,
    async (ctx) => {
      try {
        const db = useDB();

        if (ctx.user) {
          const updatedUser = await db.user.switchNotifyStatus(ctx.user.id);
          ctx.user = updatedUser;

          try {
            await ctx.menu.update();
            await ctx.answerCallbackQuery({ text: 'Настройки обновлены' });
          } catch (error) {
            if (error instanceof GrammyError && error.description.includes('message is not modified')) {
              await ctx.answerCallbackQuery({ text: 'Настройки обновлены' });
            } else {
              throw error;
            }
          }
        }
      } catch {
        await ctx.answerCallbackQuery({ text: 'Произошла ошибка при обновлении настроек' });
      }
    }
  );

export default menuMain;
