module.exports = {
  POSTGRES_CONNECTION_URI: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
  HOME_PAGE_URL: "https://ticket-triage.herokuapp.com/"
}
