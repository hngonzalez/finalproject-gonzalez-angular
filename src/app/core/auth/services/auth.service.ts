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

  login(username: string, password: string) {
    let index = this._dataService.dataPersonsList.findIndex((person:Person) => {
      return (person.username == username && person.password == password);
    })

    return new Promise((resolve, rejects) => {
      const person = this._dataService.dataPersonsList[index];
      if (person) {
        this.curPerson = person;
        /* person.logged = true; */
        return resolve(person)
      }
      rejects({mensaje: 'error'})
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login']);
  }
}
