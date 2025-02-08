import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { EmployeesModule } from './Modules/employees/employees.module';
import { DepartmentsModule } from './Modules/departments/departments.module';
import { SalariesModule } from './Modules/salaries/salaries.module';
import { LeavesModule } from './Modules/leaves/leaves.module';
import { EvaluationsModule } from './Modules/evaluations/evaluations.module';
import { AttendanceModule } from './Modules/attendance/attendance.module';
import { AdminModule } from './Modules/admin/admin.module';
import { CompanyModule } from './Modules/company/company.module';
import { LocationModule } from './Modules/location/location.module';

// Import entities
import { Employee } from './Modules/employees/entities/employee.entity';
import { Attendance } from './Modules/attendance/entities/attendance.entity';
import { Evaluation } from './Modules/evaluations/entities/evaluation.entity';
import { Department } from './Modules/departments/entities/department.entity';
import { Leave } from './Modules/leaves/entities/leave.entity';
import { Salary } from './Modules/salaries/entities/salary.entity';
import { Location } from './Modules/location/entities/location.entity';
import { Company } from './Modules/company/entities/company.entity';
import { Admin } from './Modules/admin/entities/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Employee,
        Attendance,
        Evaluation,
        Department,
        Leave,
        Salary,
        Location,
        Company,
        Admin,
        join(__dirname, '**', '*.entity.{ts,js}'),
      ],
      synchronize:
        process.env.TYPEORM_SYNC === 'true' &&
        process.env.NODE_ENV !== 'production',
    }),

    EmployeesModule,
    DepartmentsModule,
    SalariesModule,
    LeavesModule,
    EvaluationsModule,
    AttendanceModule,
    AdminModule,
    CompanyModule,
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.DATABASE_HOST);
    console.log(process.env.DATABASE_PORT);
    console.log(process.env.DATABASE_USER);
    console.log(process.env.DATABASE_PASSWORD);
    console.log(process.env.DATABASE_NAME);
  }
}
