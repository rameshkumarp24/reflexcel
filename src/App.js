import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [divisors, setDivisors] = useState([]);
  const [isPrime, setIsPrime] = useState(null);

  const handleChange = (e) => {
    setNumber(e.target.value);
    setDivisors([]);
    setIsPrime(null);
  };

  const handleSubmit = () => {
    const num = parseInt(number, 10);
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
      setNumber('');
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
          className="App-link reflexcel-text"
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
            onKeyDown={(e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' ? e.preventDefault() : null}
          />
          <button onClick={handleSubmit} className="submit-button">Submit</button>
          {divisors.length > 0 && (
            <div className="result">
              <p>Divisors: {divisors.join(', ')}</p>
              <p>{isPrime !== null && (isPrime ? `${divisors[divisors.length - 1]} is a Prime Number` : `${divisors[divisors.length - 1]} is NOT a Prime Number`)}</p>
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
            width: 200px; /* Default width */
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
            text-align: left; /* Left-align the result */
          }
          .reflexcel-text {
            font-size: 2em;
            font-weight: bold;
          }

          /* Media query for bigger screens */
          @media (min-width: 768px) {
            .input-box {
              width: 300px; /* 1.5x the default width */
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
