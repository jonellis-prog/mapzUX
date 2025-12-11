import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const OpenLayersMapComponent = ({ newCenterCoordinates }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  // 1. Initialize the map once on component mount
  useEffect(() => {
    const map = new Map({
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
      duration: 2000, // Animation duration in milliseconds
      zoom: 10, // You can also update the zoom level
    });
  }, [mapInstance, newCenterCoordinates]); // Depend on the map instance and the new coordinates

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default OpenLayersMapComponent;
