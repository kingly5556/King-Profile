export const CONTACT_EMAIL = "kongkat5556@hotmail.com";
export const CONTACT_PHONE_DISPLAY = "+66 86-424-1979";
export const CONTACT_PHONE_TEL = "+66864241979";

export function contactMailto(subject?: string) {
  return subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
}
