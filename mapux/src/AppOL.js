    import React, { useEffect, useRef, useState } from 'react';
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import MousePosition from 'ol/control/MousePosition';
    import { createStringXY } from 'ol/coordinate';
    import { defaults as defaultControls } from 'ol/control';
    import { fromLonLat } from 'ol/proj';
    import 'bootstrap/dist/css/bootstrap.min.css';  // from 'react-bootstrap';
    import { Container, FormControl, Form, Card, Button } from 'react-bootstrap';
    
    import 'ol/ol.css'; // Import OpenLayers CSS
    import './App.css';
    import ds from "./images/DeathStar.png";

    import OpenLayersMapComponent from './components/OLMapComponent'

    const MapForm = () => {

      function handleSubmit() {
      
        alert('Heading to ' + LondonCenter + '  - - currently at ' + address); 

        newCenter = LondonCenter; // has no effect, but at least it's being called with no page reload now
        /// will need to re-integrate OL into App.js instead of using OpenLayersMapComponent. See AppOL.js
        
      };
     
      const initialCenter = [-73.990, 40.75,]; // London coordinates (lon, lat)
      const lon = '-73.990';
      const lat = '40.75';
      const address = "New York City, NY";
      const initialZoom = 19; 
      let newCenter = initialCenter; 
      
      const LondonCenter = [.1276, 51.5072];
    
      let addr = 'New York City NY US';      

      return (
        <div style={{ width: '100%'}}>
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
                                        value={address}
                                        />   
                                    <Button type='submit' variant="primary" size="sm">Find Coordinates!</Button>
                                </div>  
                            </div>                            
                            <div className="col-sm-4">
                                <div>
                                      
                                      <label >Enter coordinates</label>
                                      <Form.Control 
                                        type="text" 
                                        className="form-control-sm" 
                                        id="XCoord" 
                                        title="X Coordinate" 
                                        placeholder="Enter X Coordinate"
                                        value={lat}
                                        // onChange={handleChange}
                                        />

                                        <Form.Control 
                                        type="text" 
                                        className="form-control-sm" 
                                        id="YCoord" 
                                        title="Y Coordinate" 
                                        placeholder="Enter Y Coordinate"
                                        value={lon}
                                        // onChange={handleChange}
                                        />
                                      <Button type="submit" onClick={handleSubmit} variant="primary" size="sm">Show!</Button>
                                </div>                            
                        </div>  
                        </div>                            
                </Container>
          </div>  
          <div style={{ width: '100%', height: '500px' }}>
            <OpenLayersMapComponent newCenterCoordinates={newCenter} />
          </div>
        </div>         
      );
    }

    export default MapForm;

