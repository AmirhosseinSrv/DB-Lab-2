import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import EmployerEntity from './employer.entity';
import FreelancerEntity from './freelancer.entity';
import ProjectRequestEntity from './project-request.entity';

enum ProjectType {
  BRONZE = 0,
  SILVER = 1,
  GOLD = 2
};

@Entity()
export default class ProjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => EmployerEntity, employer => employer.projects, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  employer: EmployerEntity;

  @ManyToOne(type => FreelancerEntity, freelancer => freelancer.projects, { cascade: true, eager: true, onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  winner: FreelancerEntity;
  
  @OneToMany(type => ProjectRequestEntity, projectRequest => projectRequest.project)
  projectRequests: ProjectRequestEntity[]

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column('timestamp')
  deadline: Date;

  @Column({ type: 'bytea', nullable: true })
  attachment: Buffer;

  @Column('boolean')
  isPublished: boolean;

  @Column('int')
  type: ProjectType;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}