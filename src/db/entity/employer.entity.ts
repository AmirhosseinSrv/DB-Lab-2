import { Entity, Column, BaseEntity, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import ProjectEntity from './project.entity';
import UserEntity from './user.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => UserEntity, user => user.employer, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column({ length: 500, nullable: true })
  company: string;

  @OneToMany(type => ProjectEntity, project => project.employer)
  projects: ProjectEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}