export interface Plan{
    PlanId:Number 
    ApplicationId :[];
    LobId :Number;
    ProdReleaseDate?:Date;
    LobName?:string;
    ApplicationName:[];
    Environment:string;
    Status?:string; 
    StgMockPlanReceive?:string;
    ProdPlanReceived?: string;
    PTSTGBaseline?:Date;
    ATSTGBaseline?:Date;
    TimelinesStgPlanFinalizationWithWalkthrough?:Date;
    ActualTimelinesforStageplanFinalization?:Date;
    TimelineForStagePlanMock?:Date;
    ActualTimelinesForStagePlanMock?:Date;
    TimelinesForPRODUCRPlanBaseline?:Date;
    TimelinesForPRODUCRPlanFinalizationWithWalkthroughAndFreeze?:Date;
    ProdFollowUpCount:Number;
    StgfollowUpCount:Number;
    ProdWalkThrough:string;
    RITM:string;
    ProdPlanReceive:string;


    SPOC :string;
   ServerAccess :string;
   Dependencies :string;
   Remarks :string;
  }
  



//         [Key]
//         public int PlanId { get; set; }
//         public int ApplicationId { get; set; }
//         public int LobId { get; set; }
//         public string LobName { get; set; }

//         public string  ApplicationName { get; set; }
//         public string  Environment { get; set; }
//         public string Status { get; set; }
//         public string stgMockReceived { get; set; }
        
//         public DateTime ProdReleaseDate { get; set; }
//         public string ProdPlanReceived { get; set; }
//         public DateTime StgMockPlanReceive { get; set; }
//         public DateTime PTSTGBaseline { get; set; }
//         public DateTime ATSTGBaseline { get; set; }
//         public DateTime TimelinesStgPlanFinalizationWithWalkthrough { get; set; }
//         public DateTime ActualTimelinesforStageplanFinalization { get; set; }
//         public DateTime TimelineForStagePlanMock { get; set; }
//         public DateTime ActualTimelinesForStagePlanMock { get; set; }
//         public DateTime TimelinesForPRODUCRPlanBaseline { get; set; }
//         public DateTime TimelinesForPRODUCRPlanFinalizationWithWalkthroughAndFreeze { get; set; }
//         public int ProdFollowUpCount { get; set; }
//         public int StgfollowUpCount { get; set; }

//         public DateTime CreatedTimeStamp { get; set; }
//         public DateTime UpdateTimeStamp { get; set; }
//         public string ProdWalkThrough { get; set; }
//         public string RITM { get; set; }
//         public string ProdPlanReceive { get; set; }
//         public string SPOC { get; set; }
//         public string ServerAccess { get; set; }
//         public string Dependencies { get; set; }
//         public string Remarks { get; set; }
//     }

// }
