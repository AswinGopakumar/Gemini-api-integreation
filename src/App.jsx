import { useState } from 'react';
import './App.css';
import run from './gemini';

function App() {
  const [inputValue, setInputValue] = useState(''); // State for input value
  const [output, setOutput] = useState(''); // State for API response

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle API call
  const handleRun = async (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') {
      setOutput('Please enter a prompt.');
      return;
    }
    try {
      const response = await run(inputValue); // Call the Gemini API
      setInputValue(''); 
      setOutput(response); // Update output state with the response
       
    } catch (error) {
      setOutput('An error occurred while fetching the response.');
      console.error(error);
    }
    
  };

  return (
    <>
      <div className="components">
        <div className="outputField">{output}</div>
        <div className="searchBox">
          <form onSubmit={handleRun}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your prompt"
            
          />
          </form>
          <button type='submit' onClick={handleRun}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
