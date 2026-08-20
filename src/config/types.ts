/**
 * Type definitions for the wedding site content.
 *
 * Code and identifiers are in English; every value defined in
 * `wedding.config.ts` is user-facing French content.
 */

export interface CoupleConfig {
  /** First name displayed first in the hero title. */
  partnerOne: string;
  /** First name displayed second in the hero title. */
  partnerTwo: string;
  /** Optional hashtag shown in the footer, without the leading "#". */
  hashtag?: string;
}

export interface EventDateConfig {
  /** ISO 8601 date-time of the ceremony, used by the countdown and metadata. */
  isoDate: string;
  /** Human readable date, e.g. "Samedi 12 septembre 2026". */
  longLabel: string;
  /** Compact date used in the hero, e.g. "12.09.2026". */
  shortLabel: string;
}

export interface AccessNote {
  title: string;
  description: string;
}

export interface SectionIntro {
  /** Small uppercase label displayed above the title. */
  eyebrow: string;
  title: string;
  description?: string;
}

export interface VenuePhoto {
  /** Image path relative to `public/`. */
  src: string;
  /** Descriptive alt text for accessibility. */
  alt: string;
}

export interface VenueConfig extends SectionIntro {
  /** Venue name, e.g. "Château de la Roseraie". */
  name: string;
  /** Address lines rendered one per line. */
  addressLines: string[];
  /** City shown under the hero title. */
  city: string;
  /**
   * Google Maps embed URL, only loaded after the guest clicks the map facade.
   * Obtained via Google Maps > Partager > Intégrer une carte > copy the `src` value.
   */
  mapEmbedUrl: string;
  /** Direct link opening the venue in Google Maps. */
  googleMapsUrl: string;
  /** Official venue website. */
  websiteUrl: string;
  /** Photos of the venue shown in the gallery. */
  gallery: VenuePhoto[];
  /** Practical information cards: parking, transport, accommodation... */
  accessNotes: AccessNote[];
}

export type ScheduleIconName =
  | 'welcome'
  | 'ceremony'
  | 'photos'
  | 'cocktail'
  | 'dinner'
  | 'party'
  | 'brunch';

export interface ScheduleEntry {
  /** Time label, e.g. "15h00". */
  time: string;
  title: string;
  description: string;
  /** Icon key rendered by `ScheduleIcon.astro`. */
  icon: ScheduleIconName;
}

export interface ScheduleConfig extends SectionIntro {
  /** Set to `true` to display the section and its navigation entry. */
  enabled: boolean;
  entries: ScheduleEntry[];
}

export interface RsvpConfig extends SectionIntro {
  /** Deadline reminder shown next to the form. */
  deadlineLabel: string;
  /** Contact e-mail offered as a fallback when the form fails. */
  contactEmail: string;
  /** Maximum number of extra guests selectable in the form. */
  maxAdditionalGuests: number;
  /** Message displayed once the RSVP has been recorded. */
  successMessage: string;
  /** Message displayed when the submission could not be recorded. */
  errorMessage: string;
}

export interface GiftLink {
  label: string;
  description: string;
  url: string;
}

export interface GiftRegistryConfig extends SectionIntro {
  /** Set to `true` to display the section and its navigation entry. */
  enabled: boolean;
  links: GiftLink[];
}

export interface HotelSuggestion {
  /** Hotel or guesthouse name. */
  name: string;
  /** Short description: ambience, why we suggest it... */
  description: string;
  /** Distance/time from the venue, e.g. "À 10 min de la salle". */
  distance: string;
  /** Optional link to the establishment's website or booking page. */
  url?: string;
}

export interface AccommodationConfig extends SectionIntro {
  /** Set to `true` to display the section and its navigation entry. */
  enabled: boolean;
  /** List of nearby hotels/guesthouses suggested to the guests. */
  hotels: HotelSuggestion[];
}

export interface WeddingPlannerConfig extends SectionIntro {
  /** Set to `true` to display the section and its navigation entry. */
  enabled: boolean;
  /** Planner's first name (or full name). */
  name: string;
  /** Agency name, e.g. "Enjoy Événements". */
  agency: string;
  /** Role/mission, e.g. "Coordinatrice & officiante de cérémonie". */
  role: string;
  /** Portrait path relative to `public/`. */
  photo: string;
  /** Descriptive alt text for the portrait. */
  photoAlt: string;
  /** Link to the planner's website. */
  websiteUrl: string;
  /** Label of the button opening the website. */
  websiteLabel: string;
}

export interface PlaylistConfig extends SectionIntro {
  /** Set to `true` to display the section and its navigation entry. */
  enabled: boolean;
  /** Public collaborative playlist URL (Spotify, Deezer, Apple Music...). */
  playlistUrl: string;
  /** Label of the button opening the playlist. */
  playlistLabel: string;
}

export interface HeroConfig {
  /** Short sentence displayed above the names. */
  introduction: string;
  /** Label of the main call to action. */
  ctaLabel: string;
  /** Path of the background image, relative to `public/`. */
  backgroundImage: string;
}

export interface SeoConfig {
  title: string;
  description: string;
}

export interface WeddingConfig {
  couple: CoupleConfig;
  date: EventDateConfig;
  hero: HeroConfig;
  venue: VenueConfig;
  schedule: ScheduleConfig;
  accommodation: AccommodationConfig;
  weddingPlanner: WeddingPlannerConfig;
  rsvp: RsvpConfig;
  giftRegistry: GiftRegistryConfig;
  playlist: PlaylistConfig;
  seo: SeoConfig;
}
