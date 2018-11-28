import * as React from 'react';
import { GetPayrollReportsComponent } from '../graphql/generated-models';
import { Paper, Grid } from '@material-ui/core'
import * as styles from './styles.css';
import { PayrollLogUploader } from './PayrollLogUploader';
import { ReportsTable } from './ReportsTable';

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PayrollLogUploader />
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <GetPayrollReportsComponent>
            {({ data, loading, error }) => {
              if (error) {
                console.error(error);
                return <div>Something went wrong!</div>;
              }
              if (loading) {
                return <div>Loading...</div>;
              }
              if (data) {
                return <ReportsTable reports={data.payrollReports} />;
              }
            }}
          </GetPayrollReportsComponent>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default Home;
