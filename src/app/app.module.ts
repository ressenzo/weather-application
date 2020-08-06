import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarSearchFormComponent } from './components/sidebar-search-form/sidebar-search-form.component';
import { SidebarSavedCitiesComponent } from './components/sidebar-saved-cities/sidebar-saved-cities.component';

import { HttpIntercept } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarSearchFormComponent,
    SidebarSavedCitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
