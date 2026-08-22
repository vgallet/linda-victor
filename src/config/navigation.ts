import { weddingConfig } from './wedding.config';

export interface NavigationLink {
  /** Anchor id of the target section (also used as the URL fragment). */
  id: string;
  label: string;
}

/**
 * Navigation entries, built from the config so that disabled optional
 * sections never show up in the menu.
 */
export const navigationLinks: NavigationLink[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'lieu', label: 'Le lieu' },
  ...(weddingConfig.schedule.enabled ? [{ id: 'programme', label: 'Programme' }] : []),
  ...(weddingConfig.playlist.enabled ? [{ id: 'playlist', label: 'Playlist' }] : []),
  ...(weddingConfig.accommodation.enabled ? [{ id: 'sejour', label: 'Séjour' }] : []),
  ...(weddingConfig.giftRegistry.enabled
    ? [{ id: 'cagnotte', label: 'Cagnotte' }]
    : []),
  ...(weddingConfig.weddingPlanner.enabled
    ? [{ id: 'wedding-planner', label: 'Wedding planner' }]
    : []),
  { id: 'rsvp', label: 'RSVP' },
];
