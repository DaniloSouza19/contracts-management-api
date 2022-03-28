import { Person } from '@modules/people/infra/typeorm/entities/Person';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { PropertyAddress } from './PropertyAddress';

@Entity('properties')
class Property {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  owner_id: string;

  @Column()
  address_id: string;

  @Column()
  iptu_id: string;

  @Column()
  registration_id: string;

  @Column()
  registry_office: string;

  @Column()
  measure_type: string;

  @Column('numeric')
  measure_amount: number;

  @ManyToOne(() => Person, {
    cascade: true,
  })
  @JoinColumn({
    name: 'owner_id',
  })
  owner: Person;

  @OneToOne(() => PropertyAddress, {
    cascade: true,
  })
  @JoinColumn({
    name: 'address_id',
  })
  address: PropertyAddress;

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

export { Property };
