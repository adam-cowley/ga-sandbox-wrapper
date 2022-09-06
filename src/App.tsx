import React, { useContext } from 'react';

import './App.css';
import { GraphAcademyContext } from './components/graphacademy/graph-academy.context';

function App() {
  const context = useContext(GraphAcademyContext)
  const { driver, sandbox } = context

  return (
    <div className="App">
      ✅ running
      <pre>{JSON.stringify(sandbox, null, 2)}</pre>
      {/* <pre>{JSON.stringify(driver, null, 2)}</pre> */}
    </div>
  );
}

export default App;
