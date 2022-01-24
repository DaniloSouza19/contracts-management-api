import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createContractsRenewHistory1643039784925
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contracts_renew_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'contract_id',
            type: 'uuid',
          },
          {
            name: 'new_price',
            type: 'numeric',
          },
          {
            name: 'old_price',
            type: 'numeric',
          },
          {
            name: 'new_start_date',
            type: 'timestamp',
          },
          {
            name: 'new_end_date',
            type: 'timestamp',
          },
          {
            name: 'old_start_date',
            type: 'timestamp',
          },
          {
            name: 'old_end_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKContractsRenewHistory',
            columnNames: ['contract_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contracts',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts_renew_history');
  }
}
