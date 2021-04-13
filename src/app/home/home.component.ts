import { Component, OnInit, Output } from '@angular/core';
import {PlanServiceService} from '../services/plan-service.service'
import { FormsModule } from '@angular/forms';
import {Plan} from "../Plan";
  import {NgForm} from '@angular/forms';
import { RouteConfigLoadEnd, ActivatedRoute, Router } from '@angular/router';
import {  Input } from '@angular/core'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isExpanded=false;
 plan$:{};
 $Applications;
 $lob;
 ApplicationId;
 LobId;
 plan:Plan;
 ProdReleaseDate;

  constructor(private service:PlanServiceService,
    private route:ActivatedRoute,
    private router:Router) 
    {
     
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
  ngOnInit(): void {
  }

}
