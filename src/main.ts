import { loadCommands } from './commands';
import { loadCrons } from './cron';
import { loadMenus } from './menus';

export async function main() {
  await loadMenus();
  await loadCommands();
  await loadCrons();
}
