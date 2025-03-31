import axios from 'axios';
import env from '@/constants/env';
import useLogger from '@composables/useLogger';
import type { ApexMapRotation } from '@/types/apex';
import useDB from '@/db';
import useBot from '@composables/useBot';

export default async function cronCheckMode() {
  const logger = useLogger('Cron');
  const db = useDB();
  const bot = useBot();

  try {
    const response = await axios.get<ApexMapRotation>(`https://api.mozambiquehe.re/maprotation?auth=${env.apexLegendsApiKey}&version=2`);

    if (response.data.ltm.current.eventName === 'Gun Run') {
      const eventStart = response.data.ltm.current.start;
      const users = await db.user.getUsersWithNotifyEnabled();
      const usersForNotify = users.filter(user => !user.notifies.length || user.notifies.some(notify => (notify.meta as any).eventStart !== eventStart));

      for (const user of usersForNotify) {
        await db.notify.upsert(user.id, { eventStart });
        await bot.api.sendMessage(user.id, 'Началось событие Gun Run 🏃‍♂️🔫');
      }
    }
  } catch (e) {
    logger.error('Ошибка:', e);
  }
}
