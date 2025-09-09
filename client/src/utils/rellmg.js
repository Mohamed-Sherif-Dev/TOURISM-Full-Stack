const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * @param {string} p   
 * @param {"tour"|"user"|"auto"} 
 */
export const relImg = (p, kind = "auto") => {
  if (!p) return "";

  if (/^https?:\/\//i.test(p)) return p;

  if (p.startsWith("/img/")) return `${API}${p}`;

  // تحديد المجلد
  let folder = "tours";
  if (kind === "user") folder = "users";
  else if (kind === "tour") folder = "tours";
  else {
    folder = /user|avatar|profile/i.test(p) ? "users" : "tours";
  }

  return `${API}/img/${folder}/${p}`;
};