import { Knex } from 'knex'

const KnexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.SEWO_SQL_HOST,
    port: +(process.env.SEWO_SQL_PORT || 5432),
    user: process.env.SEWO_SQL_USER,
    database: process.env.SEWO_SQL_DATABASE,
    password: process.env.SEWO_SQL_PASSWORD
  },
  debug: process.env.NODE_ENV === 'development'
}

export const config = KnexConfig
