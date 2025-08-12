import {type GeneratedAlways, Kysely, CamelCasePlugin} from 'kysely'
import {PostgresJSDialect} from 'kysely-postgres-js'
import {DB} from './postgresqlDatabaseSchema'
import postgres from 'postgres'

export const db = new Kysely<DB>({
plugins: [new CamelCasePlugin()],
dialect: new PostgresJSDialect({
postgres: postgres(process.env.POSTGRESQL_DATABASE_CONNECTION_STRING, {
prepare: false,
idle_timeout: 10,
max: 3,
}),
}),
})