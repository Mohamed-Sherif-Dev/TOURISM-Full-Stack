

// export default Touras

import { useEffect, useMemo, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import TourCard from "../components/TourCard";
import ToursFilterBar from "../components/ToursFilterBar";

const PAGE_LIMIT = 12;

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    difficulty: "",
    sort: "-createdAt",
  });

  // لما تتغير الفلاتر نرجّع لأول صفحة
  useEffect(() => { setPage(1); }, [filters.search, filters.difficulty, filters.sort]);

  const query = useMemo(() => ({
    page,
    limit: PAGE_LIMIT,
    // backend params:
    search: filters.search || undefined,
    difficulty: filters.difficulty || undefined,
    sort: filters.sort || undefined,
  }), [page, filters]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setErr("");

      const { url, method } = SummaryApi.getTours;
      const res = await Axios({ url, method, params: query });

      // توقّعات الريسبونس
      const data = res?.data || {};
      const list = data.tours || data.data || [];
      setTours(Array.isArray(list) ? list : []);
      const total = data.totalPages || Math.max(1, Math.ceil((data.totalCount || list.length) / PAGE_LIMIT));
      setTotalPages(total);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTours(); /* eslint-disable-next-line */ }, [page, query.search, query.difficulty, query.sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">All Tours</h1>
        <ToursFilterBar value={filters} onChange={setFilters} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
            <div key={i} className="h-96 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : err ? (
        <div className="rounded-lg border p-4 text-red-600 bg-red-50">{err}</div>
      ) : tours.length === 0 ? (
        <div className="rounded-lg border p-6 text-center text-gray-600">No results.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((t) => <TourCard key={t._id ?? t.id} tour={t} />)}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border px-3 py-1 disabled:opacity-50"
            >Prev</button>
            <span className="text-sm">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-md border px-3 py-1 disabled:opacity-50"
            >Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tours;