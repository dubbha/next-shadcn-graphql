import "mapbox-gl/dist/mapbox-gl.css";

export default function Tool() {
  return (
    <div
      // override from here
      className="mapboxgl-popup mapboxgl-popup-anchor-top bg-slate-600 p-6 [&_*]:!bg-transparent [&_.mapboxgl-popup-content]:text-orange-500 [&_.mapboxgl-popup-content]:shadow-none [&_.mapboxgl-popup-tip]:hidden"
      style={{
        maxWidth: "240px",
        transform: "translate(-50%, 0px) translate(356px, 379px",
      }}
    >
      <div className="mapboxgl-popup-tip"></div>
      <div className="mapboxgl-popup-content">
        <div>
          <h1>Popup</h1>
          <div>content</div>
        </div>
      </div>
    </div>
  );
}
