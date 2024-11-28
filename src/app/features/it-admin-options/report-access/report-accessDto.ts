export const reportAccessSeachConfig = [
    { employeeID: 'employeeID', label: 'Employee ID', type: 'dropdown', placeholder: 'Select', options: [{ label: 'RB_RBC_WR_BL_ARI', value: 'RB_RBC_WR_BL_ARI' }, { label: 'RB_RBC_WR_BL_SRI', value: 'RB_RBC_WR_BL_SRI' }] },
    { employeeName: 'employeeName', label: 'Employee Name', type: 'dropdown', placeholder: 'Select', options: [{ label: 'RB_RBC_WR_BL_ARI', value: 'RB_RBC_WR_BL_ARI' }, { label: 'RB_RBC_WR_BL_SRI', value: 'RB_RBC_WR_BL_SRI' }] },
  ];
  export const reportAccessColumnsConfig = [
    { field: 'employeeID', header: 'Employee ID' },
    { field: 'employeeName', header: 'Employee Name' },
    { field: 'department', header: 'Department' }
  ];
  export const reportAccessTableConfig = [
    { employeeID: 'DEL5678', employeeName: 'Smith', department: 'Sales' },
    { employeeID: 'DEL5673', employeeName: 'Rebar', department: 'Export' },
    { employeeID: 'DEL5678', employeeName: 'Upload', department: 'Market' },
    { employeeID: 'DEL5698', employeeName: 'Rabert', department: 'Sales' }
  ];
  export const reportAccessManageConfig = [
    {
      label: 'Main folder 1',
      children: [
        {
          label: 'Sub folder 1',
          children: [
            { label: 'Sub Sub folder 1' },
            { label: 'Sub Sub folder 2' },
          ]
        },
        { 
           label: 'Sub folder 2',
           children: [
            { label: 'Sub Sub folder 1' },
            { label: 'Sub Sub folder 2' },
          ]
        }
      ]
    },
    {
      label: 'Main folder 2',
      children: [
        { label: 'Sub folder 1' },
        { label: 'Sub folder 2' }
      ]
    },
    { label: 'Main folder 3' },
    { label: 'Main folder 4' },
    { label: 'Main folder 5' }
  ];