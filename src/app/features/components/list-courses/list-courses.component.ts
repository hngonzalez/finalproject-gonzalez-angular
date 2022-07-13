import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';
import { DetailsCourseComponent } from '../details-course/details-course.component';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  dataCoursesList?: Course[];
  dataCoursesList$?: Subscription;
  studentsList?: Course[];
  confirmation: boolean = false;

  constructor(
    private _dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataCoursesList$ = this._dataService.getCourses$()
    .subscribe((coursesList: Course[]) => {
      this.dataCoursesList = coursesList;
    }, error => {
      console.log('no se pudo obtener el listado de personas')
    });
  }

  /**
   * Función para editar curso
   * @param elementRow elemento a modificar
   */
   onEdit(elementRow: any) {
    const dialogRef = this.dialog.open(EditCoursesComponent, {
      width: '50%',
      data: {elementRow},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Función para ver detalles curso
   * @param elementRow elemento a modificar
   */
  onDetails(elementRow: any) {
    const dialogRef = this.dialog.open(DetailsCourseComponent, {
      width: '50%',
      data: {elementRow},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Función para eliminar un curso
   * @param elementRow elemento a modificar
   */
  onDelete(elementRow: any) {
    this._dataService.deleteCourse(elementRow);
  }
}
