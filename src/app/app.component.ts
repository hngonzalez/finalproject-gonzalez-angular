import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { Person } from './features/models/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyectofinal-gonzalez';
  

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  onLogout() {
    this._authService.logout()
  }
}
