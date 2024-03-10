import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BASE_URL } from './utils/constants/constants';

function App() {
  const [prismaSchema, setPrismaSchema] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/generate-dtos`, prismaSchema, {
        headers: { 'Content-Type': 'text/plain' }
      });
      setResponse(response.data);
      setCopied(false);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
      .then(() => setCopied(true))
      .catch(error => console.error('Error copying to clipboard:', error));
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="mx-auto" style={{ width: "fit-content" }}>DTO Generator</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <label htmlFor="prismaSchema">Enter Prisma Schema:</label>
            <textarea
              className="form-control"
              id="prismaSchema"
              value={prismaSchema}
              onChange={(e) => setPrismaSchema(e.target.value)}
              rows="10"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              disabled={loading || !prismaSchema.trim()}
            >
              {loading ? 'Generating...' : 'Generate DTOs'}
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center ">Generated DTOs:</h3>
          <div className="list-group ">
            {response && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  onClick={copyToClipboard}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            )}
            <pre className="overflow-y-auto border mt-3 response">{response}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
