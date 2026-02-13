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
    const id = event.target.value;
 
    const index = data.findIndex(locz => locz.place_id == id);
  
    setSelectedCity(data[index].display_name);
    //alert(index + selectedCity);
    if (index   != -1) {
      //alert(data[index].lat + " , "+ data[index].lon);
      // showMap()

    }
  };

  const handleAddrChange = (event) => {
    setNewAddr(event.target.value);
    //address has been changed, get lon and lat from data index
    const index = data.findIndex(locz => locz.display_name === newAddr);
    if (index   != -1) {
      alert(data[index].lat + data[[index].lon]);
      // showMap()

    }
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
              defaultValue={searchParams.has('Address') ? searchParams.get('Address') : '' }
              //onChange={handleChangeAddress}
              />   
          <span>
          <Button type='submit' variant="primary" size="sm">Find Address!</Button>                              
          </span>
        </Form>                    
      </div>  



      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}


      {selectedCity && <p>You selected city key: {selectedCity}</p>}


      {data && (
        <select id="city-select" value={selectedCity} onChange={handleCityChange}>

 
        {data.map((loc) => (
          <option key={loc.place_id} value={loc.place_id}>
            {loc.display_name}
          </option>
        ))}
      </select>

      )

      }
       
      <div ref={mapRef} style={{ width: '100%', height: '440px' }}>{mouseCoordinates}</div>
    </div>

    

    )}

export default App;

