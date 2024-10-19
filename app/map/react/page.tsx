"use client";

import { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { Polygon, Position } from "geojson";

import geojson from "../../../public/data/field.json";

import Pin from "./pin";
import Panel from "./panel";

import "mapbox-gl/dist/mapbox-gl.css";

const getBounds = (
  coordinates: Position[],
): [number, number, number, number] => {
  if (!coordinates.length) return [0, 0, 0, 0];

  const [first, ...rest] = coordinates;

  let minLng = first[0];
  let maxLng = first[0];
  let minLat = first[1];
  let maxLat = first[1];

  rest.slice(1).forEach(([lng, lat]) => {
    if (minLng === undefined || lng < minLng) minLng = lng;
    if (maxLng === undefined || lng > maxLng) maxLng = lng;
    if (minLat === undefined || lat < minLat) minLat = lat;
    if (maxLat === undefined || lat > maxLat) maxLat = lat;
  });

  return [minLng, minLat, maxLng, maxLat];
};

const layerId = "geojson-fill";

export default function MapReact() {
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState<number>(0);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 54.3773,
        latitude: 24.4539,
        zoom: 9,
        pitch: 70,
        bearing: -60,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      minZoom={6}
      maxZoom={16}
      interactiveLayerIds={[layerId]}
      onClick={({ target, features }) => {
        const feature = features?.[0];
        if (feature) {
          // const { fieldId, markerLng, markerLat } = features[0].properties;
          //target.flyTo({ center: [markerLng, markerLat], zoom: 11, pitch: 0, speed: 0.6 });
          target.fitBounds(
            getBounds((feature.geometry as Polygon).coordinates[0]),
          );
        }
      }}
      onMouseMove={({ features }) => {
        setCur(features?.[0]?.properties?.fieldId || 0);
      }}
    >
      <Marker longitude={54.1} latitude={24.56} anchor="bottom">
        <span
          onMouseOver={() => {
            setShow(true);
          }}
        >
          <span
            className="absolute top-[-20px] text-orange-500"
            style={{ visibility: show ? "visible" : "hidden" }}
          >
            absolute
          </span>
          <Pin size={40} />
        </span>
      </Marker>
      <Panel />
      <Source id="field" type="geojson" data={geojson}>
        <Layer
          type="fill"
          id={layerId}
          paint={{
            "fill-color": [
              "match",
              ["get", "fieldId"],
              cur,
              "orange",
              "steelblue",
            ],
            "fill-opacity": 0.3,
          }}
        />
      </Source>
    </Map>
  );
}
