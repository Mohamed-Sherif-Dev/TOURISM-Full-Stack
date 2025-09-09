export const tourImgUrl = (file) => {
  if (!file) return "";
  return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/img/tours/${file}`;
};