import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('action')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('performed_at', { useTz: true })
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
