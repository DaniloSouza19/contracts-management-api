import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPayments1642189168970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
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
            name: 'contract_id',
            type: 'uuid',
          },
          {
            name: 'payment_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'timestamp',
          },
          {
            name: 'is_paid',
            type: 'boolean',
            default: false,
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'additional_fees',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'discount',
            type: 'numeric',
            isNullable: true,
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
            name: 'FKPaymentContract',
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
    await queryRunner.dropTable('payments');
  }
}
