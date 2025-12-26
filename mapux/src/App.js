import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, FormControl, Form, Card, Button, DropdownButton, DropdownItem, Dropdown} from 'react-bootstrap';
import geodata from './geodata.json'; // Import the JSON file

const MapComponent = () => {
  // 1. Manage center and zoom with state
  const [center, setCenter] = useState(fromLonLat([0, 0])); // Initial center (e.g., [longitude, latitude])
  const [zoom, setZoom] = useState(2);
  const mapRef = useRef(null);
  const olMap = useRef(null);
  const [selectedValue, setSelectedValue] = useState('None Selected');

  // simulate the data layer until JSON comes from PostGres
  const jsondata = JSON.stringify(geodata);

  // 2. Initialize map on component mount
  useEffect(() => {
    olMap.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: zoom,
      }),
    });

    return () => olMap.current.setTarget(null);
  }, []);

  const handleSelect = (key) => {
    alert(key);
    //setSelectedValue(eventKey);
    const Venice = [12.338, 45.434];

    // find the lonlatzoom from the JSON Data

    setCenter(fromLonLat(Venice));
  }

  // 3. Create a function to change the center
  const changeMapCenter = (newCoords, newZoom) => {
    // Coords should be in the desired projection (e.g., EPSG:3857 for OSM)
    setCenter(fromLonLat(newCoords));
    if (newZoom) setZoom(newZoom);
  };

  // 4. Update the OL map instance when state changes
  useEffect(() => {
    if (olMap.current) {
      // Option A: Instantly set the center
      //olMap.current.getView().setCenter(center);
      // Option B: Animate the view change (optional)
      olMap.current.getView().animate({ center: center, zoom: zoom, duration: 500 });
    }
  }, [center, zoom]);


  
  return (
    <div>
      <button onClick={() => changeMapCenter([-74.006, 40.7128], 10)}>
        Go to New York
      </button>
      <button onClick={() => changeMapCenter([12.338, 45.434], 12)}>
        Go to Venice
      </button>
      <DropdownButton
          onSelect={(eventKey) =>handleSelect(eventKey)}
          id="dropdown-basic-button" variant="info" 
          title={selectedValue === 'None Selected' ? 'Select an Option' : selectedValue}>

        <Dropdown.Item eventKey="London">London</Dropdown.Item>
        <Dropdown.Item eventKey="Venice" onClick={() => changeMapCenter([12.338, 45.434], 12)}>Venice</Dropdown.Item>
        <Dropdown.Item eventKey="STL">Saint Louis</Dropdown.Item>
      </DropdownButton>

      {/* The div where OpenLayers renders the map */}
      <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
      <hr></hr>
      <div><p>{jsondata}</p></div>
    </div>
  );
};

export default MapComponent;
