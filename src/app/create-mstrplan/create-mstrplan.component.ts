import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PlanServiceService } from '../services/plan-service.service';
import { Plan } from '../Plan';
import { MasterPlanTask } from '../MasterPlanTask';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { delay, take } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import * as XLSX from 'xlsx';  
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import * as FileSaver from 'file-saver';
import { ExcelService } from '../excel.service';
import * as moment from 'moment';
//import * as XLSX from 'xlsx';
@Component({
  selector: 'app-create-mstrplan',
  templateUrl: './create-mstrplan.component.html',
  styleUrls: ['./create-mstrplan.component.css']
})
export class CreateMstrplanComponent implements OnInit {
  pa: number = 1;
  isExpanded=false;
  plan$:{};


 $Applications;
 $lob;
 $Tasks
 ApplicationId;
 LobId;
 plan:Plan;
 ProdReleaseDate;
 insertStatus;
 closeResult = '';
 $MasterPlan;
 $MasterPlanReport;
 $MaterPlanDetails;
 startDate:string;
 duration:any;
 duration1:any;
 taskId:number;
 taskName:string;
 taskStatus:string;
 editable:boolean;
 remarks:string=null;
 ApplicationName:string;
 MasterPlanObj:MasterPlanTask;
 output:string;
  taskValue: any;
  MasterData: any[];
  
  constructor(private service:PlanServiceService,private http:HttpClient,
     private route:ActivatedRoute,
    private router:Router,
    private modalService: NgbModal,
    private excelService:ExcelService) {
    this.service.GetLob().subscribe(x=>this.$lob=x);
    this.service.GetApplication("-1").subscribe(x=>this.$Applications=x);
    this.service.GetPlans(null).subscribe(x=>this.plan$=x);
    this.GetTask().subscribe(x=>this.$Tasks=x);

      debugger;
    this.service.GetPlans(null).forEach(x=>{this.plan$=x;
        console.log(x);
        this.GetMasterPlanDetailsById(this.plan$).subscribe(y=>{this.$MasterPlan=y;console.log(y)});
        this.GetMasterPlanReport(this.plan$).subscribe(z=>{this.$MasterPlanReport=z;console.log(z)});
      });
      }

  //  open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {
    debugger;  
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    // //const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.plan$);  
    

    // const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    // XLSX.writeFile(wb, 'Master-Plan.xlsx');  

    this.excelService.exportAsExcelFile(this.$MasterPlanReport, 'MasterPlan');
  }  
 

  open(content,planId,ApplicationName,prodReleaseDate) {
    this.$MasterPlan={};
   // this.$MaterPlanDetails=null;
    this.startDate=null;
    this.duration=null;
    this.duration1=null;
    this.taskName="";
    this.taskStatus="";
    this.editable=false;
    this.ApplicationName="";
    this.ProdReleaseDate="";

    this.modalService.open(content, { size: 'xl' });
    localStorage.setItem("planId",planId);
    localStorage.setItem("appName",ApplicationName)
    localStorage.setItem("prodDate",prodReleaseDate)
    this.ApplicationName=ApplicationName;
    this.ProdReleaseDate=prodReleaseDate;

    //this.GetMasterPlanDetailsById(planId).subscribe(x=>this.$MaterPlanDetails=x);

    this.GetMaterPlanTaskDetailsByPlanId_OrderByTask(planId).pipe(take(1)).subscribe(x=>{
      debugger;
      this.startDate=  x[0].task[0].endDateTask;
   // this.startDate=new Date();

   // this.startDate = new Date().toISOString().slice(0, 16);
        //this.startDate =moment(x[0].task[0].endDateTask).format("YYYY-MM-DDTkk:mm").
        this.startDate=moment(x[0].task[0].endDateTask).format("YYYY-MM-DDTkk:mm");
     
     // this.startDate=new Date();
     if(x[0].task[0].durationTask!=0)
     {
       
       this.duration = x[0].task[0].durationTask;
       var num = x[0].task[0].durationTask;
       var hours = (num / 60);
       var rhours = Math.floor(hours);
       var minutes = (hours - rhours) * 60;
       var rminutes = Math.round(minutes);
      this.duration=  rhours ;
      this.duration1=rminutes;
            
     }
     else
     {
       this.duration=null;
       this.duration1=null;
     }
     
     
     // if(this.startDate=="0001-01-01T00:00" || this.startDate=="0001-01-01T00:00:00")
      // {
      //   this.startDate="";
      // }
      //console.log(this.startDate +"start");

    });


    this.GetMaterPlanTaskDetailsByPlanId_OrderByTask(planId).subscribe(x=>{
      debugger;
      this.$MaterPlanDetails=x;
      console.log(this.$MaterPlanDetails)
    
    });

  }

  GetTaskDetail(TaskId,planId)
  {
    debugger;
        planId=localStorage.getItem("planId");
        console.log(this.$MaterPlanDetails);

       // this.startDate=null;
        this.duration=0;
       // this.taskId=x.taskId;
        this.taskValue="Select Task Status";

        for(let y of this.$MaterPlanDetails)
        {
          for(let x of y.task)
          {
            debugger;
            if(x.taskId==TaskId)
            {
              if(x.endDateTask!=null)
              {
                this.startDate=moment(x.endDateTask).format("YYYY-MM-DDTkk:mm");
              }
           // this.startDate = new Date();
            // this.startDate=new Date();
            this.duration=x.durationTask;

            var num = this.duration;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            this.duration=  rhours ;
            this.duration1=rminutes;
           // this.taskId=x.taskId;
            this.taskValue=x.taskStatus;
            }
           
          }
          
        }
      
        
  }
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    
  }

  deleteTask(planId,taskId)
  {
      
      debugger;
      if(!confirm('Are you sure, you want to delete this plan')) return;
      this.service.deleteTask(planId,taskId).subscribe(
       x=>{if(x){window.location.reload();}}
     );
     
  }
   GetPlan_Date(date:Date)
   {

    this.service.GetPlans(date).subscribe(x=>this.plan$=x)
   }
   edit()
   {
     debugger;
     this.editable=true;

   }

   save(taskId,taskStatus1,remarks)
   {
      debugger;
      this.duration=(this.duration*60)+this.duration1;

     this.CreateMasterPlan(this.startDate,this.duration,taskId,remarks);
     
    }
   selectChangeHandler (event: any) {
    //update the ui
    this.taskStatus = event.target.value;
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
   GetTask()
   {
     debugger;
     return  this.service.GetTasks();
   }

   GetApplication(lobId)
   {

     this.service.GetApplication(lobId).subscribe(x=>this.$Applications=x);
   }

  async CreateMasterPlan(StartDateTime,Duration,Tasks,Remarks)
   {
     debugger;
     if( Date.parse(this.startDate)>=Date.parse(this.ProdReleaseDate))
     {
      Duration=(parseInt(this.duration)*60)+parseInt(this.duration1);
      return this.service.CreateMasterPlan(StartDateTime,Duration,Tasks,Remarks).subscribe(async x=>{this.insertStatus=x;
      await setTimeout(() => {window.location.reload();
        
      }, 1000); 
     
     });

     }
     else
     {

      alert("Start date can not  before than prod release date")
     }
      

     
   }
   EditMasterPlan(StartDateTime,Duration,taskId,remarks)
   {
     

    this.service.CreateMasterPlan(StartDateTime,Duration,taskId,remarks).subscribe(x=>this.insertStatus=x);
   }

   GetMasterPlanDetailsById(plan)
   {
     
      debugger;
     return this.service.GetMaterPlanTaskDetailsByPlanId(plan);
   }

   GetMasterPlanReport(plan)
   {
     
      debugger;
     return this.service.GetMasterPlanReport(plan);
   }


   GetMaterPlanTaskDetailsByPlanId_OrderByTask(planId)
   {
     return this.service.GetMaterPlanTaskDetailsByPlanId_OrderByTask(planId);
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

  ngOnInit(): void {
  }

}
