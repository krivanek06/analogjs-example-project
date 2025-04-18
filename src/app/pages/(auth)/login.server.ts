import { fail, json, type PageServerAction } from '@analogjs/router/server/actions';
import { readFormData } from 'h3';
import { Database } from '../../../server/routes/database/database';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const username = body.get('username') as string;

  console.log('validating username', username);
  console.log('AuthDB', Database.instance.storedData);

  if (!username) {
    return fail(422, { username: 'Username is required' });
  }

  if (!(await Database.instance.getUser(username))) {
    return fail(422, { username: 'Invalid username' });
  }

  return json({ type: 'success', token: '1234567890', userId: 'TEST_123', username: username });
}
