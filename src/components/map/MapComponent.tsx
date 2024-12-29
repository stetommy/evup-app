'use client';
import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent({ latitude, longitude, zoom = 14, width= 500, height= 400}) {
  return (
    <Map
      initialViewState={{
        latitude: latitude || 37.8, // Default latitude
        longitude: longitude || -122.4, // Default longitude
        zoom: zoom, // Default zoom
      }}
      style={{ width: width, height: height }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {/* Aggiungi un Marker sulle coordinate */}
      <Marker latitude={latitude || 37.8} longitude={longitude || -122.4}>
        <div style={{ backgroundColor: 'blue', borderRadius: '50%', width: '15px', height: '15px' }}></div>
      </Marker>
    </Map>
  );
}
