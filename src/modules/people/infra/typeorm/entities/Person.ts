import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('people')
class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  is_legal_person = false;

  @Column()
  document_id: string;

  @Column()
  telephone: string;

  @Column()
  email?: string;

  @Column()
  address_id: string;

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
