import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, card, Col, FormControl} from 'react-bootstrap';

import ds from "./images/DeathStar.png";


function App() {
  return (
    <div className="bg-dark min-vh-100">
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
        </Container>

    </div>
  );
}

export default App;
