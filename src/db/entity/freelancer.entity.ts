import { Entity, Column, BaseEntity, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import ProjectEntity from './project.entity';
import ProjectRequestEntity from './project-request.entity';
import UserEntity from './user.entity';

@Entity()
export default class FreelancerEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => UserEntity, user => user.freelancer, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'bytea', nullable: true })
  resume: Buffer;

  @OneToMany(type => ProjectRequestEntity, projectRequest => projectRequest.freelancer)
  projectRequests: ProjectRequestEntity[]

  @OneToMany(type => ProjectEntity, project => project.winner)
  projects: ProjectEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}