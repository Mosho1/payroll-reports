import * as React from 'react';
import Core from './components/Core';
import { CssBaseline } from '@material-ui/core';

interface Props {

}

export class Root extends React.Component<Props, {}> {

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Core />
      </React.Fragment>
    );
  }
}
