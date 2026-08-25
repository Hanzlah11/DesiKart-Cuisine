/**
 * Universal WhatsApp Launcher for mobile and desktop browsers.
 * Uses native app URI scheme for Android/iOS, with a fallback to web/HTTPS endpoints.
 */
export const openWhatsApp = (phone, message) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const encodedText = encodeURIComponent(message);
  let cleanPhone = (phone || "").replace(/[^0-9]/g, "");

  if (cleanPhone.startsWith("0")) {
    cleanPhone = "92" + cleanPhone.slice(1);
  }

  // 1. Primary link
  const primaryUrl = isMobile
    ? (cleanPhone 
        ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}` 
        : `whatsapp://send?text=${encodedText}`)
    : (cleanPhone 
        ? `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}` 
        : `https://web.whatsapp.com/send?text=${encodedText}`);

  // 2. Fallback link for mobile browsers/WebViews that block custom URI schemes
  const fallbackUrl = cleanPhone
    ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
    : `https://api.whatsapp.com/send?text=${encodedText}`;

  // 3. Trigger synthetic user click to prevent popup blocking
  const link = document.createElement("a");
  link.href = primaryUrl;
  link.target = isMobile ? "_top" : "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 4. Execute fallback if custom protocol fails to launch within timeout
  if (isMobile) {
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 450);
  }
};