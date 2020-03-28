import React from 'react';
import { TextField, TextInput } from '../components';

import styles from './TouchTyping.scss';

function App() {
  return (
    <div className={styles.App}>
      <TextField text="It is the first line of my project" />
      <TextInput />
    </div>
  );
}

export default App;
