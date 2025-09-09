import { useState } from "react";

const Stars = ({ value = 4 }) => (
  <div className="flex gap-0.5 text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i < value ? "" : "opacity-30"}`}>
        <path d="M10 1.6l2.3 4.7 5.2.8-3.7 3.7.9 5.2L10 13.9 5.3 16l.9-5.2L2.5 7.1l5.2-.8L10 1.6z" />
      </svg>
    ))}
  </div>
);

// fallback لو مفيش صورة
const Avatar = ({ src, name }) => {
  if (src) return <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover" />;
  const initials = (name || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-green-600 text-white grid place-items-center text-sm font-semibold">
      {initials}
    </div>
  );
};

export default function ReviewsDesignWithFilterAndPhotos() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  // بيانات ثابتة للتصميم + صور
  const reviews = [
    {
      id: 1,
      name: "Ayla Cornell",
      photo: "https://i.pravatar.cc/80?img=1",
      rating: 4,
      date: "May 2022",
      review: "Porttitor ullamcorper rutrum semper proin mus felis varius convallis.",
    },
    {
      id: 2,
      name: "Eliana Stout",
      photo: "https://i.pravatar.cc/80?img=5",
      rating: 5,
      date: "July 2023",
      review: "Sem Forest tempero vel vitae platea habitasse dolor suscipit.",
    },
    {
      id: 3,
      name: "Cristian Vega",
      photo: "https://i.pravatar.cc/80?img=11",
      rating: 2,
      date: "May 2022",
      review: "Varius potenti proin hendrerit felis at convallis nunc.",
    },
    {
      id: 4,
      name: "Nora Wynn",
      photo: "https://i.pravatar.cc/80?img=15",
      rating: 3,
      date: "Aug 2021",
      review: "Dictum posuere parturient euismod netus pretium nisl.",
    },
    {
      id: 5,
      name: "Samir Malik",
      photo: "", // جرّب بدون صورة لتشوف الـ fallback
      rating: 1,
      date: "Jan 2024",
      review: "Class auctor diam id fermentum penatibus gravida pharetra.",
    },
  ];

  const firstThree = reviews.slice(0, 3);
  const filtered = filter === "all" ? reviews : reviews.filter(r => r.rating === Number(filter));

  return (
    <section className="relative py-14">
      {/* خلفية خضرا ستايل Natours */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500 to-green-600 skew-y-[-3deg]" />

      <div className="container mx-auto px-4">
        <h2 className="text-white text-2xl font-semibold text-center mb-10">Reviews</h2>

        {/* الكروت المختصرة (بصور) */}
        <div className="grid gap-6 md:grid-cols-3">
          {firstThree.map((r) => (
            <article key={r.id} className="bg-white/95 rounded-xl shadow p-5 hover:-translate-y-0.5 transition">
              <div className="flex items-center gap-3">
                <Avatar src={r.photo} name={r.name} />
                <div>
                  <h4 className="font-semibold text-gray-900">{r.name.toUpperCase()}</h4>
                  <div className="text-xs text-gray-500">Tour Date: {r.date}</div>
                </div>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed line-clamp-3">{r.review}</p>
              <div className="mt-3 flex items-center justify-between">
                <Stars value={r.rating} />
                <span className="text-sm text-gray-500">{r.rating} / 5</span>
              </div>
            </article>
          ))}
        </div>

        {/* زر عرض الكل */}
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-green-700 shadow hover:bg-gray-100"
          >
            See All Reviews
          </button>
        </div>
      </div>

      {/* المودال مع فلترة + صور */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 mx-auto mt-20 w-[92vw] max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">All Reviews</h3>
              <select
                className="rounded border px-2 py-1 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* قائمة الريفيوهات كاملة (بصور) */}
            <div className="max-h-[55vh] overflow-y-auto space-y-5 pr-1">
              {filtered.length === 0 ? (
                <p className="text-gray-500">No reviews with this rating.</p>
              ) : (
                filtered.map((r) => (
                  <div key={r.id} className="border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={r.photo} name={r.name} />
                      <div>
                        <div className="font-semibold text-gray-900">{r.name}</div>
                        <div className="text-xs text-gray-500">{r.date}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{r.review}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Stars value={r.rating} />
                      <span className="text-sm text-gray-500">{r.rating} / 5</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 text-right">
              <button onClick={() => setOpen(false)} className="rounded bg-gray-800 px-4 py-1 text-sm text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}