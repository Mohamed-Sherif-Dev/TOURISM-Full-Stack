// 


import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// fix للماركرات
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component صغير بيعمل fitBounds أوتوماتيك
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations.length) return;
    const bounds = L.latLngBounds(locations.map(loc => loc.coordinates));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations, map]);

  return null;
}

export default function TourMap({ locations = [], style = "light" }) {
  if (!locations.length) {
    locations = [{ coordinates: [30.0444, 31.2357], description: "Cairo" }];
  }

  const tileLayers = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  const center = locations[0].coordinates;

  return (
    <div className="mt-6">
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "420px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url={tileLayers[style]} />
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.coordinates}>
            <Popup>{loc.description || "Location"}</Popup>
          </Marker>
        ))}
        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
}