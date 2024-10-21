"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Threebox, type LoadObjOptions } from "threebox-plugin";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [54.3773, 24.4539], // starting position [lng, lat]
      zoom: 9, // starting zoom
      maxZoom: 20,
      minZoom: 7,
      style: "mapbox://styles/mapbox/dark-v11",
    });

    const element = document.createElement("div");
    element.innerHTML = "Hey Im Marker";
    element.style.border = "1px solid red";
    element.onclick = function () {
      alert("me");
    };

    new mapboxgl.Marker({
      element,
      color: "red",
    })
      .setLngLat([54.3773, 24.4539])
      .addTo(mapRef.current);

    mapRef.current.on("style.load", () => {
      mapRef.current?.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function () {
          const tb = new Threebox(
            mapRef.current,
            mapRef.current?.getCanvas().getContext("webgl") ?? null,
            { defaultLights: true },
          );
          window.tb = tb;
          const scale = 50;
          const options: LoadObjOptions = {
            obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
            type: "gltf",
            scale: { x: scale, y: scale, z: scale * 0.23148 },
            units: "meters",
            rotation: { x: 90, y: -90, z: 0 },
          };
          tb.loadObj(options, (model) => {
            model.setCoords([54.109869, 24.518809]);
            model.setRotation({ x: 0, y: 0, z: 241 });
            tb.add(model);
          });
        },
        render: function () {
          window.tb.update();
        },
      });
    });
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapboxExample;
