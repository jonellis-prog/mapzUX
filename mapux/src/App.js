    import React, { useEffect, useRef, useState } from 'react';
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import MousePosition from 'ol/control/MousePosition';
    import { createStringXY } from 'ol/coordinate';
    import { defaults as defaultControls } from 'ol/control';
    import { fromLonLat } from 'ol/proj';
    import 'bootstrap/dist/css/bootstrap.min.css';  // from 'react-bootstrap';
    import { Container, FormControl, Form, Card, Button, DropdownButton, DropdownItem, Dropdown } from 'react-bootstrap';
    
    import 'ol/ol.css'; // Import OpenLayers CSS
    import './App.css';
    import ds from "./images/DeathStar.png";

    const MapForm = () => {

      function handleSubmit() {              
        setNewCenterCoordinates(LondonCenter); 
      };

      function handleSubmitNYC() {    
        setNewCenterCoordinates(initialCenter); 
      };

       function handleSubmitSTL() {
        setNewCenterCoordinates(STLCenter); 
      };

      function handleChangeAddress() {
      
      };

      function handleChangeLat() {

      };

      function handleChangeLon() {
      
      };


      const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = '/src/deathstr.ico';
      document.getElementsByTagName('head')[0].appendChild(link)
      
      const initialCenter = [-73.990, 40.75]; // London coordinates (lon, lat)

      const initialZoom = 15; 
      let newCenter = initialCenter; 
      
      const LondonCenter = [.1276, 51.5072];
      const STLCenter = [ -90.1994, 38.6270,];
        
      let addr = 'New York City NY US'; 
      const mapRef = useRef(null);
      const [mapInstance, setMapInstance] = useState(null);
      let [newCenterCoordinates, setNewCenterCoordinates] = useState(null)

      const [mouseCoordinates, setMouseCoordinates] = useState('');
      const defaultMapHeight = '440px';

      const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4), // Format coordinates to 4 decimal places
        projection: 'EPSG:4326', // Display coordinates in Lat/Lon
        className: 'custom-mouse-position', // Custom class for styling
        target: document.getElementById('mouse-position'), // Target element for display
        undefinedHTML: '&nbsp;', // What to display when mouse leaves map
      });

      useEffect(() => {
        const mousePositionControl = new MousePosition({
          coordinateFormat: createStringXY(4), // Format coordinates to 4 decimal places
          projection: 'EPSG:4326', // Display coordinates in Lat/Lon
          className: 'custom-mouse-position', // Custom class for styling
          target: document.getElementById('mouse-position'), // Target element for display
          undefinedHTML: '&nbsp;', // What to display when mouse leaves map
        });

        const map = new Map({
          controls: defaultControls(), // .extend([mousePositionControl]),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: initialCenter,
            zoom: 2,
          }),
          target: mapRef.current,
        });

        // Update React state for external display if needed
 /*        map.on('pointermove', (event) => {
          const coordinates = map.getEventCoordinate(event.originalEvent);
          const transformedCoordinates = createStringXY(4)(coordinates);
          setMouseCoordinates(transformedCoordinates);
        }); */

        return () => map.setTarget(undefined); // Cleanup on component unmount
      }, []);


      // 2. Recenter the map when newCenterCoordinates prop changes
      useEffect(() => {
        if (!mapInstance || !newCenterCoordinates) return;

        const view = mapInstance.getView();
        // Transform coordinates from LonLat (EPSG:4326) to the map's projection (default EPSG:3857)
        const transformedCenter = fromLonLat(newCenterCoordinates);
        view.animate({
          center: transformedCenter,
          duration: 2000, 
          zoom: 12, // You can also update the zoom level
        });
      }, [mapInstance, newCenterCoordinates]); // Depend on the map instance and the new coordinates

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
                                        />   
                                    <Button type='submit' variant="primary" size="sm" title='Future Use'>Find Coordinates!</Button>
                                    <DropdownButton id="dropdown-basic-button" variant="info" title="Favorite Destinations">
                                      <Dropdown.Item onClick={handleSubmit}>London</Dropdown.Item>
                                      <Dropdown.Item onClick={handleSubmitNYC}>New York City</Dropdown.Item>
                                      <Dropdown.Item onClick={handleSubmitSTL}>Saint Louis</Dropdown.Item>
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
              <div>
                <div ref={mapRef} style={{ width: "100%", height: defaultMapHeight }} ></div>
                
                <div id="mouse-info" className="deep-inset" >        
                    <p> --- info<i></i></p>         
                </div> 
              </div>


        </div>         
      );
    }

    export default MapForm;

