import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanServiceService } from '../services/plan-service.service';
import { switchMap } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Plan } from '../Plan';
import { ConditionalExpr } from '@angular/compiler';
import { HttpParams, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  plan$:Plan;
  planId;
  hide=false;
  //date1:string;
  //date:string;
  @ViewChild('hide') nameField:ElementRef;

  
  @Input() date1: string;
  @Input() date2: string;
  @Input() date3: string;
 // @Output() newItemEvent = new EventEmitter<string>();

  constructor(private route: Router,
    private activateRouter: ActivatedRoute,
    private planService: PlanServiceService) {
    debugger;
    let id: string;

    // this.activateRouter.paramMap.subscribe(param=>{id=param.get("planId")})
    this.date1="";
    this.planId = this.activateRouter.snapshot.paramMap.get('id');
    planService.GetPlan_PlanId((this.planId)).subscribe(x =>{this.plan$ = x;
      debugger;
      this.date1=this.plan$[0].atstgBaseline.toString();
      this.date2=this.plan$[0].actualTimelinesforStageplanFinalization.toString();
      this.date3=this.plan$[0].actualTimelinesForStagePlanMock.toString();

      if(this.date1=="0001-01-01T00:00" || this.date1=="0001-01-01T00:00:00")
      {
        this.date1="";
      }
      if(this.date2=="0001-01-01T00:00" ||this.date2=="0001-01-01T00:00:00")
      {
        this.date2="";
      }
      if(this.date3=="0001-01-01T00:00" || this.date3=="0001-01-01T00:00:00")
      {
        this.date3="";
      }
      console.log(this.date1+"here")
    });
        
    // console.log(this.plan[0]["prodReleaseDate"])
    
        
  } 
  edit(plan) 
  {

    debugger;
    if(Date.parse(plan.ProdReleaseDate)>= Date.parse(plan.timelineForStagePlanMock))
    {
      this.planService.EditPlan(plan,this.planId).subscribe(
        x=>{debugger;
          if(x==1){
     // console.log(x);
        alert("Plan is updated successfully")
      }
      
  
      }
      );
    }
    else{
      alert("Error:Date should be before prod release date.");
    }
   
   // this.hide=true;
   
  }
  ngAfterViewInit()
   {
    
   }

  ngOnInit(): void {

  }

}
