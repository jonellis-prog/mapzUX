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

    function MapForm()  {
      const [inputAddress, setInputAddress] = useState('');
      const [inputX, setInputX] = useState('');
      const [inputY, setInputY] = useState('');

      const mapRef = useRef();
      const mapContainerRef = useRef(null); // To hold the map container
      const [mouseCoordinates, setMouseCoordinates] = useState('');

      // useEffect(() => {
        const initialCenter = [-73.990, 40.75,]; // London coordinates (lon, lat)
        const initialZoom = 13;


      const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4), // Format coordinates to 4 decimal places
        projection: 'EPSG:4326', // Display coordinates in Lat/Lon
        className: 'custom-mouse-position', // Custom class for styling
        target: document.getElementById('mouse-position'), // Target element for display
        undefinedHTML: '&nbsp;', // What to display when mouse leaves map
      });
      //  }));

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


/*         const goToXY = (e) => {
          e.preventDefault();       
          console.log("Form submitted!");
          map.setView(new View({
          center: [inputX, inputY],
          zoom: map.getView().getZoom() // Keep current zoom or set new
          }))
        };  */

      
        const [formData, setFormData] = useState({          
          lat: '-73.990',
          lon: '40.75',
          address: ''
        });

        const handleChange = (e) => {
          console.log('address changes input');
          setFormData({
            ...formData,
            [e.target.address]: e.target.value,
          }); 
        }; 

        const handleSubmit = (e) => {
          e.preventDefault(); // Prevents the default page reload
          console.log('Form data submitted:', formData);
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
          //map.getView().setCenter([formData.lat, formData.lon]);

/*           map.animate(new View({
            center: [formData.lat,formData.lon],
            zoom: map.getView().getZoom()
          }));  */
          //map.View({center:[formData.lat,formData.lon], zoom:13 });
          
          // map.setTarget({center:[formData.lat,formData.lon], zoom:13 });
          console.log('Map should be rendered');
          // Add your form submission logic here (e.g., API call, validation)
          // fetch('/api/submit', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(formData),
          // });
        };
      
      

        // Update React state for external display if needed
/*         map.on('pointermove', (event) => {
          const coordinates = map.getEventCoordinate(event.originalEvent);
          const transformedCoordinates = createStringXY(4)(coordinates);
          setMouseCoordinates(transformedCoordinates);
        });

        return () => map.setTarget(undefined); // Cleanup on component unmount
      ; */

      return (
        <div style={{ width: '100%'}}>
          <div style={{ width: '100%'}}>
                <Container className="bg-dark mt-12 tealtext">
                        <Form onSubmit={handleSubmit}> 
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
                                        value={formData.address}
                                        onChange={handleChange}/>   
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
                                        value={formData.lat}
                                        // onChange={handleChange}
                                        />

                                        <Form.Control 
                                        type="text" 
                                        className="form-control-sm" 
                                        id="YCoord" 
                                        title="Y Coordinate" 
                                        placeholder="Enter Y Coordinate"
                                        value={formData.lon}
                                        // onChange={handleChange}
                                        />
                                      <Button type="submit" variant="primary" size="sm">Show!</Button>
                                </div>                            
                        </div>  
                        </div>
                        </Form>                             
                </Container>
          </div>  
          <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
          <div id="mouse-position" className="mouse-position-display">
            Mouse Position: {mouseCoordinates}
          </div>
          <div>
            <hr></hr>
            <span>
              Form Inputs: {inputX}, {inputY}
            </span>
          </div>
        </div>
      );
    };


    export default MapForm;