/**
 * Resolves and fetches the brand logo or user profile avatar URL for a given resource link.
 * It dynamically matches against known domains to provide official, high-resolution logos
 * (using Clearbit's brand logo database) and falls back to high-resolution favicons
 * via Google's Favicon service for personal blogs or domain endpoints.
 *
 * @param url - The absolute URL of the resource.
 * @returns The resolved logo image URL, or an empty string if invalid.
 */
export function getResourceLogo(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    
    // Youtube brand & creator channel avatar mapping overrides
    if (domain.includes("youtube.com")) {
      if (url.includes("@Fireship") || url.toLowerCase().includes("fireship")) {
        return "https://logo.clearbit.com/fireship.io";
      }
      if (url.includes("hubermanlab") || url.toLowerCase().includes("huberman")) {
        return "https://logo.clearbit.com/hubermanlab.com";
      }
      return "https://logo.clearbit.com/youtube.com";
    }
    
    // X / Twitter platform and profile avatar mapping overrides
    if (domain.includes("x.com") || domain.includes("twitter.com")) {
      return "https://logo.clearbit.com/x.com";
    }
    
    // Vitsœ design system company logo override
    if (domain.includes("vitsoe.com")) {
      return "https://logo.clearbit.com/vitsoe.com";
    }
    
    // dataintensive.net database systems website logo override
    if (domain.includes("dataintensive.net")) {
      return "https://logo.clearbit.com/dataintensive.net";
    }
    
    // Fallback: Google Favicon API (high-resolution 64x64) for other domains
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return "";
  }
}
