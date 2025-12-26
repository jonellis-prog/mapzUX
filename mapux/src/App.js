import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, FormControl, Form, Card, Button, DropdownButton, DropdownItem, Dropdown} from 'react-bootstrap';

import './App.css';
import ds from "./images/DeathStar.png"

import geodata from './geodata.json'; 

const MapComponent = () => {
  // 1. Manage center and zoom with state
  const [center, setCenter] = useState(fromLonLat([0, 0])); 
  const [zoom, setZoom] = useState(2);
  const [lonlatFound, setLonLat] = useState(fromLonLat([0, 0]));
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
    const newLoc = geodata.find(loc => 
       loc.location === key);
    setCenter(fromLonLat([newLoc.lon, newLoc.lat]));
    setZoom(newLoc.zoom);
  }

  const handleSubmitAddress = (event) => {
    event.preventDefault(); // Stop page reload
    
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const addr = data.Address;
    //alert(JSON.stringify(data), addr);
    // get Address from API
    const indy = geodata.findIndex(loc => loc.location === addr);
    // alert(indy + '  '+ addr);

    let newCoords = [geodata[1].lon, geodata[1].lat];
    let newZoom = 10;

    if (indy != -1 ) {
      newCoords = [ geodata[indy].lon, geodata[indy].lat ];
      newZoom = geodata[indy].zoom;
    } 
    else
    { alert('Address not found, resetting map');}
    setCenter(fromLonLat(newCoords),10);
    setZoom(newZoom);
    setLonLat(fromLonLat(newCoords));
  };

  const goToFound = () => {
    setCenter(lonlatFound);
  }

  const handleSubmitCoords = (event) => {
    event.preventDefault(); // Stop page reload
    
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newCoords=[data.lon, data.lat];

    setCenter(fromLonLat(newCoords));
    setZoom(10);
  };

  const changeMapCenter = (newCoords, newZoom) => {
    // Coords should be in the desired projection (e.g., EPSG:3857 for OSM)
    setCenter(fromLonLat(newCoords));
    if (newZoom) setZoom(newZoom);
  };

  useEffect(() => {
    if (olMap.current) {
      //olMap.current.getView().setCenter(center);
      olMap.current.getView().animate({ center: center, zoom: zoom, duration: 1500 });
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
                              <Form onSubmit={handleSubmitAddress}>
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
                                <Button type='submit' variant="primary" size="sm" title='Future Use'>Search Maps!</Button>
                               
                                <Button type='button' variant="alert" onClick={goToFound} size="sm">Go! ></Button>
                              </Form>

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
                                <Form onSubmit={handleSubmitCoords}>
                                  <label >Enter Exact GPS coordinates (Expert Mode)</label>
                                  <Form.Control 
                                    type="text" 
                                    className="form-control-sm" 
                                    id="lat" 
                                    title="Latitude" 
                                    name="lat"
                                    placeholder="Enter Latitude"
                                    />

                                    <Form.Control 
                                    type="text" 
                                    className="form-control-sm" 
                                    id="lon" 
                                    name="lon"
                                    title="Longitude" 
                                    placeholder="Enter Longitude Coordinate"
                                    />
                                  <Button type="submit"  variant="primary" size="sm">Show Map for these coordinatese!</Button>
                                </Form>
                            </div>                            
                    </div>  
                    </div>                            
            </Container>
      </div> 

      {/* The div where OpenLayers renders the map */}
      <div ref={mapRef} style={{ width: '100%', height: '440px' }} />
      <hr></hr>
      <div><p class="dataShowSmall">{jsondata}</p> <p className="stealthBlack dataShowSmall">Found: {center}</p> </div>
    </div>
  );
};

export default MapComponent;
