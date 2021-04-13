import { Component, OnInit, Output } from '@angular/core';
import {PlanServiceService} from '../services/plan-service.service'
import { FormsModule } from '@angular/forms';
import {Plan} from "../Plan";
  import {NgForm} from '@angular/forms';
import { RouteConfigLoadEnd, ActivatedRoute, Router } from '@angular/router';
import {  Input } from '@angular/core'; 

@Component({
  selector: 'app-plan-release',
  templateUrl: './plan-release.component.html',
  styleUrls: ['./plan-release.component.css']
})
export class PlanReleaseComponent implements OnInit {
  $lob;
  $Applications;
  lobId:any;
  plan:Plan;
  appId: [];
 // today=new Date();
  

  constructor(private PlanService:PlanServiceService,
    private route:ActivatedRoute,
    private router:Router
    ) {
    this.PlanService.GetLob().subscribe(x=>this.$lob=x);
    this.PlanService.GetApplication("-1").subscribe(x=>this.$Applications=x);
   }

   GetApplication(lobId)
   {
     
     this.PlanService.GetApplication(lobId).subscribe(x=>this.$Applications=x);;
   }

    SubmitPlan(plan:Plan)
   {
     
      
     this.PlanService.CreatePlan(plan).subscribe(x=>
      {
        if(x==1)
        {
          if(confirm("Plan successfully create, confirm to view your plan"))
          this.router.navigate(['displayPlan']);
        }
      });
    
   }


  ngOnInit(): void {
  }

}
