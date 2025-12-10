    import React, { useEffect, useRef, useState } from 'react';
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import MousePosition from 'ol/control/MousePosition';
    import { createStringXY } from 'ol/coordinate';
    import { defaults as defaultControls } from 'ol/control';
    import 'ol/ol.css'; // Import OpenLayers CSS

    const MapComponent = () => {
      const mapRef = useRef();
      const [mouseCoordinates, setMouseCoordinates] = useState('');

      useEffect(() => {
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
            center: [1,1],
            zoom: 13,
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
          <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
          <div id="mouse-position" className="mouse-position-display">
            Mouse Position: {mouseCoordinates}
          </div>
        </div>
      );
    };

    export default MapComponent;