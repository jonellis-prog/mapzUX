    import React, { useEffect, useRef, useState } from 'react';
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import MousePosition from 'ol/control/MousePosition';
    import { createStringXY } from 'ol/coordinate';
    import { defaults as defaultControls } from 'ol/control';
    import { fromLonLat } from 'ol/proj';
    import 'bootstrap/dist/css/bootstrap.min.css';  // from 'react-bootstrap';
    import { Container, FormControl, Card, Button } from 'react-bootstrap';
    
    import 'ol/ol.css'; // Import OpenLayers CSS
    import './App.css';
    import ds from "./images/DeathStar.png";

    const MapComponent = () => {
      const mapRef = useRef();
      const [mouseCoordinates, setMouseCoordinates] = useState('');

      useEffect(() => {
        const initialCenter = [-73.990, 40.75,]; // London coordinates (lon, lat)
        const initialZoom = 13;


        const mousePositionControl = new MousePosition({
          coordinateFormat: createStringXY(4), // Format coordinates to 4 decimal places
          projection: 'EPSG:4326', // Display coordinates in Lat/Lon
          className: 'custom-mouse-position', // Custom class for styling
          target: document.getElementById('mouse-position'), // Target element for display
          undefinedHTML: '&nbsp;', // What to display when mouse leaves map
        });

        const map = new Map({

          
          controls: defaultControls().extend([mousePositionControl]),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat(initialCenter),
            zoom: initialZoom,
          }),
          target: mapRef.current,
        });

        // Update React state for external display if needed
        map.on('pointermove', (event) => {
          const coordinates = map.getEventCoordinate(event.originalEvent);
          const transformedCoordinates = createStringXY(4)(coordinates);
          setMouseCoordinates(transformedCoordinates);
        });

        return () => map.setTarget(undefined); // Cleanup on component unmount
      }, []);

      return (
        <div>
          <div style={{ width: '100%'}}>
                <Container className="bg-dark mt-12 tealtext">
                        <div className="row">
                            <div className="col-sm-2">
                                <img src={ds} height="64px"></img>
                                <h3>DStar Maps</h3>
                            </div>
                            <div className = "col-sm-6">
                                
                                        <div>
                                            <label class="navteal">Optional: Find coordinates of an address</label>
                                            <FormControl type="text" className="form-control-sm" />
                                            <Button variant="primary" size="sm">Find Coordinates!</Button>
                                        </div>  
                            </div>                            
                            <div class="col-sm-4">
                                <div>
                                    <label >Enter coordinates</label>
                                    <FormControl type="text" className="form-control-sm" id="XCoord" title="X Coordinate" />
                                    <FormControl type="text" className="form-control-sm" id="YCoord" title="Y coordinate" />
                                    <Button variant="primary" size="sm">Show!</Button>
                                </div>
                            </div>
                        </div>  
                        <br />                                
                </Container>
            </div>  
          <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
          <div id="mouse-position" className="mouse-position-display">
            Mouse Position: {mouseCoordinates}
          </div>
        </div>
      );
    };


    export default MapComponent;