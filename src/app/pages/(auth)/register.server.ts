import { fail, json, type PageServerAction } from '@analogjs/router/server/actions';
import { readFormData } from 'h3';
import { Database } from '../../../server/routes/database/database';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const username1 = body.get('username1') as string;
  const username2 = body.get('username2') as string;

  // check if username1 and username2 are the same
  if (!username1 || !username2 || username1 !== username2) {
    return fail(422, { match: `value ${username1} is not equal to ${username2}` });
  }

  // check if username1 is already taken
  if (await Database.instance.getUser(username1)) {
    return fail(422, { username: 'User Already Exists' });
  }

  // create user
  await Database.instance.createUser(username1);

  return json({ type: 'success', token: '1234567890', userId: 'TEST_123', username: username1 });
}
