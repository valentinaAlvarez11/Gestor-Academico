// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Evaluacion } from "../app/models/evaluacion";

export const environment = {
  production: false,
  productoURL: 'http://localhost:8080/producto/',
  departamentoURL: 'http://localhost:8080/departamentos/',
  profesorURL: 'http://localhost:8080/profesores/',
  cursoURL: 'http://localhost:8080/cursos/',
  estudianteURL: 'http://localhost:8080/estudiantes/',
  matriculaURL: 'http://localhost:8080/matriculas/',
  horarioURL: 'http://localhost:8080/horarios/',
  EvaluacionURL: 'http://localhost:8080/evaluaciones/',
  authURL: 'http://localhost:8080/auth',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
