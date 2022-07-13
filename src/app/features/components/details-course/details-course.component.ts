import { Course } from './../../models/course';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../models/person.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.css']
})
export class DetailsCourseComponent implements OnInit {
  curCourse!: Course;
  curStudents!: Person[];

  constructor(
    public dialogRef: MatDialogRef<DetailsCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.curCourse = this.data.elementRow;
    this.curStudents = this._dataService.getStudentsByCourseId(this.curCourse.idCourse);
  }

}
