import type { WeddingConfig } from './types';

/**
 * Single source of truth for every piece of content displayed on the site.
 *
 * Edit the values below — you should never have to touch the components.
 * All values are written in French because they are shown to the guests.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    partnerOne: 'Linda',
    partnerTwo: 'Victor',
    hashtag: 'LindaEtVictor2027',
  },

  date: {
    // Used by the countdown and the structured data. Keep the ISO format.
    isoDate: '2027-07-17T15:00:00+02:00',
    longLabel: 'Samedi 17 Juillet 2027',
    shortLabel: '17 . 07 . 2027',
  },

  hero: {
    introduction: 'Nous nous marions',
    ctaLabel: 'Confirmer ma présence',
    // Drop your own picture in `public/images/` and update this path.
    backgroundImage: 'images/us.jpg',
  },

  venue: {
    eyebrow: 'Le lieu',
    title: 'Où nous retrouver',
    description:
      "La cérémonie laïque et la soirée se dérouleront au même endroit, au cœur des vignes du Beaujolais, vous n'aurez donc pas à reprendre la route entre les deux.",
    name: 'Ermitage de Brouilly',
    addressLines: ['865 Rte De La Folie', '69460 Odenas'],
    city: 'Odenas, Beaujolais',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Ermitage%20de%20Brouilly%2069460%20Saint-Lager&output=embed',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ermitage%20de%20Brouilly%2069460%20Saint-Lager',
    websiteUrl: 'https://www.ermitage-brouilly.fr/',
    gallery: [
      {
        src: 'images/venue/venue-1.jpg',
        alt: "La bâtisse de l'Ermitage de Brouilly et sa grande salle vitrée",
      },
      {
        src: 'images/venue/venue-3.jpg',
        alt: 'La terrasse ombragée avec vue sur les vignes du Beaujolais',
      },
      {
        src: 'images/venue/venue-4.jpg',
        alt: "Le domaine niché au milieu des vignes aux couleurs d'automne",
      },
      {
        src: 'images/venue/venue-5.jpg',
        alt: 'Panorama sur les coteaux et les villages du Beaujolais',
      },
    ],
  },

  schedule: {
    // Switch to `true` to display this section and its navigation link.
    enabled: true,
    // Switch to `false` once the timeline below is finalised.
    underConstruction: true,
    constructionMessage:
      'Le déroulé précis de la journée est encore en cours de préparation. Nous le dévoilerons ici très bientôt, revenez y jeter un œil !',
    eyebrow: 'Le programme',
    title: 'Le déroulé de la journée',
    description:
      'Voici les grandes étapes de la journée pour que vous puissiez vous organiser sereinement.',
    entries: [
      {
        time: '14h30',
        title: 'Accueil des invités',
        description:
          'Rendez-vous dans la cour du château pour un rafraîchissement avant la cérémonie.',
        icon: 'welcome',
      },
      {
        time: '15h30',
        title: 'Cérémonie',
        description: "Sous les chênes centenaires du parc. Prévoyez une tenue adaptée si le temps est incertain.",
        icon: 'ceremony',
      },
      {
        time: '16h30',
        title: 'Photos de groupe',
        description: 'Quelques instants pour immortaliser la journée avec vous tous.',
        icon: 'photos',
      },
      {
        time: '17h30',
        title: 'Vin d’honneur',
        description: 'Cocktail et animations sur la terrasse, face aux vignes.',
        icon: 'cocktail',
      },
      {
        time: '20h00',
        title: 'Dîner',
        description: 'Repas assis dans l’orangerie. Le plan de table vous attendra à l’entrée.',
        icon: 'dinner',
      },
      {
        time: '23h00',
        title: 'Ouverture du bal',
        description: 'Et ensuite, la piste est à vous jusqu’au bout de la nuit.',
        icon: 'party',
      },
      {
        time: '11h00',
        title: 'Brunch du dimanche',
        description: 'Pour prolonger un peu la fête avant de se dire au revoir.',
        icon: 'brunch',
      },
    ],
  },

  accommodation: {
    // Switch to `false` to hide this section and its navigation link.
    enabled: true,
    eyebrow: 'Séjour',
    title: 'Où dormir dans les alentours',
    description:
      "Beaucoup d'entre vous viennent de loin : voici quelques adresses proches du domaine pour prolonger le week-end en toute tranquillité. Réservez tôt, les chambres partent vite en été.",
    // Exemples à remplacer par vos vraies adresses (nom, description, distance, lien).
    hotels: [
      {
        name: 'Hôtel le Mont Brouilly',
        description: '',
        distance: 'À 5 min en voiture du domaine',
        url: 'https://www.hotelbrouilly.com/fr',
      },
      {
        name: "La Croix de Saburin",
        description:
          "Maison d’hôtes à Quincié-en-Beaujolais dans le Rhône",
        distance: 'À 5 min en voiture du domaine',
        url: 'https://lacroixdesaburin.fr/',
      },
      {
        name: 'La Maison des Vignes',
        description:
          'Chambres et Table d\'hôtes',
        distance: 'À 5 min en voiture du domaine',
        url: 'https://www.la-maison-des-vignes.fr/',
      },
    ],
  },

  weddingPlanner: {
    // Switch to `false` to hide this section and its navigation link.
    enabled: true,
    eyebrow: "L'organisation",
    title: 'Notre wedding planner',
    description:
      "Pour que cette journée soit aussi douce à vivre pour nous que pour vous, nous sommes accompagnés par Julie, de l'agence Enjoy Événements. Avec une douzaine d'années d'expérience, elle coordonne chaque détail et officie notre cérémonie. Si vous avez la moindre question le jour J, elle saura vous guider.",
    name: 'Julie',
    agency: 'Enjoy Événements',
    role: 'Coordinatrice & officiante de cérémonie',
    photo: 'images/julie.jpg',
    photoAlt: "Julie, notre wedding planner de l'agence Enjoy Événements",
    websiteUrl: 'https://enjoy-evenements.fr/',
    websiteLabel: 'Découvrir Enjoy Événements',
  },

  rsvp: {
    eyebrow: 'Réponse',
    title: 'Serez-vous des nôtres ?',
    description:
      'Merci de nous répondre même si vous ne pouvez pas venir : cela nous aide énormément pour l’organisation.',
    deadlineLabel: 'Réponse souhaitée avant le 1er avril 2027',
    contactEmail: 'victor.gallet@protonmail.ch',
    maxAdditionalGuests: 4,
    successMessage:
      'Merci ! Votre réponse a bien été enregistrée. Nous avons hâte de vous retrouver.',
    errorMessage:
      "Votre réponse n'a pas pu être enregistrée. Réessayez dans quelques instants ou écrivez-nous directement.",
  },

  giftRegistry: {
    // Switch to `true` to display this section and its navigation link.
    enabled: true,
    eyebrow: 'Cagnotte',
    title: 'Participer à notre aventure',
    description:
      'Après avoir trinqué avec vous au cœur des vignes, nous rêvons de poursuivre l\'aventure un peu plus loin. Cette cagnotte nous emmènera en voyage de noces : merci de faire partie du voyage.',
    links: [
      {
        label: 'Notre cagnotte en ligne',
        description: 'Pour participer à notre voyage de noces.',
        url: 'https://www.onparticipe.fr/c/AKzAJ0WB',
      },
    ],
  },

  playlist: {
    // Switch to `true` to display this section and its navigation link.
    enabled: true,
    eyebrow: 'Musique',
    title: 'La playlist de la soirée',
    description:
      'Ajoutez le morceau qui vous fera danser : nous la construisons tous ensemble jusqu’au jour J.',
    playlistUrl: 'https://open.spotify.com/playlist/7drmgf46YdavA6JNvgH0n1?si=LmtIVHz3R4qOtImDtYGx3w',
    playlistLabel: 'Ajouter un morceau',
  },

  seo: {
    title: 'Linda & Victor — 17 juillet 2027',
    description:
      'Toutes les informations pratiques pour notre mariage : le lieu, le programme de la journée et le formulaire de réponse.',
  },
};

export default weddingConfig;
