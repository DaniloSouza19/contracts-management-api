import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

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
