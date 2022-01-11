import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContracts1641902110427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contracts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'contractor_id',
            type: 'uuid',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'registration_id',
            type: 'varchar',
          },
          {
            name: 'registry_office',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'FKPeopleContractsContractor',
            columnNames: ['contractor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'people',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPeopleContractsCustomer',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'people',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts');
  }
}
