import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth-interceptor';

registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        // AuthModule
        AuthModule.forRoot()
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        },

        /* if you don't provide the currency symbol in the pipe, 
        this is going to be the default symbol (R$) ... */
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },

        /**
         * Configuração abaixo é para ser utilizado se por acaso
         * o interceptor fosse inserido somente no modulo app module
         */
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
