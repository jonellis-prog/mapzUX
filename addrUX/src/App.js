import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Form, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import './App.css';
import ds from "./images/DeathStar.png"


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [newAddr, setNewAddr] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to handle the change event
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleAddrChange = (event) => {
    setNewAddr(event.target.value);
  };

  useEffect(() => {
    // Define the asynchronous function inside the effect
    const fetchData = async () => {
      try {

        const hasAddr = searchParams.has('Address');
        if (hasAddr) {
          setNewAddr(searchParams.get('Address'));
        }

        const response = await fetch('/getcoord/' + newAddr); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [newAddr]); // The empty dependency array ensures this effect runs only once, when the component mounts

  return (
    <div className="App">
      <div>
        <Form onSubmit={handleAddrChange}>
          <label className="navteal">Find a map by global address keywords</label>
          <Form.Control 
              type="text" 
              className="form-control-sm"
              id="Addr" 
              title="Address" 
              placeholder="Enter Address"
              name="Address"
              //onChange={handleChangeAddress}
              />   
          <span>
          <Button type='submit' variant="primary" size="sm">Find Address!</Button>                              
          </span>
        </Form>                    
      </div>  



      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
{/*       {data && (
        <ul>
          <li>Data loaded successfully! Check the console or adjust rendering as needed.</li>
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
        </ul>)} */}

      {selectedCity && <p>You selected city key: {selectedCity}</p>}


      {data && (
        <select id="city-select" value={selectedCity} onChange={handleCityChange}>

 
        {data.map((loc) => (
          <option key={loc.name} value={loc.display_name}>
            {loc.display_name}
          </option>
        ))}
      </select>

      )

      }
       

    </div>

    )}

export default App;

