import { CronJob } from 'cron';
import cronCheckMode from './checkMode';

export async function loadCrons() {
  CronJob.from({
    cronTime: '* * * * *',
    onTick: cronCheckMode,
    start: true,
    runOnInit: true,
    timeZone: 'Europe/Moscow'
  });
}
