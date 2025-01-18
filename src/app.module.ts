import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { SalariesModule } from './salaries/salaries.module';
import { LeavesModule } from './leaves/leaves.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { AttendanceModule } from './attendance/attendance.module';
import { Employee } from './employees/entities/employee.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { Evaluation } from './evaluations/entities/evaluation.entity';
import { Department } from './departments/entities/department.entity';
import { Leave } from './leaves/entities/leaf.entity';
import { Salary } from './salaries/entities/salary.entity';
import { AdminModule } from './admin/admin.module';
import { CompanyModule } from './company/company.module';
import { LocationModule } from './location/location.module';
import { Location } from './location/entities/location.entity';
import { Company } from './company/entities/company.entity';
import { Admin } from './admin/entities/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
      ],
      synchronize: true,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
