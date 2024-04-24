import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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
  @JoinColumn()
  Role: Role;

  constructor(
    UserName: string,
    Email: string,
    Password: string,
    Address: string,
    Phone: string,
    Role: Role,
  ) {
    super();
    this.UserName = UserName;
    this.Email = Email;
    this.Password = Password;
    this.Address = Address;
    this.Phone = Phone;
    this.Role = Role;
  }
}
