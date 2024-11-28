//Received News
export const searchReceivedNewsConfig = [
    { name: 'status', label: 'Status', type: 'dropdown', placeholder: 'Select', options: [{ label: 'Category 1', value: 'category1' }, { label: 'Category 2', value: 'category2' }] },
    { name: 'source', label: 'Source', type: 'dropdown', placeholder: 'Select', options: [{ label: 'Category 1', value: 'category1' }, { label: 'Category 2', value: 'category2' }] },
    { name: 'fromDate', label: 'From Date', type: 'calendar', placeholder: 'Select' },
    { name: 'toDate', label: 'To Date', type: 'calendar', placeholder: 'Select' }
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
      shortDescline: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-2',
      sourceDate: '21/12/2023 04:00 PM',
      createdDate: '21/12/2023 04:00 PM',
      publishedDate: '21/12/2023 04:00 PM',
      status: 'Draft'
    },
    {
      refNo: '44110',
      source: 'Fast Markets',
      shortHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing-1',
      shortDescline: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-1',
      sourceDate: '21/12/2023 04:00 PM',
      createdDate: '21/12/2023 04:00 PM',
      publishedDate: '21/12/2023 04:00 PM',
      status: 'Draft'
    },
  ];