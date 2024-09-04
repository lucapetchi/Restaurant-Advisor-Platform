import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RestaurantBaseModule } from './restaurant-base/restaurant-base.module';
import { RestaurantFormsComponent } from './restaurant-base/restaurant-forms/restaurant-forms.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
//import { CommentComponent } from './comment/comment.component';
import { authInterceptor } from './auth/auth.interceptor';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    //CommentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RestaurantBaseModule
   
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
