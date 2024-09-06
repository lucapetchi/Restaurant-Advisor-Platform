import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  constructor(public authService:AuthService ){
    
  }
  nav = [
    { name: 'Authentication ', link: '', exact: true},
    { name: 'Home', link: '/home', exact: true },
    { name: 'Restaurants', link: '/restaurant', exact: false },
    //{ name: 'About', link: '/about', exact: false },
    //{ name: 'Contact', link: '/contact', exact: false },
  ];
  
  isUserMenuVisible = false;

  onUserClick() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  onProfileClick() {
    // Handle profile click
  }

  onLogoutClick() {
    // Handle logout click
  }
  logout(): void {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
