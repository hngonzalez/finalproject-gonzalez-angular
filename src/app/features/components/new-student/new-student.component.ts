import { Course } from './../../models/course';

import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Classroom } from '../../models/classroom';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  studentForm!: FormGroup;
  availableCourses!: Course[];
  selected?: number;
  arCourses: number[] = [];
  loadedUser: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.availableCourses = this._dataService.getCourses();
    this.studentForm = this.fb.group({
      idPerson: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      course: new FormControl('')
    })
  }

  onCourseChange() {
    this.arCourses.push(
      this.studentForm.get('course').value
    )
  }

  onSave() {
    let newStudent = new Person(
      this.studentForm.get('idPerson').value,
      this.studentForm.get('name').value,
      this.studentForm.get('lastname').value,
      this.studentForm.get('email').value,
      this.arCourses
    );
    
    this._dataService.addStudent(newStudent);
    this.loadedUser = false;
    setTimeout(() => {
      this.loadedUser = true;
    }, 1500);
    this.studentForm.reset();
    this.arCourses = [];
  }
}
