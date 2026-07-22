function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.substring(0, 2), 16);
    g = parseInt(cleaned.substring(2, 4), 16);
    b = parseInt(cleaned.substring(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generateVibrantColor(seed: string, alpha: number = 1): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsla(${hue}, 65%, 48%, ${alpha})`;
}

function getSocialMediaColor(platform: string, alpha: number = 1): string {
  switch (platform.toLowerCase()) {
    case "youtube":
      return hexToRgba("#FF0000", alpha);
    case "x":
    case "twitter":
      return hexToRgba("#000000", alpha);
    case "instagram":
      return hexToRgba("#E1306C", alpha);
    case "linkedin":
      return hexToRgba("#0077B5", alpha);
    case "reddit":
      return hexToRgba("#FF4500", alpha);
    case "figma":
      return hexToRgba("#F24E1E", alpha);
    case "spotify":
      return hexToRgba("#1DB954", alpha);
    case "github":
      return hexToRgba("#181717", alpha);
    case "discord":
      return hexToRgba("#5865F2", alpha);
    case "twitch":
      return hexToRgba("#9146FF", alpha);
    case "tiktok":
      return hexToRgba("#FE2C55", alpha);
    case "substack":
      return hexToRgba("#FF6719", alpha);
    case "telegram":
      return hexToRgba("#26A5E4", alpha);
    case "goodreads":
      return hexToRgba("#5B3E25", alpha);
    case "medium":
      return hexToRgba("#00AB6C", alpha);
    // Resource-kind colors (post/video/channel/podcast/playlist) — same lookup,
    // kept distinct from the brand colors above so a kind badge never collides
    // with the type/category badge shown alongside it.
    case "video":
      return hexToRgba("#3B82F6", alpha);
    case "channel":
      return hexToRgba("#8B5CF6", alpha);
    case "post":
      return hexToRgba("#F59E0B", alpha);
    case "playlist":
      return hexToRgba("#EC4899", alpha);
    case "account":
      return hexToRgba("#14B8A6", alpha);
    case "newsletter":
      return hexToRgba("#FF6719", alpha);
    case "podcast":
      return hexToRgba("#7C3AED", alpha);
    default:
      return generateVibrantColor(platform, alpha);
  }
}

export { generateVibrantColor, getSocialMediaColor };

