import { Injectable, NotFoundException } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import FreelancerEntity from '../db/entity/freelancer.entity';
import CreateFreelancerDto from 'src/jobseekers/dto/create-freelancer.dto';
import PhoneNumberEntity from 'src/db/entity/phoneNumber.entity';
import CreateEmployerDto from 'src/jobseekers/dto/create-employer.dto';
import EmployerEntity from 'src/db/entity/employer.entity';

@Injectable()
export class UserService {

  async createUser(userDetails: any): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    userEntity.username = userDetails.username;
    userEntity.name = userDetails.name;
    userEntity.email = userDetails.email;
    userEntity.password = userDetails.password;
    userEntity.membership = userDetails.membership;
    userEntity.membershipValidationTime = new Date('2020/12/30');
    let phoneNumbersEntity: PhoneNumberEntity[] = [];
    userDetails.phoneNumbers.map(async (phoneNumber: string) => {
      const phoneNumberEntity: PhoneNumberEntity = PhoneNumberEntity.create();
      phoneNumberEntity.value = phoneNumber;
      await PhoneNumberEntity.save(phoneNumberEntity);
      phoneNumbersEntity.push(phoneNumberEntity);
    });
    userEntity.phoneNumbers = phoneNumbersEntity;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async createFreelancer(freelancerDetails: CreateFreelancerDto): Promise<FreelancerEntity> {
    const userEntity: UserEntity = await this.createUser(freelancerDetails);
    const freelancerEntity: FreelancerEntity = FreelancerEntity.create();
    if(freelancerDetails.resume) {
      freelancerEntity.resume = Buffer.from("\\x" + freelancerDetails.resume.toString("hex"));
    }
    freelancerEntity.user = userEntity;
    await FreelancerEntity.save(freelancerEntity);
    return freelancerEntity;
  }

  async createEmployer(employerDetails: CreateEmployerDto): Promise<EmployerEntity> {
    const userEntity: UserEntity = await this.createUser(employerDetails);
    const employerEntity: EmployerEntity = EmployerEntity.create();
    if(employerDetails.company.length) {
      employerEntity.company = employerDetails.company;
    }
    employerEntity.user = userEntity;
    await EmployerEntity.save(employerEntity);
    return employerEntity;
  }

  async deleteFreelancer(userId: string): Promise<Object> {
    const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    const freelancerEntity: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
    if(!freelancerEntity)
      throw new NotFoundException("Freelancer Not Found.")
    await FreelancerEntity.delete({ user: user });
    await UserEntity.delete(user.id);
    return { "success": true };
  }

  async deleteEmployer(userId: string): Promise<Object> {
    const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    const employerEntity: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
    if(!employerEntity)
      throw new NotFoundException("Employer Not Found.")
    await EmployerEntity.delete({ user: user });
    await UserEntity.delete(user.id);
    return { "success": true };
  }

  async deleteAllFreelancers(): Promise<Object> {
    const users: UserEntity[] = await UserEntity.find();
    users.map(async (user: UserEntity) => {
      await FreelancerEntity.delete({ user: user });
      await UserEntity.delete(user.id);
    })
    return { "success": true };
  }

  async deleteAllEmployers(): Promise<Object> {
    const users: UserEntity[] = await UserEntity.find();
    users.map(async (user: UserEntity) => {
      await EmployerEntity.delete({ user: user });
      await UserEntity.delete(user.id);
    })
    return { "success": true };
  }

  async update(userDetails: any, userId: string, isFreelancer: boolean): Promise<any> {
    const beforeUpdateUserEntity: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    const userEntity: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    if(!userEntity)
      throw new NotFoundException("User Not Found.")
    userEntity.name = userDetails.name;
    userEntity.username = userDetails.username;
    userEntity.password = userDetails.password;
    userEntity.membership = userDetails.membership;
    let phoneNumbersEntity: PhoneNumberEntity[] = [];
    userDetails.phoneNumbers.map(async (phoneNumber) => {
      const phoneNumberEntity: PhoneNumberEntity = PhoneNumberEntity.create();
      phoneNumberEntity.value = phoneNumber;
      await PhoneNumberEntity.save(phoneNumberEntity);
      phoneNumbersEntity.push(phoneNumberEntity);
    });
    userEntity.phoneNumbers = phoneNumbersEntity;
    await UserEntity.save(userEntity);
    if(isFreelancer) {
      const freelancerEntity: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: beforeUpdateUserEntity } });
      if(!freelancerEntity) {
        throw new NotFoundException("Freelancer Not Found");
      }
      if(userDetails.resume) {
        freelancerEntity.resume = Buffer.from("\\x" + userDetails.resume.toString("hex"));
      }
      await FreelancerEntity.save(freelancerEntity);
      return freelancerEntity;
    } else {
      const employerEntity: EmployerEntity = await EmployerEntity.findOne({ where: { user: beforeUpdateUserEntity } });
      if(!employerEntity) {
        throw new NotFoundException("Employer Not Found");
      }
      if(userDetails.company.length) {
        employerEntity.company = userDetails.company;
      }
      await EmployerEntity.save(employerEntity);
      return employerEntity;
    }
  }

  async updateFreelancer(freelancerDetails: CreateFreelancerDto, userId: string): Promise<FreelancerEntity> {
    return await this.update(freelancerDetails, userId, true)
  }

  async updateEmployer(employerDetails: CreateEmployerDto, userId: string): Promise<EmployerEntity> {
    return await this.update(employerDetails, userId, false)
  }

  async getAllFreelancers(): Promise<FreelancerEntity[]> {
    return await FreelancerEntity.find();
  }

  async getAllEmployers(): Promise<EmployerEntity[]> {
    return await EmployerEntity.find();
  }

  async getFreelancer(userId: string): Promise<FreelancerEntity> {
    const userEntity: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    const freelancerEntity: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: userEntity } });
    return freelancerEntity;
  }

  async getEmployer(userId: string): Promise<EmployerEntity> {
    const userEntity: UserEntity = await UserEntity.findOne({ where: { id: userId } });
    const employerEntity: EmployerEntity = await EmployerEntity.findOne({ where: { user: userEntity } });
    return employerEntity;
  }
}