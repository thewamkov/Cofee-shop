import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { BaseModel } from '../models/base.model';

@Entity('User')
export class User extends BaseModel {
  @Column('varchar')
  UserName: string;

  @Column('varchar')
  Email: string;

  @Column('varchar')
  Password: string;

  @Column('varchar')
  Address: string;

  @Column('varchar')
  Phone: string;

  @ManyToOne(() => Role, (role) => role.Users)
  Role: Role;
}
