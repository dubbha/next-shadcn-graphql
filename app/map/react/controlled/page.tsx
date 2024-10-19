// https://visgl.github.io/react-map-gl/docs/get-started/state-management#controlled-map
// https://github.com/visgl/react-map-gl/blob/7.1-release/examples/get-started/controlled/app.jsx

"use client";

import { useState, useCallback } from "react";
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  type ViewStateChangeEvent,
} from "react-map-gl";

import { geojson } from "./geojson";
import { getBounds } from "./utils";

import Pin from "../pin";
import Panel from "../panel";

import "mapbox-gl/dist/mapbox-gl.css";

const initLngLat = [54.3773, 24.4539];
const layerId = "geojson-fill";

const overidePopupStyle =
  "[&_.mapboxgl-popup-content]:bg-transparent [&_.mapboxgl-popup-content]:text-orange-500 [&_.mapboxgl-popup-content]:shadow-none [&_.mapboxgl-popup-tip]:hidden";

export default function MapReact() {
  const [viewState, setViewState] = useState({
    longitude: initLngLat[0],
    latitude: initLngLat[1],
    zoom: 9,
    pitch: 70,
    bearing: -60,
  });
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState<number>(0);

  const handleMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    setViewState(viewState);
  }, []);

  return (
    <Map
      {...viewState}
      reuseMaps
      onMove={handleMove}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      minZoom={6}
      maxZoom={16}
      maxBounds={[
        [51.706982, 22.458808],
        [56.40456, 26.385526],
      ]}
      interactiveLayerIds={[layerId]}
      onClick={({ target, features }) => {
        const feature = features?.[0];
        if (feature) {
          target.fitBounds(getBounds(feature), { padding: 40, duration: 1000 });
        }
      }}
      onMouseMove={({ features }) => {
        setCur(features?.[0]?.properties?.fieldId || 0);
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <Marker longitude={54.1} latitude={24.56} anchor="bottom">
        <span
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <span
            className="absolute left-[60px] top-[-30px] w-64 text-orange-500"
            style={{ visibility: show ? "visible" : "hidden" }}
          >
            Marker child absolutely positioned
            <Pin size={40} fill="steelblue" />
          </span>
          <Pin size={40} />
        </span>
      </Marker>
      {show && (
        <Popup
          longitude={54.1}
          latitude={24.56}
          anchor="top"
          closeButton={false}
          className={`w-64 ${overidePopupStyle}`}
        >
          Popup style overriden
          <Pin size={40} fill="steelblue" />
        </Popup>
      )}
      <Panel />
      <FullscreenControl />
      <NavigationControl />
      <ScaleControl />
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
