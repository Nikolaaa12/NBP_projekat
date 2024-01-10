import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
      // Definišite URL ka .NET backend-u
      const apiUrl = 'http://localhost:5105/api/test';

      // Izvršite HTTP GET zahtev ka .NET backend-u
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error:', error));
  }, []); // Prazan niz znači da će se useEffect izvršiti samo jednom nakon prvog renderovanja komponente

  return (
      <div className="App">
          <h1>{message}</h1>
      </div>
  );
}

export default App;
