import { knex, Knex } from 'knex'
import { config } from './lib'

const logger = {
  info: (m: string) => console.log(m)
}

let connection: Knex | null = null;

export const createSqlConnection = async (client?: string | typeof Knex.Client) => {
  try {
    if (connection) return { connection }

    const databaseClient: Knex = knex(client ? { ...config, client } : config)
    const connectionInfo = config.connection as Knex.PgConnectionConfig;

    // Test Connection
    databaseClient.raw('SELECT 1')
      .then(() => {
        logger.info(`DB Connection to ${connectionInfo.host}:${connectionInfo.port} established, db: ${connectionInfo.database}`)
        connection = databaseClient
      })
      .catch((e: Error) => logger.info(`DB Connection failed: ${e}`))

    return { connection }
  } catch (err) {
    logger.info((err as Error).message)
  }
}