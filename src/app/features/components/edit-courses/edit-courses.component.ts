import { Person } from './../../models/person.model';
import { Subscription } from 'rxjs';
import { DataService } from './../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {
  courseForm!: FormGroup;
  studentCourses?: any[];
  studentCourses$?: Subscription = new Subscription;
  availableCourses?: any;
  curCourse!: string;
  curStudent: number;
  loaded: boolean = true;
  exist: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<EditCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _dataService: DataService,
    private _snackBar: MatSnackBar
  ) { 
    this.courseForm = this.fb.group({
      idCourse: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.curStudent = this.data.elementRow
    this._dataService.getDataCoursesById(this.data.elementRow)
    .subscribe( (course: Course) => {
      this.courseForm.controls['idCourse'].setValue(course.idCourse);
      this.courseForm.controls['name'].setValue(course.name);
    },error => {
      console.log(error)
    });
    
  }

  onSave() {
    this._dataService.updateCourse(this.data.elementRow.idCourse, this.curCourse);
    this._snackBar.open('Cambios realizados!', '', {
      duration: 1500
    });
  }

  unsubscribeToClassroom(idCourse: number, idPerson: number) {
    console.log(idCourse,idPerson)
    //this._dataService.deleteStudentFromCourse(idCourse, idPerson);
    /* var index = this.curStudents.findIndex((person: Person) => {
      return person.idPerson == idPerson
    })
    this.curStudents.splice(index, 1); */
  }
}
