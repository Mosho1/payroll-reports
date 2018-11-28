
import * as React from 'react';
import ReactTable from 'react-table';
import { PayrollReport } from 'entity/PayrollReport';
import * as styles from './styles.css';

const getLastDateOfMonth = (month: number, year: number) => {
  var lastDay = new Date(year, month, 0);
  return lastDay.getDate();
}

export const ReportsTable = (props: { reports: PayrollReport[] }) => {
  return <ReactTable
    className={styles.reportsTable}
    pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
    defaultPageSize={15}
    columns={[
      {
        accessor: (report) => report.employee,
        id: 'employeeId',
        Header: 'Employee ID'
      },
      {
        accessor: report => report,
        Cell: ({ value }: { value: PayrollReport }) => {
          const { isFirstHalf, month, year } = value;
          const dates = isFirstHalf ? [1, 15] : [16, getLastDateOfMonth(month, year)]
          return dates.map(d => `${d}/${month}/${year}`).join(' - ');
        },
        id: 'payPeriod',
        Header: 'Pay Period',
        sortMethod: (a: PayrollReport, b: PayrollReport) => {
          return (a.year - b.year) || (a.month - b.month) || (a.isFirstHalf ? -1 : 1);
        }
      },
      {
        accessor: (report) => report.amountPaid,
        id: 'amountPaid',
        Header: 'Amount Paid'
      },

    ]} data={props.reports} />;
};