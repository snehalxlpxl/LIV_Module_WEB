export interface TaskDetail {
    taskId: number;
    leadId: number;
    title: string;
    startDate: string; 
    dueDate: string; 
    priority: string;
    status: string;
    reminder: string;
    repeat: string;
    description: string;
    createdAt: string; 
    modifiedAt: string; 
    deletedAt: string | null;  
    createdBy: string;
    modifiedBy: string;
    deletedBy: string | null;
    isDeleted: boolean;
    userId: number;
    officeId: number;
    ActivityType:string;
  }
  