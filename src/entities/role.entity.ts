import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseModel } from '../models/base.model';

@Entity('Role')
export class Role extends BaseModel {
  @Column('varchar', { length: 16 })
  RoleName!: string;

  @OneToMany(() => User, (user) => user.Role)
  Users: User[];

  constructor(RoleName: string) {
    super();
    this.RoleName = RoleName;
  }
}
