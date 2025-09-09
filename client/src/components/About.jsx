// src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Tours متاحة", value: "120+" },
    { label: "عملاء سعداء", value: "4.9★" },
    { label: "مدن مُغطّاة", value: "35" },
    { label: "شركاء محليين", value: "60+" },
  ];

  const values = [
    {
      title: "تجربة سهلة وسريعة",
      desc: "بحث وفلترة ذكية حسب السعر، الصعوبة، التقييم، والشهر. كل ده في ثواني.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M10 2a8 8 0 015.292 13.708l4 4-1.414 1.414-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
        </svg>
      ),
    },
    {
      title: "أمان وحسابات موثوقه",
      desc: "تسجيل/دخول، تأكيد بريد ونسيت كلمة السر، Tokens آمنة وصلاحيات Admin/User.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 016 0v3H9z"/>
        </svg>
      ),
    },
    {
      title: "مراجعات وصور حقيقية",
      desc: "عرض وتصفية المراجعات (نجمتين/ثلاثة…)، ودعم الصور من العملاء.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2H4z"/>
        </svg>
      ),
    },
    {
      title: "خريطة تفاعلية",
      desc: "Mapbox لعرض مواقع التجمع والانطلاق بشكل واضح وسهل.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M20.5 3l-5.5 2-6-2-5.5 2v16l5.5-2 6 2 5.5-2V3zm-11 1.618l4 1.333v13.431l-4-1.333V4.618zM6 5.882l2.5-.909v13.789L6 19.67V5.882zM18 18.118l-2.5.909V5.238L18 4.33v13.788z"/>
        </svg>
      ),
    },
    {
      title: "سلة (قريبًا)",
      desc: "إضافة للجولات في كارت واحد مع مراجعة الحجز والدفع لاحقًا.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M7 18a2 2 0 11.001 3.999A2 2 0 017 18zm10 0a2 2 0 11.001 3.999A2 2 0 0117 18zM6.2 5l.8 2h11l-2 7H8L6.2 5zM4 3h3l1 3h11a1 1 0 01.96 1.274l-2.5 8A2 2 0 0115.5 17h-7a2 2 0 01-1.94-1.474L4.06 4.553A1 1 0 014 4V3z"/>
        </svg>
      ),
    },
    {
      title: "لوحة تحكم Admin",
      desc: "إدارة الجولات والمستخدمين والمراجعات، مع صلاحيات واضحة.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2l9 4v6c0 5-3.8 9.7-9 10-5.2-.3-9-5-9-10V6l9-4zm0 2.2L5 6.9v4.9c0 4.2 3 8 7 8.3 4-.3 7-4.1 7-8.3V6.9l-7-2.7zM12 7a3 3 0 11.001 6.001A3 3 0 0112 7z"/>
        </svg>
      ),
    },
  ];

  const timeline = [
    { date: "Q3 2025", title: "إطلاق النسخة الأساسية", text: "صفحات التورز، تفاصيل الجولة، تسجيل/دخول، بروفايل وصلاحيات." },
    { date: "Q4 2025", title: "المراجعات والفلاتر", text: "فلترة بالتقييم (2★/3★/…)، رفع صور من العملاء، تحسين تجربة UX." },
    { date: "Q4 2025", title: "الكارت والدفع", text: "سلة الحجز، مراجعة الطلب، وخيارات دفع لاحقة." },
    { date: "Q1 2026", title: "تطبيق موبايل", text: "نسخة React Native مع نفس الـ API." },
  ];

  const team = [
    {
      name: "Mohammed Sherif",
      role: "Full-Stack Engineer",
      bio: "بنشتغل على MERN Stack: API آمنة، واجهة React سريعة، وتجربة مستخدم واضحة.",
      img: "https://ui-avatars.com/api/?name=Mohammed+Sherif&background=22443c&color=fff",
    },
  ];

  const faqs = [
    {
      q: "هل أقدر أفلتر الجولات حسب السعر والتقييم؟",
      a: "أيوه، عندنا فلترة حسب السعر، الصعوبة، التقييم، والشهر — مع بحث سريع.",
    },
    {
      q: "إزاي بحمي حسابي؟",
      a: "في تأكيد بريد، إعادة تعيين كلمة السر، وTokens آمنة مع صلاحيات Admin/User.",
    },
    {
      q: "هل في خريطة للمسار؟",
      a: "أيوه، بنعرض نقاط الانطلاق والتوقف عبر Mapbox بشكل تفاعلي.",
    },
    {
      q: "إمتى هتتوفر السلة (Cart)؟",
      a: "شغّالين عليها — المرحلة الجاية تشمل إضافة للجولة وسلة موحّدة قبل الدفع.",
    },
  ];

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Natours v2 — MERN Stack
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              عن منصّتنا
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              منصّة سياحية حديثة لاكتشاف أفضل الجولات، مع تجربة استخدام سريعة، آمنة،
              ومبنية على <span className="font-semibold text-emerald-700">MERN</span>.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                to="/tours"
                className="rounded-md bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
              >
                تصفّح الجولات
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-white"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white p-8 shadow-sm sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values / Features */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">ليه تختارنا؟</h2>
        <p className="mt-2 max-w-3xl text-gray-600">
          بنبني المنتج حوالين اللي احتجناه فعلاً: سرعة، وضوح، وأمان — مع ميّزات عملية للمستخدم والإدمن.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-emerald-50 p-3 text-emerald-700">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-1 text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story / Tech */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">قصة البناء والتقنيات</h2>
            <p className="mt-3 text-gray-600">
              بدأنا من فكرة بسيطة: تبسيط حجز الجولات. استخدمنا <b>Node.js + Express + MongoDB</b> للـ API
              و<b>React + Vite + Tailwind</b> للواجهة. أضفنا حماية للجلسات وRefresh Tokens، وبروفايل يوضح هل المستخدم Admin
              ولا User، مع رفع صور للمراجعات ودعم Mapbox للخرائط.
            </p>
            <ul className="mt-4 list-disc ps-5 text-gray-600 space-y-2">
              <li>REST API نظيفة مع فلاتر Query قوية.</li>
              <li>مصادقة JWT + إعادة تعيين كلمة المرور عبر البريد.</li>
              <li>UI سريع بإدارة حالة خفيفة (أو Redux Toolkit لو حبيت).</li>
              <li>تكامل Mapbox لعرض المواقع ونقاط الاهتمام.</li>
            </ul>
            <div className="mt-6">
              <Link to="/docs" className="text-emerald-700 font-medium hover:underline">
                اقرأ المزيد في التوثيق →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
              <p className="font-semibold">الموديولات الجاهزة في المشروع:</p>
              <ul className="mt-2 space-y-1">
                <li>✅ Auth: Register / Login / Verify Email / Forgot Password</li>
                <li>✅ Profile: صورة + صلاحيات (Admin/User)</li>
                <li>✅ Tours: قائمة + تفاصيل + خرائط</li>
                <li>✅ Reviews: إضافة/عرض/فلترة + صور</li>
                <li>🛒 Cart: قريبًا</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Roadmap */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">خارطة الطريق</h2>
        <div className="mt-6 space-y-6">
          {timeline.map((t, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm text-gray-500">{t.date}</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">{t.title}</div>
              <p className="mt-1 text-gray-600">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">الفريق</h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            بناء وتمفيذ كامل: من استراتيجية البراند للواجهة والتطوير الخلفي—بقيادة مُطوّر واحد مُصمم على الجودة والتفاصيل.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <img
                  alt={m.name}
                  src={m.img}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                  loading="lazy"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{m.name}</h3>
                <div className="text-emerald-700 text-sm font-medium">{m.role}</div>
                <p className="mt-2 text-gray-600">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-2xl bg-emerald-600 px-6 py-10 text-white">
          <h2 className="text-2xl font-bold">جاهز تبدأ رحلتك؟</h2>
          <p className="mt-2 text-emerald-50">اختَر جولتك المفضّلة واحجزها في دقائق.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/tours" className="rounded-md bg-white px-5 py-3 font-medium text-emerald-700 hover:bg-emerald-50">
              اكتشف الجولات
            </Link>
            <Link to="/login" className="rounded-md border border-white/40 px-5 py-3 font-medium text-white hover:bg-emerald-700">
              سجّل الدخول
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">الأسئلة الشائعة</h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
            {faqs.map((f, idx) => (
              <details key={idx} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.96a.75.75 0 111.1 1.02l-4.25 4.53a.75.75 0 01-1.1 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
                    </svg>
                  </span>
                </summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Map placeholder */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">مقرّنا والتواصل</h3>
            <p className="mt-2 text-gray-600">
              نسعد باستفساراتك. راسلنا لأي تعاون أو اقتراح جولة جديدة.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>📧 support@natours-v2.dev</li>
              <li>📍 Cairo, Egypt</li>
              <li>🕑 يوميًا 10 ص — 8 م</li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="text-emerald-700 font-medium hover:underline">
                نموذج التواصل →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-3">
            <div className="flex h-72 w-full items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              خريطة Mapbox هنا (Token مطلوب) — مبدئيًا Placeholder
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}