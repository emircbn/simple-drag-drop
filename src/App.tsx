import * as React from 'react';
import Homepage from "./containers/Homepage";
import './styles/App.css';
import './styles/column.css';
import './styles/card.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
};

export default App;
