import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, FormControl, Form, Card, Button, DropdownButton, DropdownItem, Dropdown} from 'react-bootstrap';
import geodata from './geodata.json'; 
import './App.css';
import ds from "./images/DeathStar.png"

const MapComponent = () => {
  // 1. Manage center and zoom with state
  const [center, setCenter] = useState(fromLonLat([0, 0])); 
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
    const newLoc = geodata.find(loc => 
       loc.location === key);
    setCenter(fromLonLat([newLoc.lon, newLoc.lat]));
    setZoom(newLoc.zoom);
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

      <div style={{ width: '100%'}} className="bg-dark mt-12 tealtext">
            <Container className="bg-dark mt-12 tealtext">                        
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={ds} height="64px"></img>
                            <h3>DStar Maps</h3>
                        </div>
                        <div className = "col-sm-6">                             
                            <div>
                                <label className="navteal">Optional: Find coordinates of an address</label>
                                <Form.Control 
                                    type="text" 
                                    className="form-control-sm"
                                    id="Addr" 
                                    title="Address" 
                                    placeholder="Enter Address"
                                    //onChange={handleChangeAddress}
                                    />   
                                <Button type='submit' variant="primary" size="sm" title='Future Use'>Find Coordinates!</Button>
                                <DropdownButton
                                    onSelect={(eventKey) =>handleSelect(eventKey)}
                                    id="dropdown-basic-button" variant="info" 
                                    title={selectedValue === 'None Selected' ? 'Choose a Destination' : selectedValue}>
                                    {geodata.map((loc) => (
                                      <Dropdown.Item eventKey={loc.location}>{loc.location}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>  
                        </div>                            
                        <div className="col-sm-4">
                            <div>
                                  
                                  <label >Enter coordinates</label>
                                  <Form.Control 
                                    type="text" 
                                    className="form-control-sm" 
                                    id="lat" 
                                    title="Latitude" 
                                    placeholder="Enter Latitude"
                                    />

                                    <Form.Control 
                                    type="text" 
                                    className="form-control-sm" 
                                    id="lon" 
                                    title="Longitude" 
                                    placeholder="Enter Longitude Coordinate"
                                    />
                                  <Button type="button"  variant="primary" size="sm">Show Map for these coordinatese!</Button>
                            </div>                            
                    </div>  
                    </div>                            
            </Container>
      </div> 

      {/* The div where OpenLayers renders the map */}
      <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
      <hr></hr>
      <div><p class="dataShowSmall">{jsondata}</p></div>
    </div>
  );
};

export default MapComponent;
