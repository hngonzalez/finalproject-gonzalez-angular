import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/features/services/data.service';
import { Person } from 'src/app/features/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curPerson!: Person;

  constructor(
    private router: Router,
    private _dataService: DataService
  ) { }

  login() {
    return this._dataService.getUsers();
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login']);
  }
}
