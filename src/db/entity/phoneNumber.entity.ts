import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, JoinColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class PhoneNumberEntity extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  value: string;

  @ManyToOne(type => UserEntity, user => user.phoneNumbers, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}