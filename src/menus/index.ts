import useBot from '@composables/useBot';
import menuMain from './main';

export async function loadMenus() {
  const bot = useBot();

  await bot.use(menuMain);
}
