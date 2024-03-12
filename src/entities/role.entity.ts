import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Role')
export class Role {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id!: string;

  @Column('varchar', { length: 16 })
  roleName!: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
