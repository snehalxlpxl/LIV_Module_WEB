export interface CompanyInfo {
  companyId: number;
  companyName: string;
  companyCode: string;
  companyTypeId: number;
  companyTypeName: string;
  parentCompanyId: number;
  email: string;
  website: string;
  notes: string;
  createdBy: number;
  dateCreated: string; // Assuming ISO 8601 format for date strings
  modifiedBy: number;
  dateModified: string;
  deletedBy: number;
  dateDeleted: string;
  isDeleted: boolean;
  officeId: number;
  companyApprovalStatus: string;
  ownerId: number;
  cafReceived: boolean;
  cafReceivedDate: string;
  creditDays: string;
  mepzCode: string;
  pannumber: string;
  gsttypeId: number;
  gstin: string;
  pan: string;
  paymentTermId: number;
  paymentTermLabel: string;
  gsttypeName: string;
  companyType: {
    companyTypeId: number;
    companyType1: string;
    isInternal: boolean;
    isActive: boolean;
  };
}
