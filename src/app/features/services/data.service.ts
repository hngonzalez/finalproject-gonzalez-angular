import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Classroom } from './../models/classroom';
import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataPersonsList: Person[] = [
    {idPerson: 1, username: 'fgonzalez', password:'admin', name: 'Franco', lastName: 'Gonzalez', type:'student', email: 'Franco@outlook.com', courses: [{idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 2, username: 'mgonzalez', password:'admin', name: 'Matias', lastName: 'Gonzalez', type:'student', email: 'Matias@outlook.com', courses: [{idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 3, username: 'frgonzalez', password:'admin', name: 'Franco', lastName: 'Gonzalez', type:'student', email: 'Franco@outlook.com', courses: []},
    {idPerson: 4, username: 'lgonzalez', password:'admin', name: 'Laura', lastName: 'Gonzalez', type:'student', email: 'Laura@outlook.com', courses: [{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 5, username: 'admin', password:'admin', name: 'Miguel', lastName: 'Apellidito', type:'admin', email: 'Miguel@outlook.com', courses: []},
    {idPerson: 6, username: 'user', password:'user', name: 'Joaquin', lastName: 'Algo', type:'user', email: 'Joaquin@outlook.com', courses: []},
    {idPerson: 7, username: 'npipez', password:'admin', name: 'Nombrecito', lastName: 'Pipez', type:'user', email: 'Nombrecito@outlook.com', courses: []},
    {idPerson: 8, username: 'puerpowi', password:'admin', name: 'Paula', lastName: 'Uerpowi', type:'user', email: 'Paula@outlook.com', courses: []},
  ];
  dataCourses: Course[] = [
    {idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},
    {idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}
  ]
  dataClassrooms: Classroom[] = [
    {idClassroom: 1, name: 'Aula B254'},
    {idClassroom: 2, name: 'Aula A361'},
    {idClassroom: 3, name: 'Aula C255'},
  ]

  constructor(
    private http: HttpClient
  ) { }

  getStudents(): Observable<Person[]> {
    //Alternativa
    return this.http.get<Person[]>(environment.urlApi + 'person');

    //Segunda forma
    /* const request = this.http.get('https://62ce1595a43bf78008624d8e.mockapi.io/api/v1/person') as Observable<Person[]>;

    return request; */

    //Primera forma
    //return of(this.dataPersonsList);
  }

  getCourses$(): Observable<Course[]> {
    return of(this.dataCourses);
  }

  getCourses(): Course[] {
    return this.dataCourses;
  }

  getClassrooms(): Classroom[] {
    return this.dataClassrooms;
  }

  getStudentsByCourseId(idCourse: number): Observable<Person[]> {
    let dataPersons = new Array();

    this.dataPersonsList.forEach(element => {
      if (element) {
        element.courses.forEach(course => {
          if (course) {
            
          if (course.idCourse == idCourse) {
            dataPersons.push(element);
          }
          }
        })
      }
    });

    return of(dataPersons);
  }

  getDataCoursesById(personId: number): Promise<Person> {
    let index = this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == personId;
    })

    return new Promise((resolve, rejects) => {
      const person = this.dataPersonsList[index];
      if (person) {
        return resolve(person)
      }
      rejects({mensaje: 'error'})
    })
  }

  addStudent(student: Person): void {
    this.http.post<Person[]>(environment.urlApi + 'person/', student).subscribe(resp=> {
      console.log(resp)
    },error => {
      console.log(error)
    });
  /* student.idPerson = this.dataPersonsList.length + 1;

    this.dataPersonsList.push(student); */
  }

  addClassroomToStudent(idPerson: number, course: Course) {
    let indexToEdit = this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == idPerson;
    })

    this.dataPersonsList[indexToEdit].courses.push(course);
  }

  /**
   * Función que agrega un nuevo curso a la lista
   * @param course nuevo curso a agregar
   */
  addCourse(course: Course) {
    course.idCourse = this.dataCourses.length + 1;
    
    this.dataCourses.push(course);
  }

  addClassroom(classroom: Classroom) {
    classroom.idClassroom = this.dataClassrooms.length + 1;
    
    this.dataClassrooms.push(classroom);
  }

  editStudent(student: Person) {
    let indexToEdit= this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == student.idPerson;
    })
  
    this.dataPersonsList[indexToEdit].name = student.name;
    this.dataPersonsList[indexToEdit].lastName = student.lastName;
    this.dataPersonsList[indexToEdit].email = student.email;
  }

  editCourse(course: Course) {
    console.log(course)
    let indexToEdit= this.dataCourses.findIndex((courseElement:Course) => {
      return courseElement.idCourse == course.idCourse;
    })
  
    this.dataCourses[indexToEdit].name = course.name;
  }

  editClassroom(classroom: Classroom) {
    let indexToEdit= this.dataClassrooms.findIndex((classroomElement: Classroom) => {
      return classroomElement.idClassroom == classroom.idClassroom;
    })
  
    this.dataClassrooms[indexToEdit].name = classroom.name;
  }

  removeClassroom(idPerson: number, idCourse: number) {
    let indexClassToRemove = this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == idPerson;
    })

    let indexClass2ToRemove = this.dataPersonsList[indexClassToRemove].courses.findIndex((course: Course) => {
      return course.idCourse == idCourse;
    })

    this.dataPersonsList[indexClassToRemove].courses.splice(indexClass2ToRemove,1);
  }

  deleteStudent(student: Person) {
    let indexToDelete = this.dataPersonsList.findIndex( (person:Person) => {
      return person.idPerson == student.idPerson;
    })

    this.dataPersonsList.splice(indexToDelete, 1);
  }

  deleteCourse(selectedCourse: Course) {
    let indexToDelete = this.dataCourses.findIndex((course: Course) => {
      return course.idCourse == selectedCourse.idCourse;
    });

    this.dataPersonsList.forEach(person => {
      /* var index = person.courses.findIndex(courseAux => {
        if (courseAux.idCourse == course.idCourse) {
          console.log(person)
          person.courses.splice(index, 1);
          console.log(person)
        }
      }) */
    })

    this.dataCourses.splice(indexToDelete, 1);
  }

  deleteStudentFromCourse(idCourse: number, idPerson: number) {
    this.dataPersonsList.forEach(element => {
      if (element.type == 'student' && element.idPerson == idPerson) {
        var index = element.courses.findIndex((course: Course) => {
          return course.idCourse == idCourse
        })

        element.courses.splice(index, 1);
      }
    });
    let indexToDelete = this.dataPersonsList.findIndex( (person:Person) => {
      
    })
  }

  updateCourse(course: string, idCourse: number) {
    console.log(course)
    let indexToUpdate = this.dataCourses.findIndex((course: Course) => {
      return course.idCourse == idCourse;
    });

    this.dataCourses[indexToUpdate].name = course;
  }
}
