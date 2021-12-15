import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { PersonAddress } from './PersonAddress';

@Entity('people')
class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  is_legal_person = false;

  @Column()
  document_id: string;

  @Column()
  telephone: string;

  @Column()
  email?: string;

  @Column()
  address_id: string;

  @OneToOne(() => PersonAddress)
  @JoinColumn({
    name: 'address_id',
  })
  address: PersonAddress;

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

export { Person };
