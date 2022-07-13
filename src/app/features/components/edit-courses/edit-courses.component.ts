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
  studentCourses?: any[];
  studentCourses$?: Subscription = new Subscription;
  availableCourses?: any;
  curCourse!: string;
  loaded: boolean = true;
  exist: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<EditCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService,
    private _snackBar: MatSnackBar
  ) { 
    
  }

  ngOnInit(): void {
    this.curCourse = this.data.elementRow.name;
  }

  onSave() {
    this._dataService.updateCourse(this.curCourse, this.data.elementRow.idCourse);
    this._snackBar.open('Cambios realizados!', '', {
      duration: 1500
    });
  }
}
