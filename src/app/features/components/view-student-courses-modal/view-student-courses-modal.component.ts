import { Course } from './../../models/course';
import { DataService } from 'src/app/features/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-student-courses-modal',
  templateUrl: './view-student-courses-modal.component.html',
  styleUrls: ['./view-student-courses-modal.component.css']
})
export class ViewStudentCoursesModalComponent implements OnInit {
  currentStudentCourses?: Course[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewStudentCoursesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this._dataService.getRelCoursePerson()
    .subscribe((rel: any[]) => {
      rel.forEach(element => {
        if (element.idPerson == this.data.elementRow) {
          this._dataService.getDataCoursesByCourseId(element.idCourse)
          .subscribe(resp => {
            console.log(resp,'ACA')
            this.currentStudentCourses.push(resp);
          },error => {
            console.log(error)
          });
        }
      })
    },error => {
      console.log(error)
    });
  }

}
