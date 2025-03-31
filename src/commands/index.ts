import useLogger from '@composables/useLogger';
import { commandStart } from './start';
import useBot from '@composables/useBot';
import { middlewareAuth } from '@/middlewares';

export async function loadCommands() {
  const logger = useLogger();
  const bot = useBot();

  await bot.command('start', middlewareAuth, commandStart);

  await bot.api.setMyCommands([
    {
      command: 'start',
      description: 'Меню'
    }
  ]);

  logger.info('Команды загружены');
}
