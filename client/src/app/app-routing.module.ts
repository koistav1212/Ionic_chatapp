import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { QrscannerComponent } from './qrscanner/qrscanner.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo:"start"
},

{
 
  path: 'login',
  component: LoginPageComponent, 
},{
path: 'dashboard',
component: DashboardComponent
},
{
  path: 'start',
 component:StartScreenComponent
  },
{
  path:'qrscanner',
  component:QrscannerComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
