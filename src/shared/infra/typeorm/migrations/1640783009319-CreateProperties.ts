import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProperties1640783009319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
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
            name: 'owner_id',
            type: 'uuid',
          },
          {
            name: 'address_id',
            type: 'uuid',
          },
          {
            name: 'iptu_id',
            type: 'varchar',
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
            name: 'measure_type',
            type: 'varchar',
          },
          {
            name: 'measure_amount',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKPeopleProperties',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'people',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKAddressProperties',
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'properties_address',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
