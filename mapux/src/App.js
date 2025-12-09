import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, card, Col, FormControl} from 'react-bootstrap';
// import { MapContainer, TileLayer, Marker, Popup } from '../src/static/leaflet/leaflet-src2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import ds from "./images/DeathStar.png";


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

export default App;
