// import logo from './logo.svg';

// import 'leaflet/dist/leaflet.css';

// import { MapContainer, TileLayer, Marker, Popup } from '../src/static/leaflet/leaflet-src2';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
/* import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, card, Col, FormControl} from 'react-bootstrap';


import './App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import {transform} from 'ol/proj.js';


// Add the MousePosition control


import ds from "./images/DeathStar.png";

function OpenLayer(props) {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {

        const initialMap = new Map({
        target: mapElement.current,
        layers: [
            new TileLayer({
            source: new OSM(),
            }),
        ],
        view: new View({
            // "lat":"","lon":""

            // 40.75° N, 75.16° W
            center: [39.954, -75.167],
            zoom: 30,
        }),
        });
        setMap(initialMap);

        
    }, []);

/*     const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4), // Format to 4 decimal places
    projection: 'EPSG:4326', // Display in Latitude/Longitude (WGS84)
    target: document.getElementById('myposition'), // Target HTML element ID
    undefinedHTML: 'Outside map area',
    });
    
    this.map.addControl(mousePositionControl); */

    return (
        <div>
  {/*           <div className="bg-dark min-vh-100">
                <br/>
                <Container className="bg-dark mt-12 tealtext">
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={ds} height="64px"></img>
                            <h3>DStar Maps</h3>
                        </div>
                        <div className = "col-sm-6">
                            
                                    <div>
                                        <label >Optional: Find coordinates of an address</label>
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
            </div> */}
            <div ref={mapElement} className="map-container" />  
        </div>
    );
}

export default OpenLayer;
 */

/* 



const MapComponent = () => {
  const position = [51.505, -0.09];
}
function App() {
  return (
    <div className="bg-dark min-vh-100">
        <br/>
        <Container className="bg-dark mt-12 tealtext">
                <div className="row">
                    <div className="col-sm-2">
                        <img src={ds} height="64px"></img>
                        <h3>DStar Maps</h3>
                    </div>
                    <div className = "col-sm-6">
                        
                                <div>
                                    <label >Optional: Find coordinates of an address</label>
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
        <main className='map-div'>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="leaflet-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" // Example tile provider URL
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>
        </main>

    </div>
  );
}

export default App; */
