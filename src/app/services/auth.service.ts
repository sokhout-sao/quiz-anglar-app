import { Injectable } from '@angular/core';
import { UserService, User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private userService: UserService) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  async signin(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.userService.getUserByUsername(username);
      if (user && user.password === password) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during signin:', error);
      return false;
    }
  }

  async signup(username: string, password: string): Promise<boolean> {
    try {
      const existingUser = await this.userService.getUserByUsername(username);
      if (existingUser) {
        return false;
      }
      
      const newUser: User = { username, password };
      await this.userService.addUser(newUser);
      this.currentUser = newUser;
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Error during signup:', error);
      return false;
    }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}