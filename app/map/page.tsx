"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

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
      maxZoom: 11,
      minZoom: 7,
      style: "mapbox://styles/mapbox/dark-v11",
    });

    const element = document.createElement("div");
    element.innerHTML = "Hey Im Marker";
    element.style.border = "1px solid red";

    new mapboxgl.Marker({
      element,
      color: "red",
    })
      .setLngLat([54.3773, 24.4539])
      .addTo(mapRef.current);
  });

  return (
    <div
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapboxExample;
