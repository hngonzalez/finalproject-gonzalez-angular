import { User } from './../../models/user';
import { DataService } from './../../../../features/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../../services/auth.service';
import { Person } from 'src/app/features/models/person.model';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent implements OnInit {
  loading: boolean = false;
  exists: boolean = true;
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.loading = true;
    this.exists = true;
    
    setTimeout(() => {
      this.loading = false;
      this._authService.login(this.username, this.password)
      .then((person: Person) => {
        localStorage.setItem('token', 'asdadadas');          
        this.router.navigate(['./']);
      }).catch( error => {
        this.exists = false;
      });
    }, 2000);
  }
}
