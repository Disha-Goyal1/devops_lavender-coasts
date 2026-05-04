// Centralized brand & contact config — edit these to update across the whole site.
export const BRAND = {
  name: "Lavender Coast",
  tagline: "Soft Threads, Coastal Dreams",
  hero: "Handmade with Love, Inspired by the Coast",
  whatsappNumber: "+916200391201", // WhatsApp number (international format)
  upiId: "6200391201@upi",
  upiPayeeName: "Lavender Coast",
  instagram: "https://www.instagram.com/the_lavender_coast",
  email: "hello@lavendercoast.shop",
};

export const whatsappLink = (message?: string) => {
  const num = BRAND.whatsappNumber.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
};

export const upiUri = (amount?: number, note?: string) => {
  const params = new URLSearchParams({
    pa: BRAND.upiId,
    pn: BRAND.upiPayeeName,
    cu: "INR",
  });
  if (amount && amount > 0) params.set("am", amount.toFixed(2));
  if (note) params.set("tn", note);
  return `upi://pay?${params.toString()}`;
};
