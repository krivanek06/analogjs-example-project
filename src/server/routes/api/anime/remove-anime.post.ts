import { createError, defineEventHandler, readBody } from 'h3';
import { Database } from '../../../database/database';

export default defineEventHandler(async event => {
  const body = (await readBody(event)) as { id: string; username: string };
  const id = parseInt(body?.id);
  const username = body?.username;

  // check if id is a number
  if (!Number.isInteger(id) || !username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input data',
    });
  }

  // remove anime from DB
  const result = await Database.instance.removeLikedAnime(username, id);

  return { data: result };
});
