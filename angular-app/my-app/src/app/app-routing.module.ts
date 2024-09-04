import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurant', loadChildren: () => import('./restaurant-base/restaurant-base.module').then(m => m.RestaurantBaseModule) },
  { path: '**', component:  NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HttpClient,provideHttpClient(withInterceptors([authInterceptor]))]
})
export class AppRoutingModule { }