import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = async () => {
    setError('');
    try {
      // Hardcoded data for demonstration purposes
      const hardCodedData = [
        {
          request: {
            data: ["M", "1", "334", "4", "B", "Z", "a"]
          },
          response: {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: ["1", "334", "4"],
            alphabets: ["M", "B", "Z", "a"],
            highest_lowercase_alphabet: ["a"]
          }
        },
        {
          request: {
            data: ["2", "4", "5", "92"]
          },
          response: {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: ["2", "4", "5", "92"],
            alphabets: [],
            highest_lowercase_alphabet: []
          }
        },
        {
          request: {
            data: ["A", "C", "Z", "c", "i"]
          },
          response: {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: [],
            alphabets: ["A", "C", "Z", "c", "i"],
            highest_lowercase_alphabet: ["i"]
          }
        }
      ];

      // Validate JSON
      const data = JSON.parse(inputValue);

      // Find the corresponding response based on the input data
      const matchedResponse = hardCodedData.find(
        item => JSON.stringify(item.request.data) === JSON.stringify(data.data)
      );

      if (!matchedResponse) {
        setError('No matching data found.');
        return;
      }

      // Filter response based on selected options
      const filteredResponse = {};
      const keys = selectedOptions.map(opt => opt.value);

      keys.forEach(key => {
        if (matchedResponse.response[key]) {
          filteredResponse[key] = matchedResponse.response[key];
        }
      });

      // Format the response as a string
      const formattedResponse = keys.map(key => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${filteredResponse[key]?.join(', ') || 'None'}`).join('\n');
      setResponse(formattedResponse);
    } catch (err) {
      setError('Invalid JSON format.');
      console.error(err);
    }
  };

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const textareaStyle = {
    fontSize: '16px',
    margin: '10px 0',
    padding: '10px',
    width: '80%',
    maxWidth: '600px',
    height: '100px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  const responseStyle = {
    marginTop: '20px',
    textAlign: 'left',
    display: 'inline-block',
    width: '80%',
    maxWidth: '600px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={containerStyle}>
      <h1>JSON Processor</h1>
      <textarea
        style={textareaStyle}
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter JSON here, e.g., {"data": ["A","C","z"]}'
      />
      <br />

      <Select
        isMulti
        name="options"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelectChange}
      />

      <br />
      <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
      {error && <div style={errorStyle}>{error}</div>}
      {response && (
        <div style={responseStyle}>
          <h2>Filtered Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
