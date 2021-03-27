import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import FreelancerEntity from './freelancer.entity';
import ProjectEntity from './project.entity';

@Entity()
export default class ProjectRequestEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => FreelancerEntity, freelancer => freelancer.projectRequests, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  freelancer: FreelancerEntity;

  @ManyToOne(type => ProjectEntity, project => project.projectRequests, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  project: ProjectEntity;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column('timestamp')
  deliveryTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}