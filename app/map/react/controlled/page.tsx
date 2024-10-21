// https://visgl.github.io/react-map-gl/docs/get-started/state-management#controlled-map
// https://github.com/visgl/react-map-gl/blob/7.1-release/examples/get-started/controlled/app.jsx

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Map, {
  Marker,
  // Popup,
  Source,
  Layer,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  type ViewStateChangeEvent,
} from "react-map-gl";

import { Threebox, type LoadObjOptions } from "threebox-plugin";

import { geojson } from "./geojson";
import { getBounds } from "./utils";

import Pin from "../pin";
import Panel from "../panel";

import "mapbox-gl/dist/mapbox-gl.css";

const initLngLat = [54.32397, 24.46197];
const layerId = "geojson-fill";

// const overidePopupStyle =
//   "[&_.mapboxgl-popup-content]:bg-transparent [&_.mapboxgl-popup-content]:text-orange-500 [&_.mapboxgl-popup-content]:shadow-none [&_.mapboxgl-popup-tip]:hidden";

export default function MapReact() {
  const [viewState, setViewState] = useState({
    longitude: initLngLat[0],
    latitude: initLngLat[1],
    zoom: 10,
    pitch: 85,
    bearing: -72.5,
  });
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState<number>(0);
  const [animated, setAnimated] = useState(false);

  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    if (animated && mapRef.current) {
      const tb = new Threebox(
        mapRef.current,
        mapRef.current.getCanvas().getContext("webgl"),
        {
          defaultLights: true,
        },
      );
      window.tb = tb;
      mapRef.current.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (_map, _mbxContext) {
          const options: LoadObjOptions = {
            obj: `https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf`,
            type: "gltf",
            scale: 10,
            units: "meters",
            rotation: { x: 90, y: 0, z: 0 },
          };
          tb.loadObj(options, function (model) {
            const coords = [54.109869, 24.518809];
            tb.add(model.setCoords(coords));
          });
        },
        render: function (_gl, _matrix) {
          tb.update();
        },
      });
    }
  }, [animated]);

  const handleMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    setViewState(viewState);
  }, []);

  return (
    <Map
      {...viewState}
      onMove={handleMove}
      reuseMaps
      mapStyle="mapbox://styles/mapbox/dark-v11"
      // mapStyle="mapbox://styles/mapbox/light-v11"
      minZoom={6}
      maxZoom={30}
      maxBounds={[
        [51.706982, 22.458808],
        [56.40456, 26.385526],
      ]}
      antialias={true}
      interactiveLayerIds={[layerId]}
      onClick={({ target, features }) => {
        const feature = features?.[0];
        if (feature) {
          target.fitBounds(getBounds(feature), { padding: 40, duration: 1000 });
        }
      }}
      onMouseMove={(e) => {
        setCur(e.features?.[0]?.properties?.fieldId || 0);
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onLoad={(event) => {
        const map = (mapRef.current = event.target);
        map
          .zoomTo(16.2, {
            animate: true,
            duration: 4200,
            curve: 1.42,
          })
          .once("moveend", () => {
            map
              .flyTo({
                center: [54, 24.4],
                pitch: 0,
                bearing: 0,
                zoom: 9.5,
                duration: 4200,
                curve: 1.42,
              })
              .once("moveend", () => {
                setAnimated(true);
              });
          });
      }}
    >
      {/* {show && (
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
      )} */}
      <Panel />
      <FullscreenControl />
      <NavigationControl />
      <ScaleControl />
      {animated && (
        <>
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
          <Marker
            longitude={54.1}
            latitude={24.56}
            anchor="bottom"
            className="z-10"
          >
            <span
              onMouseOver={() => {
                console.log("mouseOver");
                setShow(true);
              }}
              onMouseOut={() => {
                console.log("mouseOut");
                setShow(false);
              }}
              className="z-10"
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
        </>
      )}
      <Layer
        type="fill-extrusion"
        id="add-3d-buildings"
        source="composite"
        source-layer="building"
        filter={["==", "extrude", "true"]}
        minzoom={15}
        paint={{
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        }}
      />
    </Map>
  );
}
