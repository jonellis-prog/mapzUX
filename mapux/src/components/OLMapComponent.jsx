import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import "../App.css";

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';

const OpenLayersMapComponent = ({ newCenterCoordinates, mapHeight }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [mouseCoordinates, setMouseCoordinates] = useState('');
  const defaultMapHeight = '440px';

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4), // Format coordinates to 4 decimal places
    projection: 'EPSG:4326', // Display coordinates in Lat/Lon
    className: 'custom-mouse-position', // Custom class for styling
    target: document.getElementById('mouse-position'), // Target element for display
    undefinedHTML: '&nbsp;', // What to display when mouse leaves map
  });

  if (!mapHeight) {
      mapHeight = defaultMapHeight;
  }
  // 1. Initialize the map once on component mount
  useEffect(() => {
    const map = new Map({
      controls: defaultControls().extend([mousePositionControl]),
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Initial center
        zoom: 11,
      }),
    });

    setMapInstance(map);

    return () => map.setTarget(undefined);
  }, []);

  // 2. Recenter the map when newCenterCoordinates prop changes
  useEffect(() => {
    if (!mapInstance || !newCenterCoordinates) return;

    const view = mapInstance.getView();
    // Transform coordinates from LonLat (EPSG:4326) to the map's projection (default EPSG:3857)
    const transformedCenter = fromLonLat(newCenterCoordinates);

    // Option A: Jump to the new center instantly
    // view.setCenter(transformedCenter);

    // Option B: Animate the movement to the new center
    view.animate({
      center: transformedCenter,
      duration: 2000, 
      zoom: 14, // You can also update the zoom level
    });
  }, [mapInstance, newCenterCoordinates]); // Depend on the map instance and the new coordinates

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: mapHeight }} >{mouseCoordinates}</div>
       
      <div id="mouse-position" className="mouse-position-display deep-inset" >        
          <p> --- <i>Notes go here</i>
          </p>  
      </div> 
    </div>

  );
};

export default OpenLayersMapComponent;
