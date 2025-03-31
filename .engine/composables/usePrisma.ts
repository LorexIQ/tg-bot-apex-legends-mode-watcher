import { container } from 'tsyringe';
import DBConstructor from '@root/prisma';

export default function () {
  return container.resolve(DBConstructor);
}
