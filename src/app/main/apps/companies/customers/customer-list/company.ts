export interface Company {
    client: any;
    companyId: number;
    companyName: string;
    companyCode: string | null;
    companyTypeId: number;
    companyTypeName: string;
    parentCompanyId: number;
    email: string | null;
    website: string | null;
    notes: string | null;
    createdBy: string | null;
    dateCreated: string;
    modifiedBy: string | null;
    dateModified: string | null;
    deletedBy: string | null;
    dateDeleted: string | null;
    isDeleted: boolean;
    officeId: number;
    companyApprovalStatus: string;
    ownerId: number | null;
    rowguid: string;
    cafReceived: string | null;
    cafReceivedDate: string | null;
    creditDays: number | null;
    mepzCode: string | null;
    pannumber: string | null;
    companyAddresses: any[];
    companyBankAccounts: any[];
    companyDocument1s: any[];
    companyDocuments: any[];
    companyPhones: any[];
    companyType: any;
    contacts: any[];
    opportunities: any[];
    userMasters: any[];
    userOfficeAccesses: any[];
  }
  