class UserRepository extends Repository {
  constructor(ss) {
    super(ss, SHEETS.games._name);
  }

  /**
   * @param {string} username
   * @returns {Object[]}
   */
  findByUsername(username) {
    const predicate = (value) => username === value[SHEETS.users.username];
    return this.findAll(predicate);
  }

  /**
   * @param {Object[]} row
   * @returns {Object}
   */
  fromRow(row) {
    return {
      name: String(row[SHEETS.users.name]),
      username: String(row[SHEETS.users.username]),
      hashedPassword: String(row[SHEETS.users.hashedPassword]) || null,
      admin: Boolean(row[SHEETS.users.admin]),
      token: String(row[SHEETS.games.token]) || null,
    }
  }
}
