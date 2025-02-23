import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [divisors, setDivisors] = useState([]);
  const [isPrime, setIsPrime] = useState(null);

  const handleChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumber(e.target.value);
    if (!isNaN(num) && num > 0) {
      const divs = new Set();
      let prime = num > 1;
      for (let i = 1; i * i <= num; i++) {
        if (num % i === 0) {
          divs.add(i);
          divs.add(num / i);
          if (i !== 1 && i !== num) prime = false;
        }
      }
      setDivisors(Array.from(divs).sort((a, b) => a - b));
      setIsPrime(prime);
    } else {
      setDivisors([]);
      setIsPrime(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reflexcel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          REFL[eˣ]CEL
        </a>
        <div className="input-container">
          <input 
            type="number" 
            value={number} 
            onChange={handleChange} 
            placeholder="Enter a number" 
            className="input-box"
          />
          {number && (
            <div className="result">
              <p>Divisors: {divisors.join(', ')}</p>
              <p>{isPrime !== null && (isPrime ? 'It is a Prime Number' : 'It is NOT a Prime Number')}</p>
            </div>
          )}
        </div>
      </header>

      <style>
        {`
          .input-container {
            text-align: center;
            margin-top: 20px;
          }
          .input-box {
            padding: 10px;
            font-size: 16px;
            border: 2px solid #61dafb;
            border-radius: 5px;
            outline: none;
          }
          .result {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}

export default App;
