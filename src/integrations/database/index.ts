import { knex, Knex } from 'knex'
import { config } from './lib'

const logger = {
  info: (m: string) => console.log(m)
}

export const createSqlConnection = async (client?: string | typeof Knex.Client) => {
  try {
    const databaseClient = knex(client ? { ...config, client } : config)
    const connectionInfo = config.connection as Knex.PgConnectionConfig;

    // Test Connection
    databaseClient.raw('SELECT 1')
      .then(() => logger.info(`DB Connection to ${connectionInfo.host}:${connectionInfo.port} established, db: ${connectionInfo.database}`))
      .catch((e: Error) => logger.info(`DB Connection failed: ${e}`))

    return {
      databaseClient
    }
  } catch (err) {
    logger.info((err as Error).message)
  }
}