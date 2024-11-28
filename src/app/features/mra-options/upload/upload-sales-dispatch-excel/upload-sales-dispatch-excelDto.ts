//Sales & Dispatch Excel
export const searchSalesDispatchexcelConfig = [
    { name: 'category', label: 'Category', type: 'dropdown', placeholder: 'Select', options: [{ label: 'Category 1', value: 'category1' }, { label: 'Category 2', value: 'category2' }] },
    { name: 'fromDate', label: 'From Date', type: 'calendar', placeholder: 'Select' },
    { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' }
  ];
  export const SalesDispatchexcelTableColumnsConfig = [
    { field: 'fileName', header: 'Name Of Excel' },
    { field: 'category', header: 'Category' },
    { field: 'uploadDate', header: 'Upload Date' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' }
  ];
  export const salesDispatchexcelTableConfig = [
    { nameOfExcel: 'RB_RBC_WR_BL_ARI', category: 'Sales', uploadDate: '01/07/2024', startDate: '01/07/2024', endDate: '01/07/2024' },
    { nameOfExcel: 'RB_RBC_WR_BL_SRI', category: 'Export', uploadDate: '01/07/2024', startDate: '01/07/2024', endDate: '01/07/2024' },
    { nameOfExcel: 'RB_RBC_WR_BL_TRI', category: 'Growth', uploadDate: '01/07/2024', startDate: '01/07/2024', endDate: '01/07/2024' },
    { nameOfExcel: 'RB_RBC_WR_BL_TRI', category: 'Market', uploadDate: '01/07/2024', startDate: '01/07/2024', endDate: '01/07/2024' }
  ];
  export const uploadSourceConfig = [
    { label: 'Sales & dispatch data', value: 'Sales & dispatch data' },
    { label: 'Rebar, Rebar Coil, Wire Rod, Billet & DRI', value: 'Rebar, Rebar Coil, Wire Rod, Billet & DRI' },
    { label: 'Section & Sheet Piles', value: 'Section & Sheet Piles' },
    { label: 'Scrap & Other', value: 'Scrap & Other' }
  ];
  export enum SourceEnum {
    dsalesDispatchData = 'Sales & dispatch data',
    Rebar = 'Rebar, Rebar Coil, Wire Rod, Billet & DRI',
    sectionSheet = 'Section & Sheet Piles',
    scrapOther = 'Scrap & Other'
  }  