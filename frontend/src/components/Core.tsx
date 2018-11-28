import * as   React from 'react';
import * as styles from './styles.css';
import Home from './Home';

/**
 * <Core />
 * Wraps all our child components to provide global navigation.
 * This makes it simple to have a component at the index '/' route
 * of our application.
 */

const Core: React.FunctionComponent = ({ children }) =>
  <div>
    <main className={styles.scopedClassName}>
      <Home />
    </main>
  </div>;

export default Core;
