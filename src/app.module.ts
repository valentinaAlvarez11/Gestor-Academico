import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MatriculaModule } from './matricula/matricula.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PrerrequisitoModule } from './prerrequisito/prerrequisito.module';
import { CursoModule } from './curso/curso.module';
import { HorarioModule } from './horario/horario.module';
import { CalificacionModule } from './calificacion/calificacion.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true
      }),
      inject: [ConfigService],
    }),
    ProductoModule,
    DepartamentoModule,
    EstudianteModule,
    MatriculaModule, 
    ProfesorModule, 
    PrerrequisitoModule, 
    CursoModule,
    HorarioModule,
    CalificacionModule,
    EvaluacionModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}