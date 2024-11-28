export namespace ApiUrls {
  export const signin: string = '/saml2/login';
  export const signout: string = '/saml2/logout';
  export const profile: string = '/v1/profile';
  export const usermanagement: string = '/v1/usermanagement';
  export const uploadSalesPDF: string = '/v1/uploadSalesPDF';
  export const addUserToRole: string = '/v1/usermanagement';
  export const getnewsletters: string = '/v1/newsletter/getnewsletters';
  export const getSalesDispatch: string = '/v1/salesanddispatch/getsalesanddispatchexcellist';
  export const getnewsletterpdf: string = '/v1/newsletter/getnewsletterpdf';
  export const uploadNewsLetter: string = '/v1/newsletter/uploadNewsLetter';
  export const deleteNewsLetter: string = '/v1/newsletter/deleteNewsLetter';
  export const addUploadSalesDashboard: string =
    '/v1/salesdashboard/uploadsalesdashboardpdf';
  export const getSalesdashboardpdf: string =
    '/v1/salesdashboard/getsalesdashboardpdf';
  export const getAllSalesDashboardPdf: string =
    '/v1/salesdashboard/getAllSalesDashboardPdfs';
  export const deleteUserRole: string = '/v1/usermanagement/removeuser';

  export const uploadSalesAndDispatchExcel: string =
    '/v1/salesAndDispatch/uploadSalesAndDispatch';
    export const viewSalesDispatch: string =
    '/v1/salesanddispatch/getsalesanddispatchexcelbyid';
    export const deleteSalesDispatch: string =
    '/v1/salesanddispatch/getsalesanddispatchexcelbyid';
}

//use the for sidebar navigation
export const NavigationMenuItemConfig = [
  {
    key: 'MRA',
    displayName: 'Home',
    value: {
      path: '/',
      icon: 'esa-icon esa-icon-home',
    },
  },
  {
    key: 'MRA',
    displayName: 'Predictive Analysis',
    value: {
      path: '/predictive-analysis',
      icon: 'esa-icon esa-icon-predictive-analysis',
    },
  },

  {
    key: 'MRA',
    displayName: 'Tickers',
    value: {
      path: '/tickers',
      icon: 'esa-icon esa-icon-tickers',
    },
  },

  {
    key: 'MRA',
    displayName: 'News Letters',
    value: {
      path: '/newsletters',
      icon: 'esa-icon esa-icon-newsletter',
    },
  },

  {
    key: 'MRA',
    displayName: 'Terminal Guide',
    value: {
      path: '/terminal-guide',
      icon: 'esa-icon esa-icon-terminal-guide',
    },
  },
  {
    key: 'MRA',
    displayName: 'Sales Dashboard',
    value: {
      path: '/saleDashboard/ ',
      icon: 'esa-icon esa-icon-sales-dashboard',
    },
  },
  {
    key: 'MRA',
    displayName: 'Reports',
    value: {
      path: '/reports',
      icon: 'esa-icon esa-icon-reports',
    },
  },

  {
    key: 'MRA ',
    displayName: 'Connect with Us',
    value: {
      path: '/connectwithus',
      icon: 'esa-icon esa-icon-sales-contact',
    },
  },
  {
    key: 'MRA',
    displayName: 'IT Admin Options',
    value: {
      path: '/itadminoptions',
      icon: 'esa-icon esa-icon-it-admin-options',
    },
  },
  {
    key: 'MRA ',
    displayName: 'MRA Options',
    value: {
      path: '/mraoptions',
      icon: 'esa-icon esa-icon-mra-options',
    },
  },

  // {
  //   key: 'BA',
  //   value: {
  //     path: '/bookappointment',
  //     icon: 'esa-icon esa-icon-bookappointment',
  //   },
  // },
  // {
  //   key: 'TA',
  //   value: {
  //     path: '/todayappointment',
  //     icon: 'esa-icon esa-icon-todaysappointment',
  //   },
  // },
  // {
  //   key: 'DA',
  //   value: {
  //     path: '/dataanalytics',
  //     icon: 'esa-icon esa-icon-dataanalytics',
  //   },
  // },
  // {
  //   key: 'RA',
  //   value: {
  //     path: '/riskassesment',
  //     icon: 'esa-icon esa-icon-riskassessment',
  //   },
  // },
  // {
  //   key: 'DG',
  //   value: {
  //     path: '/demographics',
  //     icon: 'esa-icon esa-icon-demographics',
  //   },
  // },
  // {
  //   key: 'SCH',
  //   value: {
  //     path: '/schedules',
  //     icon: 'esa-icon esa-icon-schedules',
  //   },
  // },
  // {
  //   key: 'UM',
  //   value: {
  //     path: '/usermanagement',
  //     icon: 'esa-icon esa-icon-usermanagement',
  //   },
  // },
];

//Crds View Config
export const itAdminOptionsConfig = [
  { title: 'User Management', subTitle: 'User Management' },
  { title: 'Report Access', subTitle: 'Report Access' },
  { title: 'Ticker Price', subTitle: 'Ticker Price' },
  { title: 'Sales Dashboard PDF', subTitle: 'Sales Dashboard PDF' },
];
export const mraOptionsConfig = [
  { title: 'News', subTitle: 'Exported News Status Report' },
  { title: 'Exported News Report', subTitle: 'Exported News Status Report' },
  { title: 'Rebar UAE', subTitle: 'Forcasting for UAE' },
  { title: 'Sales Dispatch', subTitle: 'Sales Dispatch Data' },
  { title: 'Upload', subTitle: 'Upload Data' },
];
export const uploadConfig = [
  { title: 'News Letter', subTitle: 'Exported News Status Report' },
  { title: 'Report', subTitle: 'Exported News Status Report' },
  { title: 'Sales Dispatch Excel', subTitle: 'Sales Dispatch Data' },
  { title: 'News report', subTitle: 'View Published Report on Old MRA Report' },
];
export const newsConfig = [
  { title: 'Received News', subTitle: 'From Data Seience Team' },
  { title: 'Create News', subTitle: 'MRA Team Create Digist/News' },
  { title: 'Published News', subTitle: 'Published by MRA Team' },
  {
    title: 'Old MRA Portal News',
    subTitle: 'View pulished news on old MRA portal',
  },
];
export const raberUAEConfig = [
  { title: 'Model Output', subTitle: 'From Data Seience Team' },
  { title: 'Overall Vs Sector Wise', subTitle: 'MRA Team Create Digist/News' },
];
// export const salesDashboardPDFConfig = [
//   { name: 'keywords', label: 'Enter Keywords', type: 'input', placeholder: 'Multiple (,) separated' },
//   { name: 'category', label: 'Category', type: 'dropdown', placeholder: 'Select', options: [{ label: 'Category 1', value: 'category1' }, { label: 'Category 2', value: 'category2' }] },
//   { name: 'fromDate', label: 'From Date', type: 'calendar', placeholder: 'Select' },
//   { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' }
// ];

//Exported News Report
export const exportedNewsReportTableColumnsConfig = [
  { field: 'exportedDate', header: 'Exported Date' },
  { field: 'exportedDay', header: 'Exported Day' },
  { field: 'fastMarket', header: 'Fast Market' },
  { field: 'kallanish', header: 'Kallanish' },
  { field: 'platts', header: 'Platts(SSB Steel Markets)' },
  { field: 'metalExpert', header: 'Metal Expert(World Steel News' },
];
export const exportedNewsReportTableConfig = [
  {
    exportedDate: '01/07/2024 4:23PM',
    exportedDay: '2',
    fastMarket: 'Growth',
    kallanish: 'TDSI',
    platts: 'Sales',
    metalExpert: 'Steel',
  },
  {
    exportedDate: '01/06/2024 4:23PM',
    exportedDay: '3',
    fastMarket: 'GSD',
    kallanish: 'IDSI',
    platts: 'Growth',
    metalExpert: 'Market',
  },
  {
    exportedDate: '01/04/2024 4:23PM',
    exportedDay: '6',
    fastMarket: 'Steel',
    kallanish: 'THSI',
    platts: 'Market',
    metalExpert: 'Steel',
  },
  {
    exportedDate: '01/05/2024 4:23PM',
    exportedDay: '9',
    fastMarket: 'Market',
    kallanish: 'TDTI',
    platts: 'Steel',
    metalExpert: 'Growth',
  },
];

//Sales & Dispatch Excel
export const searchSalesDispatchexcelConfig = [
  {
    name: 'category',
    label: 'Category',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'fromDate',
    label: 'From Date',
    type: 'calendar',
    placeholder: 'Select',
  },
  { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' },
];
export const SalesDispatchexcelTableColumnsConfig = [
  { field: 'nameOfExcel', header: 'Name Of Excel' },
  { field: 'category', header: 'Category' },
  { field: 'uploadDate', header: 'Upload Date' },
  { field: 'dataStart', header: 'Data Start' },
  { field: 'dataEnd', header: 'Data End' },
];
export const salesDispatchexcelTableConfig = [
  {
    nameOfExcel: 'RB_RBC_WR_BL_ARI',
    category: 'Sales',
    uploadDate: '01/07/2024 4:23PM',
    dataStart: '01/07/2024 4:23PM',
    dataEnd: '01/07/2024 4:23PM',
  },
  {
    nameOfExcel: 'RB_RBC_WR_BL_SRI',
    category: 'Export',
    uploadDate: '01/07/2024 4:23PM',
    dataStart: '01/07/2024 4:23PM',
    dataEnd: '01/07/2024 4:23PM',
  },
  {
    nameOfExcel: 'RB_RBC_WR_BL_TRI',
    category: 'Growth',
    uploadDate: '01/07/2024 4:23PM',
    dataStart: '01/07/2024 4:23PM',
    dataEnd: '01/07/2024 4:23PM',
  },
  {
    nameOfExcel: 'RB_RBC_WR_BL_TRI',
    category: 'Market',
    uploadDate: '01/07/2024 4:23PM',
    dataStart: '01/07/2024 4:23PM',
    dataEnd: '01/07/2024 4:23PM',
  },
];

//Upload News
export const searchUploadNewsConfig = [
  {
    name: 'source',
    label: 'Source',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'fromDate',
    label: 'From Date',
    type: 'calendar',
    placeholder: 'Select',
  },
  { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' },
];
export const uploadNewsTableColumnsConfig = [
  { field: 'name', header: 'Name Of NewsLetter' },
  { field: 'source', header: 'Source' },
  { field: 'fileModifiedOn', header: 'Upload Date' },
];
export const uploadNewsletterTableConfig = [
  {
    nameOfNewsLetter: 'RB_RBC_WR_BL_ARI',
    source: 'Blob',
    uploadDate: '01/07/2024 4:23PM',
  },
  {
    nameOfNewsLetter: 'RB_RBC_WR_BL_SRI',
    source: 'AWS',
    uploadDate: '01/07/2024 4:23PM',
  },
  {
    nameOfNewsLetter: 'RB_RBC_WR_BL_TRI',
    source: 'Storage',
    uploadDate: '01/07/2024 4:23PM',
  },
  {
    nameOfNewsLetter: 'RB_RBC_WR_BL_TRI',
    source: 'Local',
    uploadDate: '01/07/2024 4:23PM',
  },
];

//Received News
export const searchReceivedNewsConfig = [
  {
    name: 'status',
    label: 'Status',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'source',
    label: 'Source',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'fromDate',
    label: 'From Date',
    type: 'calendar',
    placeholder: 'Select',
  },
  { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' },
];
export const receivedNewsTableColumnsConfig = [
  { field: 'refNo', header: 'Ref. No.' },
  { field: 'source', header: 'Source' },
  { field: 'shortHeadline', header: 'Short Headline' },
  { field: 'sourceDate', header: 'Source Date' },
  { field: 'createdDate', header: 'Created Date' },
  { field: 'publishedDate', header: 'Published Date' },
  { field: 'status', header: 'Status' },
];
export const receivedNewsTableDataConfig = [
  {
    refNo: '44111',
    source: 'Fast Markets',
    shortHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing-2',
    shortDescline:
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-2',
    sourceDate: '21/12/2023 04:00 PM',
    createdDate: '21/12/2023 04:00 PM',
    publishedDate: '21/12/2023 04:00 PM',
    status: 'Draft',
  },
  {
    refNo: '44110',
    source: 'Fast Markets',
    shortHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing-1',
    shortDescline:
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-1',
    sourceDate: '21/12/2023 04:00 PM',
    createdDate: '21/12/2023 04:00 PM',
    publishedDate: '21/12/2023 04:00 PM',
    status: 'Draft',
  },
];

// Report Access
export const reportAccessSeachConfig = [
  {
    employeeID: 'employeeID',
    label: 'Employee ID',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'RB_RBC_WR_BL_ARI', value: 'RB_RBC_WR_BL_ARI' },
      { label: 'RB_RBC_WR_BL_SRI', value: 'RB_RBC_WR_BL_SRI' },
    ],
  },
  {
    employeeName: 'employeeName',
    label: 'Employee Name',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'RB_RBC_WR_BL_ARI', value: 'RB_RBC_WR_BL_ARI' },
      { label: 'RB_RBC_WR_BL_SRI', value: 'RB_RBC_WR_BL_SRI' },
    ],
  },
];
export const reportAccessColumnsConfig = [
  { field: 'employeeID', header: 'Employee ID' },
  { field: 'employeeName', header: 'Employee Name' },
  { field: 'department', header: 'Department' },
];
export const reportAccessTableConfig = [
  { employeeID: 'DEL5678', employeeName: 'Smith', department: 'Sales' },
  { employeeID: 'DEL5673', employeeName: 'Rebar', department: 'Export' },
  { employeeID: 'DEL5678', employeeName: 'Upload', department: 'Market' },
  { employeeID: 'DEL5698', employeeName: 'Rabert', department: 'Sales' },
];

// Sales Dashboard Upload
export const searchSalesDashboardPDFConfig = [
  {
    name: 'fromDate',
    label: 'From Date',
    type: 'calendar',
    placeholder: 'Select',
  },
  { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' },
];
export const uploadSalesDashboardPDFColumnsConfig = [
  { field: 'name', header: 'Name of PDF' },
  { field: 'uploadDate', header: 'Upload Date' },
];
export const uploadSalesDashboardPDFTableConfig = [
  { name: 'RB_RBC_WR_BL_ARI', uploadDate: '01/07/2024 4:23PM' },
  { name: 'RB_RBC_WR_BL_SRI', uploadDate: '06/09/2022 6:45PM' },
  { name: 'RB_RBC_WR_BL_TRI', uploadDate: '28/11/2023 3:30PM' },
  { name: 'RB_RBC_WR_BL_TRI', uploadDate: '28/11/2023 3:30PM' },
];

//Published News
export const searchPublishedNewsConfig = [
  {
    name: 'status',
    label: 'Status',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'source',
    label: 'Source',
    type: 'dropdown',
    placeholder: 'Select',
    options: [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
    ],
  },
  {
    name: 'fromDate',
    label: 'From Date(Source)',
    type: 'calendar',
    placeholder: 'Select',
  },
  {
    name: 'toDate',
    label: 'To Date(Source)',
    type: 'calendar',
    placeholder: 'Select',
  },
  {
    name: 'fromDate',
    label: 'From Date(Published)',
    type: 'calendar',
    placeholder: 'Select',
  },
  {
    name: 'toDate',
    label: 'To Date(Published)',
    type: 'calendar',
    placeholder: 'Select',
  },
];
export const publishedNewsTableColumnsConfig = [
  { field: 'refNo', header: 'Ref. No.' },
  { field: 'source', header: 'Source' },
  { field: 'shortHeadline', header: 'Short Headline' },
  { field: 'sourceDate', header: 'Source Date' },
  { field: 'createdDate', header: 'Created Date' },
  { field: 'publishedDate', header: 'Published Date' },
  { field: 'status', header: 'Status' },
];
export const publishedNewsTableDataConfig = [
  {
    refNo: '44111',
    source: 'Fast Markets',
    shortHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing-2',
    shortDescline:
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-2',
    sourceDate: '21/12/2023 04:00 PM',
    createdDate: '21/12/2023 04:00 PM',
    publishedDate: '21/12/2023 04:00 PM',
    status: 'Draft',
  },
  {
    refNo: '44110',
    source: 'Fast Markets',
    shortHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing-1',
    shortDescline:
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-1',
    sourceDate: '21/12/2023 04:00 PM',
    createdDate: '21/12/2023 04:00 PM',
    publishedDate: '21/12/2023 04:00 PM',
    status: 'Draft',
  },
];
