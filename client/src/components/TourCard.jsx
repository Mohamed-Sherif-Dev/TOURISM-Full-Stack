
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaFlag } from "react-icons/fa";

const fmtMonthYear = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "";

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const TourCard = ({ tour }) => {
  const {
    _id, id,
    name,
    imageCover,            // ex: "tour-2-cover.jpg"
    duration,
    maxGroupSize,
    difficulty,
    price,
    ratingsAverage,
    ratingsQuantity,
    startLocation,
    startDates = [],
    locations = [],
    summary
  } = tour || {};

  const tourId = _id ?? id;
  const firstDate = fmtMonthYear(startDates[0]);
  const stopsCount = locations.length;

  const coverSrc = imageCover ? `/img/tours/${imageCover}` : "";

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition">
      <div className="relative h-64 w-full">
        {coverSrc && (
          <img
            src={coverSrc}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(85,197,122,0.75),rgba(85,197,122,0.45),transparent_60%)]" />
        <h3 className="absolute bottom-2 left-3 right-3 text-white text-lg font-extrabold uppercase tracking-wide drop-shadow">
          {name}
        </h3>
      </div>

      <div className="px-5 pt-3 text-[12px] uppercase tracking-wide text-emerald-700 font-semibold">
        {difficulty} • {duration} day tour
      </div>

      {summary && (
        <p className="px-5 pt-1 text-[13px] text-gray-600 line-clamp-2">
          {summary}
        </p>
      )}

      <div className="px-5 grid grid-cols-2 py-3 space-y-2 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-emerald-600 shrink-0" />
          <span className="line-clamp-1">{startLocation?.description}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-emerald-600 shrink-0" />
          <span>{firstDate}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaFlag className="text-emerald-600 shrink-0" />
          <span>{plural(stopsCount, "stop", "stops")}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaUserFriends className="text-emerald-600 shrink-0" />
          <span>{plural(maxGroupSize ?? 0, "person", "people")}</span>
        </p>
      </div>

      <div className="mt-auto border-t px-5 py-3 flex items-center justify-between text-sm">
        <span className="font-semibold">
          ${price}{" "}
          <span className="text-gray-600 font-normal">per person</span>
        </span>
        <span className="text-gray-700">
          {Number(ratingsAverage || 0).toFixed(1)}{" "}
          <span className="text-gray-400">({ratingsQuantity || 0})</span>
        </span>
      </div>

      <div className="px-5 pb-5">
        <Link
          to={`/tours/${tourId}`}
          className="block w-full rounded-full bg-emerald-600 py-2 text-center font-semibold text-white hover:bg-emerald-700 transition"
        >
          DETAILS
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
