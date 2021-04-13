import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { PlanReleaseComponent } from './plan-release/plan-release.component';
import { DiplayPlanComponent } from './diplay-plan/diplay-plan.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatDatepickerModule} from '@angular/material/core'
//import {MatMomentDateModule} from '@angular/material-moment-adapter'
//mport { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CreateMstrplanComponent } from './create-mstrplan/create-mstrplan.component';
//import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';
import { faCalendar,  faClock } from '@fortawesome/free-regular-svg-icons';
//import { DateTimeModel } from './date-time-picker/date-time-picker.component';
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import * as XLSX from 'xlsx'; 
import {ExcelService} from './excel.service' 


// fontLibrary.add(
//   faCalendar,
//   faClock
// );
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    PlanReleaseComponent,
    DiplayPlanComponent,
    HomeComponent,
    EditPlanComponent,
    CreateMstrplanComponent,
   // DateTimeModel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule, 
    MatCardModule,
    MatNativeDateModule,
   //FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //EditableTableModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'displayPlan', component:DiplayPlanComponent},
      { path: 'plan-release', component: PlanReleaseComponent},
      //{ path: 'plan/:planId', component: EditPlanComponent }
       { path: 'plan/:id', component: EditPlanComponent},
       { path: 'master-plan', component:CreateMstrplanComponent},
       {path:'master-plan/id',component:CreateMstrplanComponent}
    ]),
    NgxPaginationModule,
    BrowserAnimationsModule
   
  ],
  providers: [MatDatepickerModule,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
