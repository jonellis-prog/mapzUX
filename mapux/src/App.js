    import React, { useEffect, useRef, useState } from 'react';
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import { fromLonLat } from 'ol/proj';
    import MousePosition from 'ol/control/MousePosition';
    import { createStringXY } from 'ol/coordinate';
    import { defaults as defaultControls } from 'ol/control';
    import 'bootstrap/dist/css/bootstrap.min.css'; 
    import { Container, FormControl, Form, Card, Button, DropdownButton, DropdownItem, Dropdown } from 'react-bootstrap'
    import 'ol/ol.css'; // Import OpenLayers CSS
    import './App.css';
    import ds from "./images/DeathStar.png";

    const MapComponent = () => {
      
      const mapRef = useRef();    
      
      const initialCenter = [-73.990, 40.75];
      let newCenter = initialCenter; 
      const LondonCenter = [.1276, 51.5072];
      const STLCenter = [ -90.1994, 38.6270,];
      const initCoord = [-90.197, 38.627];

      useEffect(() => {

        const map = new Map({
          controls: defaultControls(),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat(initCoord),
            zoom: 14,
          }),
          target: mapRef.current,
        });

        return () => map.setTarget(undefined); // Cleanup on component unmount
      }, []); 

      return (
        <div>
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
                                          //onChange={handleChangeAddress}
                                          />   
                                      <Button type='submit' variant="primary" size="sm" title='Future Use'>Find Coordinates!</Button>
                                      <DropdownButton id="dropdown-basic-button" variant="info" title="Favorite Destinations">
                                        <Dropdown.Item >London</Dropdown.Item>
                                        <Dropdown.Item >New York City</Dropdown.Item>
                                        <Dropdown.Item >Saint Louis</Dropdown.Item>
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
                                          //onChange={handleChangeLat}
                                          />

                                          <Form.Control 
                                          type="text" 
                                          className="form-control-sm" 
                                          id="lon" 
                                          title="Longitude" 
                                          placeholder="Enter Longitude Coordinate"
                                          //onChange={handleChangeLon}
                                          />
                                        <Button type="button"  variant="primary" size="sm">Show Map for these coordinatese!</Button>
                                  </div>                            
                          </div>  
                          </div>                            
                  </Container>
            </div>  
          </div>
          <div>
            <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
          </div> 
        </div>
      );
    };

    export default MapComponent;