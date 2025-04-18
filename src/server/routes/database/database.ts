/**
 * example of a database connection
 */
export class Database {
  static instance = new Database();
  storedData: {
    [K in string]: {
      likedAnimeIds: number[];
    };
  } = {};

  constructor() {
    // Initialize the createdUsers array
    this.storedData = {
      testname: { likedAnimeIds: [235, 51818] },
      admin: { likedAnimeIds: [] },
    };
  }

  async createUser(username: string) {
    this.storedData = {
      ...this.storedData,
      [username]: { likedAnimeIds: [] },
    };
  }

  async getUsers() {
    return this.storedData;
  }

  async getUser(username: string) {
    const user = this.storedData[username];
    if (!user) {
      return null;
    }
    return user;
  }
}
