import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://your-backend-url/bfhl', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="App">
            <h1>REST API Frontend</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <div>
                    <select multiple={true} value={selectedOptions} onChange={handleOptionChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;




const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const userId = "john_doe_17091999"; // Replace with dynamic user ID generation logic
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase()).sort().pop() || null;

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(Server is running on port ${port});
});

