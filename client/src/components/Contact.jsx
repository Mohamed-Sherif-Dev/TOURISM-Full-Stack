// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "من فضلك املأ الحقول الإلزامية.";
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) return "صيغة البريد الإلكتروني غير صحيحة.";
    if (form.message.trim().length < 10) return "الرسالة قصيرة جدًا (حد أدنى 10 أحرف).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ loading: false, ok: false, msg: err });

    try {
      setStatus({ loading: true, ok: null, msg: "" });
      // عدّل المسار حسب الـ API عندك
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الإرسال، جرّب لاحقًا.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus({ loading: false, ok: true, msg: "تم استلام رسالتك بنجاح. سنعود إليك قريبًا." });
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "حدث خطأ غير متوقع." });
    }
  };

  return (
    <main dir="rtl" className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              يسعدنا تواصلك 🤝
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              تواصل معنا
            </h1>
            <p className="mt-3 text-lg leading-8 text-gray-600">
              سواء لديك سؤال، اقتراح، أو شراكة—احنا هنا لمساعدتك.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon="mail" title="البريد الإلكتروني" content="support@natours-v2.dev" href="mailto:support@natours-v2.dev" />
          <Card icon="whatsapp" title="واتساب" content="+20 100 000 0000" href="https://wa.me/201000000000" />
          <Card icon="location" title="الموقع" content="Cairo, Egypt" href="https://maps.google.com" />
        </div>
      </section>

      {/* Form + Map */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">أرسل رسالة</h2>
            <p className="mt-1 text-gray-600">املأ البيانات وسنرد عليك قريبًا.</p>

            {/* <form onSubmit={handleSubmit} className="mt-6 space-y-4 w-full">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">الاسم *</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="اكتب اسمك"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">البريد الإلكتروني *</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">الموضوع</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="عن ماذا تريد التحدث؟"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">الرسالة *</label>
                <textarea
                  rows="5"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="اكتب تفاصيل رسالتك..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {/* Status */}
              {status.msg && (
                <div
                  className={`rounded-lg px-4 py-2 text-sm ${
                    status.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {status.loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner /> جاري الإرسال...
                  </span>
                ) : (
                  "أرسل الرسالة"
                )}
              </button>

              <p className="text-xs text-gray-500">
                * بإرسال هذه الرسالة، فأنت توافق على التواصل معك بخصوص استفسارك.
              </p>
           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">الاسم *</label>
    <input
      type="text"
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
      placeholder="اكتب اسمك"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">البريد الإلكتروني *</label>
    <input
      type="email"
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
      placeholder="example@email.com"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">الموضوع</label>
    <input
      type="text"
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
      placeholder="عن ماذا تريد التحدث؟"
      value={form.subject}
      onChange={(e) => setForm({ ...form, subject: e.target.value })}
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">الرسالة *</label>
    <textarea
      rows="5"
      className="block w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
      placeholder="اكتب تفاصيل رسالتك..."
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
    />
  </div>
</form>
          </div>

          {/* Map + Hours */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex h-80 w-full items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                خريطة Mapbox هنا (ضع الـ Token في مكوّن الخريطة) — Placeholder
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">مواعيد العمل</h3>
              <ul className="mt-3 grid grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-center justify-between border-b pb-2">
                  <span>السبت – الخميس</span><span>10 صباحًا – 8 مساءً</span>
                </li>
                <li className="flex items-center justify-between border-b pb-2">
                  <span>الجمعة</span><span>إجازة</span>
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/faq" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-white">
                  الأسئلة الشائعة
                </a>
                <a href="tel:+201000000000" className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                  اتصل الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ====== Sub Components ====== */
function Card({ icon, title, content, href }) {
  const Icon = () => {
    if (icon === "mail")
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.4l-10 6.25L2 6.4V6zm0 3.2l9.5 5.94a1 1 0 001 0L22 9.2V18a2 2 0 01-2 2H4a2 2 0 01-2-2V9.2z" />
        </svg>
      );
    if (icon === "whatsapp")
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3.5A10.5 10.5 0 006.6 20.8L3 21l1-3.5A10.5 10.5 0 1020 3.5zm-5.6 13.3c-2.4 0-4.6-1-6.3-2.7a8.8 8.8 0 01-2-3.1 1.7 1.7 0 01.4-1.8l.6-.6c.3-.3.7-.3 1 0l1.6 1.6c.3.3.3.8 0 1.1l-.4.4c.3.7.8 1.4 1.3 2 1 .9 2.1 1.6 3.3 2 .3.1.6 0 .8-.2l.5-.5c.3-.3.8-.3 1.1 0l1.5 1.5c.3.3.3.8 0 1.1l-.6.6c-.4.4-.9.6-1.4.6z" />
        </svg>
      );
    if (icon === "location")
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
      );
    return null;
  };
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
      target="_blank" rel="noreferrer"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon />
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="font-semibold text-gray-900 group-hover:text-emerald-700">{content}</div>
      </div>
    </a>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}