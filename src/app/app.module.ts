import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
