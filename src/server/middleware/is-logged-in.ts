import { defineEventHandler, getHeader, getRequestURL, sendRedirect } from 'h3';

export default defineEventHandler(async event => {
  // Only execute for /admin routes
  if (getRequestURL(event).pathname.includes('/api/anime')) {
    const authToken = getHeader(event, 'authToken');

    console.log('isLoggedIn', authToken);

    // check auth and redirect
    if (!authToken) {
      console.log('User not logged in, redirecting to login');
      sendRedirect(event, '/login', 401);
    }
  }
});
