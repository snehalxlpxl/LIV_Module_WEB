import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'home'

  },
    {
    id: 'Calendar',
    title: 'Calendar',
    translate: 'Calendar',
    type: 'item',
    icon: 'calendar',
    url: 'Calendar'
  },
  {
    id: 'livs',
    title: 'LIV Form',
    translate: 'LIV Form',
    type: 'item',
    icon: 'arrow-right',
    url: 'credit-limit-req-list'
  },
  
  {
    id: 'Task',
    type: 'collapsible',
    title: 'Tasks',
    icon: 'check-square',
    children: [
     
      {
              id: 'Overdue',
              title: 'Overdue',
              translate: 'Overdue',
              type: 'item',
              icon: 'alert-triangle',
              url: 'Overdue'
            }, 
            {
              id: 'Pending',
              title: 'Pending',
              translate: 'Pending',
              type: 'item',
              icon: 'clock',
              url: 'Pending'
            },
            {
              id: 'Completed',
              title: 'Completed',
              translate: 'Completed',
              type: 'item',
              icon: 'check-circle',
              url: 'Completed'
            }

    ]
  },
  {
    id: 'Companies',
    type: 'collapsible',
    title: 'Companies',
    icon: 'trello',
    children: [
     
      {
        id: 'Customers',
        title: 'Customers',
        translate: 'Customers',
        type: 'item',
        icon: 'arrow-right',
        url: 'customerList'
      }, 
      {
        id: 'Vendors',
        title: 'Vendors',
        translate: 'Vendors',
        type: 'item',
        icon: 'shopping-bag',
        url: 'Vendors'
      }
      

    ]
  },
  {
    id: 'Sales',
    type: 'collapsible',
    title: 'Sales',
    icon: 'zap',
    children: [
      {
        id: 'leadsList',
        title: 'Leads',
        translate: 'Leads',
        type: 'item',
        icon: 'arrow-right',
        url: 'leadsList'
      },
      {
        id: 'appointments',
        title: 'Appointments',
        translate: 'Appointments',
        type: 'item',
        icon: 'arrow-right',
        url: 'appointments'
      },
    
      {
        id: 'sales-quotes',
        title: 'sales-quotes',
        translate: 'Sales Quotes',
        type: 'item',
        icon: 'arrow-right',
        url: 'sales-quotes'
      },
      {
        id: 'Enquiry',
        title: 'Enquiry',
        translate: 'Enquiry',
        type: 'item',
        icon: 'search',
        url: 'enquiry-list'
      },

    ]
  },


  // {
  //   id: 'my-sales-quote',
  //   title: 'My-sales-quote',
  //   translate: 'my-sales-quotet',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'my-sales-quote'
  // },

  // {
  //   id: 'demo-comp-list',
  //   title: 'Demo Company List',
  //   translate: 'demo-comp-list',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'demo-comp-list'
  // },

  // {
  //   id: 'account',
  //   title: 'Account',
  //   translate: 'account',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'account'
  // },
 


  {
    id: 'Shipments',
    type: 'collapsible',
    title: 'Shipments',
    // translate: 'MENU.CM.SECTION',
    icon: 'package',
    children: [
      {
        id: 'Oceanexport',
        title: 'Ocean Export',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'ocean-export'
      },
      {
        id: 'oceanimport',
        title: 'Ocean Import',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-left',
        url: 'ocean-import'
      },
      {
        id: 'air-export',
        title: 'Air Export',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'air-export'
      },
      {
        id: 'air-import',
        title: 'Air Import',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-left',
        url: 'air-import'
      },
      {
        id: 'tracking',
        title: 'Tracking',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'compass',
        url: 'tracking'
      },
      {
        id: 'documentation',
        title: 'Documentation',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'book-open',
        url: 'Documentation'
      },
    ]
  },
  
  {
    id: 'accounts',
    type: 'collapsible',
    title: 'Accounts',
    // translate: 'MENU.CM.SECTION',
    icon: 'briefcase',
    children: [
      {
        id: 'invoices',
        title: 'Invoices',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'invoices'
      },
      {
        id: 'customer_payments',
        title: 'Customer Payments',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'customer_payments'
      },
      {
        id: 'bills',
        title: 'Bills',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'bill'
      },
      {
        id: 'vendor_payments',
        title: 'Vendor Payments',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'arrow-right',
        url: 'vendor_payments'
      },
      {
        id: 'exchange-rates',
        title: 'Exchange Rates',
        // translate: 'MENU.TASKS',
        type: 'item',
        icon: 'map',
        url: 'exchange-rates'
      },

  ]
   },
 {
    id: 'report',
    title: 'Reports',
    translate: 'Reports',
    type: 'item',
    icon: 'trending-up',
    url: 'report'
  },


  // {
  //   id: 'home',
  //   title: 'Tasks',
  //   translate: 'MENU.TASKS',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'a'
  // },
  // {
  //   id: 'arkas',
  //   title: 'ARKAS MODULE',
  //   translate: 'ARKAS',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'arkas'
  // },
  // {
  //   id: 'select',
  //   title: 'Select',
  //   translate: 'Select',
  //   type: 'item',
  //   icon: 'list',
  //   url: 'select'
  // },
  // {
  //   id: 'ocean',
  //   type: 'section',
  //   title: 'OCEAN',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'oceanexport',
  //       title: 'Ocean Export',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'oe-cargolist'
  //     },
  //     {
  //       id: 'oceanimport',
  //       title: 'Ocean Import',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'oi-cargolist'
  //     },

  //   ]
  // },
  // {
  //   id: 'air',
  //   type: 'section',
  //   title: 'AIR',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'airexport',
  //       title: 'Air Export',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'ae-cargolist'
  //     },
  //     {
  //       id: 'airimport',
  //       title: 'Air Import',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'ai-cargolist'
  //     },

  //   ]
  // },
  // {
  //   id: 'accounts',
  //   type: 'collapsible',
  //   title: 'ACCOUNTS',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'invoices',
  //       title: 'Invoices',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'sample'
  //     },
  //     {
  //       id: 'bills',
  //       title: 'Bills',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'home'
  //     },

  //   ]
  // },
  // {
  //   id: 'reports',
  //   type: 'collapsible',
  //   title: 'REPORTS',
  //   // translate: 'MENU.CM.SECTION',
  //   icon: 'file',
  //   children: [
  //     {
  //       id: 'pnl',
  //       title: 'Profit and Loss',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-up',
  //       url: 'a'
  //     },
  //     {
  //       id: 'aging',
  //       title: 'Aging Sumamary',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'bb'
  //     },
  //     {
  //       id: 'outstanding',
  //       title: 'Outstanding Balance',
  //       // translate: 'MENU.TASKS',
  //       type: 'item',
  //       icon: 'arrow-down',
  //       url: 'bb'
  //     },


  //   ]
  // },


]
