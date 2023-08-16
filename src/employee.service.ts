import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateEmployeeDto} from './dto/create-employee.dto';
import {UpdateEmployeeDto} from './dto/update-employee.dto';
import {Employee,EmployeeDocument} from './schema/employee.schema';
  
  @Injectable()
  export class EmployeeService {
  
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model < EmployeeDocument > ) {}
  
    //Adding employee using create()
    async create(createEmployeeDto: CreateEmployeeDto): Promise < EmployeeDocument > {
      const employee = new this.employeeModel(createEmployeeDto);
      return employee.save();
    }

  //Fetching employee (s) findAll().
    async findAll(): Promise < EmployeeDocument[] > {
      return this.employeeModel.find()
        .exec();
    }
  
    // Fetching employee findOne.
    async findOne(id: string) {
      return this.employeeModel.findById(id);
    }
  
    // Updating an employee using update()
    async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise < EmployeeDocument > {
      return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
    }
  
    // Deleting an employee using remove()
    async remove(id: string) {
      return this.employeeModel.findByIdAndRemove(id);
    }
  }