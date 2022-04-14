import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Contract } from './Contract';

@Entity('payments')
class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  contract_id: string;

  @Column('timestamp')
  payment_date: Date;

  @Column('timestamp')
  due_date: Date;

  @Column('boolean')
  is_paid: boolean;

  @Column('numeric')
  value: number;

  @Column('numeric')
  additional_fees: number;

  @Column('numeric')
  discount: number;

  @ManyToOne(() => Contract, {
    cascade: true,
  })
  @JoinColumn({
    name: 'contract_id',
  })
  contract: Contract;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Payment };
