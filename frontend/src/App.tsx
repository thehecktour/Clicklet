import React, { useState } from 'react';
import './App.css'

function App() {

  const [pounds, setPounds] = useState('');
  const [result, setResult] = useState('');


  const funcao = () => {
    const valorPounds = parseFloat(pounds);
    const resultado = valorPounds/2.2046;
    
    if(!isNaN(valorPounds)){
      setResult(resultado.toFixed(2));
    }else{
      setResult('0');
    }
  }

  return (
    <div className='App'>
      <h1>Weight Converter</h1>
      <h2>Pounds:</h2>
      <input
        value={pounds}
        onChange={(e)=> setPounds(e.target.value)}
        placeholder='Enter number of pounds'
        type='number'
      />
      <button onClick={funcao}>Calculate</button>
      <h3>Your weight in kg is: {result}</h3>
    </div>
  );
}

export default App;
