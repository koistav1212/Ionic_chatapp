import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UserListComponent } from './user-list/user-list.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChatComponent } from './chat/chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
@NgModule({
  declarations: [AppComponent,StartScreenComponent,LoginPageComponent,DashboardComponent,QrscannerComponent,UserListComponent, GroupInfoComponent, UserInfoComponent,
    ChatComponent,SidebarComponent],
  imports: [ BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,NgMultiSelectDropDownModule.forRoot(),
    PickerModule,HttpClientModule,MatTabsModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxScannerQrcodeModule,
    AngularFireAuthModule,
    MatButtonModule,QRCodeModule,
    MatIconModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ChatComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
