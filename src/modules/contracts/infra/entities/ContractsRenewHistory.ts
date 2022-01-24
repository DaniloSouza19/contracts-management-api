import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('contracts_renew_history')
class ContractRenewHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  contract_id: string;

  @Column('numeric')
  new_price: number;

  @Column('numeric')
  old_price: number;

  @Column('timestamp')
  new_start_date: Date;

  @Column('timestamp')
  new_end_date: Date;

  @Column('timestamp')
  old_start_date: Date;

  @Column('timestamp')
  old_end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ContractRenewHistory };
