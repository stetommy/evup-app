'use client';

import React, { useRef, useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

export default function MapFullEventComponent({ events = [], zoom = 14 }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Ref per preservare lo stato della mappa
  const mapState = useRef({
    latitude: 46.213237, // Coordinate di default
    longitude: 11.117167,
    zoom: zoom,
  });

  // Aggiorna le coordinate iniziali solo al primo caricamento
  useEffect(() => {
    if (events.length > 0 && events[0]?.coordinates?.latitude && events[0]?.coordinates?.longitude) {
      mapState.current = {
        latitude: events[0].coordinates.latitude,
        longitude: events[0].coordinates.longitude,
        zoom: zoom,
      };
    }
  }, [events, zoom]);

  return (
    <Map
      initialViewState={{
        latitude: mapState.current.latitude,
        longitude: mapState.current.longitude,
        zoom: mapState.current.zoom,
      }}
      style={{ width: '100%', height: '600px' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMove={(event) => {
        // Salva lo stato corrente della mappa
        const { latitude, longitude, zoom } = event.viewState;
        mapState.current = { latitude, longitude, zoom };
      }}
    >
      {events.map((event, index) => {
        // Verifica che l'evento abbia coordinate valide
        const hasValidCoordinates =
          event?.coordinates &&
          typeof event.coordinates.latitude === 'number' &&
          typeof event.coordinates.longitude === 'number';

        if (!hasValidCoordinates) {
          console.warn(`Skipping event ${event?.title || 'Unnamed'} due to invalid coordinates.`);
          return null;
        }

        const { latitude, longitude } = event.coordinates;

        return (
          <Marker
            key={event._id || index}
            latitude={latitude}
            longitude={longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedEvent(event);
            }}
          >
            {/* Simple custom marker */}
            <div style={{ backgroundColor: 'blue', borderRadius: '50%', width: '10px', height: '10px' }}></div>
          </Marker>
        );
      })}

      {selectedEvent && (
        <Popup
          latitude={selectedEvent.coordinates.latitude}
          longitude={selectedEvent.coordinates.longitude}
          onClose={() => setSelectedEvent(null)}
          closeOnClick={false}
        >
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description || 'No description available'}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
