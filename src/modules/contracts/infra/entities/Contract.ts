import { Person } from '@modules/people/infra/typeorm/entities/Person';
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

@Entity('contracts')
class Contract {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  contractor_id: string;

  @Column()
  customer_id: string;

  @Column()
  property_id: string;

  @Column('numeric')
  price: number;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @Column()
  registration_id: string;

  @Column()
  registry_office: string;

  @ManyToOne(() => Person, {
    cascade: true,
  })
  @JoinColumn({
    name: 'contractor_id',
  })
  contractor: Person;

  @ManyToOne(() => Person, {
    cascade: true,
  })
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Person;

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

export { Contract };
