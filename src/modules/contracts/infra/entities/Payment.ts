import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

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
