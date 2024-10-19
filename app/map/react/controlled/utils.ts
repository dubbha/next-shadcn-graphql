import bbox from "@turf/bbox";
import type { GeoJSONFeature, LngLatBoundsLike } from "mapbox-gl";

export const getBounds = (feature: GeoJSONFeature): LngLatBoundsLike => {
  const [minLng, minLat, maxLng, maxLat] = bbox(feature);
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};
