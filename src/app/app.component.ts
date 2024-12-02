import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Quiz PWA</span>
      <span class="flex-spacer"></span>
      <button *ngIf="authService.isAuthenticated()" 
              mat-button 
              (click)="logout()">
        <mat-icon>logout</mat-icon>
        Logout
      </button>
    </mat-toolbar>
    <div class="content-below-toolbar">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/signin']);
    }
  }
}