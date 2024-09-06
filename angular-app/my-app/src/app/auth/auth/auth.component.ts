import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {
  user: User = {
    userName: '',
    token: '',
    email: '',
    password: ''
  };

  @ViewChild('loginModal', { static: false }) loginModal!: ElementRef;
  @ViewChild('registerModal', { static: false }) registerModal!: ElementRef;

  successMessage: string | null = null;

  constructor(public authService: AuthService, private http: HttpClient) {
    this.successMessage = `Welcome back, ${this.user.userName}! You are all set.`;
   }

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (response) => {
        this.authService.currentUserSig.set(response);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      },
    });
  }

  ngAfterViewInit(): void { }

  register(user: User) {
    this.authService.register(user).subscribe(() => {
      this.authService.currentUserSig.set(user);
      this.hideModal(this.registerModal);
      this.successMessage = `Welcome, ${user.userName}! You are all set.`;
    });
  }

  login(user: User) {
    this.authService.login(user).subscribe(() => {
      this.authService.currentUserSig.set(user);
      console.log(user);
      this.hideModal(this.loginModal);
      this.successMessage = `Welcome back, ${user.userName}! You are all set.`;
    });
    console.log(this.authService.currentUserSig);
  }

  logout(): void {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    this.successMessage = null; // Clear the success message on logout
  }

  private hideModal(modal: ElementRef) {
    if (modal && modal.nativeElement) {
      const modalElement = modal.nativeElement as HTMLElement;
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.hide();
    } else {
      console.error('Modal reference is not available');
    }
  }
}
