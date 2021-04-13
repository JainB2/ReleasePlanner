import { Component, OnInit } from '@angular/core';
import { PlanServiceService } from '../services/plan-service.service';
import { Plan } from '../Plan';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { formatDate } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '../excel.service';
import * as XLSX from 'xlsx';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-diplay-plan',
  templateUrl: './diplay-plan.component.html',
  styleUrls: ['./diplay-plan.component.css']
})
export class DiplayPlanComponent implements OnInit {
pa: number = 1;
 isExpanded=false;
 plan$:{};
 $Applications;
 $lob;
 ApplicationId;
 LobId;
 plan:Plan;
 ProdReleaseDate;
 
  constructor(private service:PlanServiceService,private http:HttpClient,
     private route:ActivatedRoute, 
    private router:Router) {
    this.service.GetLob().subscribe(x=>this.$lob=x);
    this.service.GetApplication("-1").subscribe(x=>this.$Applications=x);
    this.service.GetPlans(null).subscribe(x=>this.plan$=x)
   }
   GetPlan_Date(date:Date)
   {
     
    this.service.GetPlans(date).subscribe(x=>this.plan$=x)
   }

   GetPlan(LobId,ApplicationId,ProdReleaseDate)
   {
     debugger;
     if(LobId==null)
     {
      LobId=0
     }
     if(ApplicationId==null)
     {
      ApplicationId=0
     }
     if(ProdReleaseDate==null)
     {
      // plan.ProdReleaseDate.setDate(1);
     }
    this.service.GetPlans_AdvanceFilter(LobId,ApplicationId,ProdReleaseDate).subscribe(x=>this.plan$=x)
   }

   GetLob()
   {
      
    return this.service.GetLob();

   }

   GetApplication(lobId)
   {
     
     this.service.GetApplication(lobId).subscribe(x=>this.$Applications=x);
   }
  RemoveFilter() 
  {
    window.location.reload();
  }
   delete(planId)
   {
     debugger;
     if(!confirm('Are you sure, you want to delete this plan')) return;
     this.service.delete(planId).subscribe(
      x=>x
      
    );
    window.location.reload();
     //this.router.navigate(['/plan-release']);
   }
   @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
   title = 'Excel';  
ExportToExcel()
{
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    //const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.plan$);  
    

    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Prod-Readiness-Report.xlsx');  
}


  ngOnInit(): void 
  {
  }

}
