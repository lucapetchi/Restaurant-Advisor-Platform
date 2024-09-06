import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const RESTAURANT_API = 'http://localhost:5079/api/account' // URL pt CRUD Restaurant 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSig = signal<User | undefined | null>(undefined); // signal pentru pastrarea sesiunii
  constructor(private http:HttpClient ) {
    if (localStorage.getItem('token')){
      this.restoreUser();
    }

   }
  // Metode autentificare
  public register(user: User): Observable<any> {
    return this.http.post<any>(`${RESTAURANT_API}/register`, user).pipe(
      tap(response => this.setUser(response))
    );
  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(`${RESTAURANT_API}/login`, user).pipe(
      tap(response => this.setUser(response))
    );
  }
  
  public getMe() : Observable <any> {
    return this.http.get<any>(`${RESTAURANT_API}/user`);
  }


//


public isLoggedIn(): boolean {          //
  return !!localStorage.getItem('token');
}
private setUser(response: any): void {
  const user: User = {
    userName: response.userName,
    token: response.token,
    email: response.email,
    password: ''
  };
  localStorage.setItem('token', user.token); // Token salvat in local storage in browser
  this.currentUserSig.set(user);
}
private restoreUser(): void {
  const token = localStorage.getItem('token');
  if (token) {                                        // daca avem token atunci putem restaura sesiunea pentru a nu ne loga iar
    this.http.get<User>(`${RESTAURANT_API}/user`, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (user) => {
        const restoredUser: User = {
          userName: user.userName,
          email: user.email,
          token: token,
          password: '' 
        };
        this.currentUserSig.set(restoredUser);
      },
      error: () => {
        this.currentUserSig.set(null);
      }
    });
  }
}
}

