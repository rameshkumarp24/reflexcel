import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [lastNumber, setLastNumber] = useState(null);
  const [divisors, setDivisors] = useState([]);
  const [primeDivisors, setPrimeDivisors] = useState([]);
  const [isPrime, setIsPrime] = useState(null);

  const handleChange = (e) => {
    setNumber(e.target.value);
    setDivisors([]);
    setPrimeDivisors([]);
    setIsPrime(null);
  };

  const isPrimeNumber = (num) => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const num = parseInt(number, 10);
    if (!isNaN(num) && num > 0) {
      setLastNumber(num);
      const divs = new Set();
      const primeDivs = new Set();
      let prime = num > 1;
      
      for (let i = 1; i * i <= num; i++) {
        if (num % i === 0) {
          divs.add(i);
          divs.add(num / i);
          if (isPrimeNumber(i)) primeDivs.add(i);
          if (isPrimeNumber(num / i)) primeDivs.add(num / i);
          if (i !== 1 && i !== num) prime = false;
        }
      }
      
      setDivisors(Array.from(divs).sort((a, b) => a - b));
      setPrimeDivisors(Array.from(primeDivs).sort((a, b) => a - b));
      setIsPrime(prime);
      setNumber('');
    } else {
      setDivisors([]);
      setPrimeDivisors([]);
      setIsPrime(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link reflexcel-text"
          href="https://reflexcel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{'{eˣ}'} Reflexcel</span>
        </a>
        <div className="input-container">
          <input 
            type="number" 
            value={number} 
            onChange={handleChange} 
            placeholder="Enter a number" 
            className="input-box"
            onKeyDown={(e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' ? e.preventDefault() : null}
          />
          <button onClick={handleSubmit} className="submit-button">Submit</button>
          {isPrime !== null && (
            <p className="result">
              {isPrime ? `${lastNumber} is a Prime Number` : `${lastNumber} is NOT a Prime Number`}
            </p>
          )}
          {divisors.length > 0 && (
            <div className="result">
              <p>Divisors: {divisors.join(', ')}</p>
              {primeDivisors.length > 0 && <p>Prime Divisors: {primeDivisors.join(', ')}</p>}
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
            -moz-appearance: textfield;
            width: 200px;
          }
          .input-box::-webkit-outer-spin-button,
          .input-box::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .submit-button {
            margin-left: 10px;
            padding: 10px;
            font-size: 16px;
            background-color: #61dafb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .submit-button:hover {
            background-color: #21a1f1;
          }
          .result {
            margin-top: 10px;
            font-size: 18px;
            margin-right: 16px;
            margin-left: 16px;
            text-align: left;
          }
          .reflexcel-text {
            font-size: 2em;
            font-weight: bold;
          }
          @media (min-width: 768px) {
            .input-box {
              width: 300px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
