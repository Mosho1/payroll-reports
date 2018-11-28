
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { AddPayrollLogComponent, AddPayrollLogMutationFn, GetPayrollReportsDocument } from '../graphql/generated-models';
import { Typography, Button, Paper, Dialog, Grid } from '@material-ui/core'
import * as styles from './styles.css';

export class PayrollLogUploader extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDrop = (runMutation: AddPayrollLogMutationFn) => (files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileText = reader.result;
        if (fileText) {
          runMutation({
            variables: {
              logCsvString: fileText.toString()
            }
          });
        }
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsText(file)
    }
  }

  render() {
    return <Paper className={`${styles.paper} ${styles.payrollLogUploader}`}>
      <Button onClick={this.handleOpen}>Add payroll logs</Button>
      <Dialog
        PaperProps={{ className: styles.uploadModal }}
        open={this.state.open}
        onClose={this.handleClose}
      >
        <AddPayrollLogComponent refetchQueries={[{query: GetPayrollReportsDocument}]}>
          {(addPayrollLog, { error, loading }) =>
            <React.Fragment>
              <Typography className={styles.dropzoneText}>
                Click or drag here
                </Typography>
              {loading && <Typography className={`${styles.dropzoneText} ${styles.dropzoneLoading}`}>
                Loading...
              </Typography>}
              {error && <Typography className={`${styles.dropzoneText} ${styles.dropzoneError}`}>
                {error.message}
              </Typography>}
              <Dropzone className={styles.dropzone} onDropAccepted={this.handleDrop(addPayrollLog)}> </Dropzone>
            </React.Fragment>
          }
        </AddPayrollLogComponent>
      </Dialog>
    </Paper>;
  }
};