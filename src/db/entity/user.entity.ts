import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import FreelancerEntity from './freelancer.entity';
import EmployerEntity from './employer.entity';
import PhoneNumberEntity from './phoneNumber.entity';

enum Membership {
  FREE = 0,
  PREMIUM = 1
};

@Entity()
export default class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500, unique: true })
  username: string;

  @Column({ length: 500 })
  email: string;
  
  @Column('int')
  membership: Membership;

  @Column('timestamp')
  membershipValidationTime: Date

  @Column({ length: 500 })
  password: string;

  @OneToMany( type => PhoneNumberEntity , phoneNumber => phoneNumber.user)
  phoneNumbers: PhoneNumberEntity[];

  @OneToOne(type => FreelancerEntity, freelancer => freelancer.user)
  freelancer: FreelancerEntity;

  @OneToOne(type => EmployerEntity, employer => employer.user)
  employer: EmployerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}