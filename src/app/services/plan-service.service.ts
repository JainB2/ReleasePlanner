import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DecimalPipe, JsonPipe } from '@angular/common';

import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Plan} from "../Plan";
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})

export class PlanServiceService {
  Url="https://localhost:5001/api/plan/";
  applicationId:string;
  lobId:number;
  plan={};
  prodReleaseDate:Date;
  planId:Number;
  StartDateTime:Date;
  Duration:Number;
  taskId:Number;
  taskName:number;
  taskValue:string;
  remarks:string;
  
  constructor(private http:HttpClient) {
    

   }

   GetLob()
   {
   
    return this.http.get(this.Url+"lob");

   }

   GetApplication(lobId)
   {
    return this.http.get(this.Url+"ApplicationName?lobId="+lobId);
   }

   GetMaterPlanTaskDetailsByPlanId(plan:Plan)
   {
    
     debugger;
    //return this.http.get(this.Url+"MaterPlan_PlanId?plan="+plan);
    

    return this.http.post(this.Url+"MasterPlan_PlanId/",JSON.stringify(plan)
    ,
   {
     headers:new HttpHeaders({
       'Content-type':'application/json'
     })
   });
   }

   GetMasterPlanReport(plan:Plan)
   {
    
     debugger;
    return this.http.post(this.Url+"MasterPlanReport/",JSON.stringify(plan)
    ,
   {
     headers:new HttpHeaders({
       'Content-type':'application/json'
     })
   });
   }

   GetMaterPlanTaskDetailsByPlanId_OrderByTask(planId)
   {
     debugger;
    return this.http.get(this.Url+"MaterPlan_PlanId_OrderByTask?planId="+planId);
   }


   CreateMasterPlan(StartDateTime,Duration,Tasks,Remarks)
   {
    this.planId=parseInt(localStorage.getItem("planId"));
    this.taskId=Tasks;
   // this.taskName=TaskName;
    this.StartDateTime=StartDateTime;
    this.Duration=Duration;
    //this.taskValue=TaskValue;
    this.remarks=Remarks;
  
    return this.http.post<Plan>(this.Url+"InsertMasterPlan/?planId="+this.planId+"&taskId="+this.taskId+"&startTime="+this.StartDateTime+"&Duration="+this.Duration+"&remarks="+this.remarks
    ,
   {
     headers:new HttpHeaders({
       'Content-type':'application/json'
     })
   });
    
  
   }

   delete(planId)
   {
    return this.http.delete(this.Url+"delete?PlanId="+planId);
    
   }

   deleteTask(planId,taskId)
   {
    return this.http.delete(this.Url+"deleteTask?PlanId="+planId+"&TaskId="+taskId);
    
   }
    

   GetPlans(date:Date)
   {
     
     if(date==null)
    return this.http.get(this.Url+"Plans");
    else
    return this.http.get(this.Url+"Plan_Date/?date="+date);
    }

   GetPlan_PlanId(PlanId):Observable<Plan>
   {
     debugger;
     if(PlanId)
     {
      return this.http.get<Plan>(this.Url+"Plan_PlanId/?planId="+PlanId); 
     }
   }
   GetPlans_AdvanceFilter(lobId,appId,date)
   {
     
     if(lobId==null&&appId==null&&date==null)
    return this.http.get(this.Url+"Plans");
    else
    return this.http.get(this.Url+"AdvanceFilter/?lobId="+lobId+"&appId="+appId+"&date="+date)
   }


   GetTasks()
   {
    return this.http.get(this.Url+"Tasks");
   }
   CreatePlan(plan)
   {
     this.applicationId='';
     for(var val of plan.ApplicationId)
     {
       this.applicationId+=val+',';
     }
     //this.applicationId=plan.ApplicationId;
     this.lobId=plan.LobId;
     this.prodReleaseDate=plan.ProdReleaseDate;
     this.plan=[{
          
          "LobId":this.lobId,
          "ProdReleaseDate":this.prodReleaseDate
     }]
  //https://localhost:5001/api/plan/InsertPlan/?applicationId=21,24&lobId=3&ProdReleaseDate=prodrelease
    return this.http.post(this.Url+"InsertPlan/?applicationId="+this.applicationId+"&LobID="+this.lobId+"&ProdReleaseDate="+this.prodReleaseDate
     ,
    {
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    });
   }

   EditPlan(plan,planId)
   {
     if(planId)
    return this.http.put(this.Url+"EditPlan/?PlanId="+planId,plan,
    {
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    )  
   }


    ErrorHandler(error:HttpErrorResponse)
   {

     debugger;
     if(error.error instanceof ErrorEvent)
     {
       console.error('client side error',error);
     }
     else
     {
      console.error('Server side error',error);
     }
     return new console.error("error is there");
     
   }

}

