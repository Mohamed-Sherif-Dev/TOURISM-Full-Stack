
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { relImg } from "../utils/rellmg"
import "../styles/tours-details.css";
import imguser from "../../public/img/users/user-1.jpg"
import SummarySection from "../pages/SummarySection"
import AllReviews from "./TourMap";
import Reviews from "./TourMap";
import TourMap from "./TourMap";
export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  const mapRef = useRef(null);
  const mapbox = useRef(null);

  // fetch tour by id
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tours/${id}`);
        const data = await res.json();
        if (data?.tour) setTour(data.tour);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };
    fetchTour();
  }, [id]);

  // render map after tour loads
  useEffect(() => {
    if (!tour) return;

    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const locs = tour.locations || [];
    if (!token || !locs.length) return;

    mapboxgl.accessToken = token;

    if (!mapbox.current) {
      mapbox.current = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        scrollZoom: false,
      });
    }

    const map = mapbox.current;
    const bounds = new mapboxgl.LngLatBounds();

    locs.forEach((loc, i) => {
      const [lng, lat] = loc.coordinates || loc.location?.coordinates || [];
      if (typeof lng !== "number" || typeof lat !== "number") return;

      const el = document.createElement("div");
      el.className = "tour-marker";
      el.title = loc.description || `Stop ${i + 1}`;

      new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([lng, lat])
        .addTo(map);

      new mapboxgl.Popup({ offset: 30 })
        .setLngLat([lng, lat])
        .setHTML(
          `<p class="popup"><strong>Day ${loc.day || i + 1}:</strong> ${
            loc.description || ""
          }</p>`
        )
        .addTo(map);

      bounds.extend([lng, lat]);
    });

    map.fitBounds(bounds, {
      padding: { top: 80, bottom: 80, left: 50, right: 50 },
    });
  }, [tour]);

  if (!tour) return <p className="p-6">Loading...</p>;

  const {
    name = "",
    duration = 0,
    difficulty = "",
    maxGroupSize = 0,
    ratingsAverage = 0,
    startDates = [],
    summary = "",
    description = "",
    guides = [],
    images = [],
    imageCover = "",
    reviews = [], // 
    startLocation,
  } = tour || {};

  const coverSrc = relImg(imageCover || images[0], "tour");
  const gallery = images.map((f) => relImg(f, "tour"));
  const nextDateText =
    startDates.length > 0
      ? new Date(startDates[0]).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "—";

  return (
    <div className="tour-details">
      {/* ===== HERO ===== */}
      <section className="hero-cut">
        <img className="hero-cut__img" src={coverSrc} alt={name} />
        <div className="hero-cut__overlay" />
        <div className="hero-cut__center">
          <h1 className="hero-cut__title">{name}</h1>
          <div className="hero-cut__meta">
            <span>{duration} DAYS</span>
            <span>{startLocation?.description}</span>
          </div>
        </div>
      </section>

      {/* ===== ABOUT + FACTS + GUIDES (light slice) ===== */}
      <section className="slice slice--light">
        <div className="slice__inner">
          <div className="about-grid">
            <aside className="about-left">
              <h3 className="about-sub">QUICK FACTS</h3>
              <ul className="facts">
                <li>
                  <span>NEXT DATE</span>
                  <strong>{nextDateText}</strong>
                </li>
                <li>
                  <span>DIFFICULTY</span>
                  <strong>{difficulty}</strong>
                </li>
                <li>
                  <span>PARTICIPANTS</span>
                  <strong>{maxGroupSize}</strong>
                </li>
                <li>
                  <span>RATING</span>
                  <strong>{ratingsAverage} / 5</strong>
                </li>
              </ul>

              <h3 className="about-sub u-mt24">YOUR TOUR GUIDES</h3>
              <ul className="guides">
                {guides.map((g, i) => (
                  <li key={i} className="guide">
                    <img src={imguser} alt={g.name} />
                    <div>
                      <div className="guide__role">
                        {i === 0 ? "LEAD-GUIDE" : "TOUR-GUIDE"}
                      </div>
                      <div className="guide__name">{g.name}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <article className="about-right">
              <h2 className="about-title">ABOUT THE {name?.toUpperCase()}</h2>
              {summary && <p className="about-lead">{summary}</p>}
              {description && <p className="about-text">{description}</p>}
            </article>
          </div>
        </div>
      </section>

      {/* ===== GALLERY (angled row) ===== */}
      <section className="gallery-cut">
        <div className="gallery-cut__row">
          {gallery.slice(0, 3).map((src, i) => (
            <figure key={i}>
              <img src={src} alt={`g-${i}`} />
            </figure>
          ))}
        </div>
      </section>

      {/* /////////////////// */}
<TourMap
  style="light"
  locations={[
    { coordinates: [30.0444, 31.2357], description: "Cairo" },
    { coordinates: [29.9773, 31.1325], description: "Giza Pyramids" },
  ]}
/>
      {/* ===== REVIEWS (green slice) ===== */}
      <SummarySection />

      {/* ===== CTA (light slice + floating box) ===== */}
      <section className="slice slice--light">
        <div className="slice__inner cta">
          <div className="cta__box">
            <div className="cta__head">
              <div className="logo">N</div>
              <div>
                <h4>WHAT ARE YOU WAITING FOR?</h4>
                <p>{duration} days. 1 adventure. Make it yours today!</p>
              </div>
            </div>
            <div className="cta__grid">
              <div className="cta__cell">
                <div className="cta__label">AVAILABLE DATES</div>
                <ul className="cta__dates">
                  {startDates.map((d, i) => (
                    <li key={i}>{new Date(d).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
              <div className="cta__cell">
                <div className="cta__label">TICKETS AVAILABLE</div>
                <div className="cta__badge">{maxGroupSize}</div>
              </div>
              <div className="cta__cell">
                <div className="cta__label">CHOOSE DATE</div>
                <select className="cta__select">
                  {startDates.map((d, i) => (
                    <option key={i} value={d}>
                      {new Date(d).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="cta__actions">
              <button className="btn-danger">CANCEL</button>
              <button className="btn-success">BOOK</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}