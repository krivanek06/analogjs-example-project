import { createError, defineEventHandler, readBody } from 'h3';
import { AnimeDetails } from './../../../api/api.model';
import { Database } from './../../../database/database';

// todo = create API endpoints to add and remove anime in DB
// todo = add medatada to routes (home)
// todo = display blogposts
// todo = add metadata to blog posts (dynamic)

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

  // fetch anime details from API
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const anime = (await response.json()) as { data: AnimeDetails };

  // check if anime is not null
  if (!anime || !anime.data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Anime not found',
    });
  }

  // save anime to DB
  await Database.instance.addLikedAnime(username, anime.data);

  return { data: anime.data };
});
