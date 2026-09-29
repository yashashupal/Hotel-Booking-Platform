export interface SanctuaryRoom {
  id: string;
  name: string;
  bed: string;
  size: string;
  capacity: string;
  pricePerNight: number;
  description: string;
  tags: string[];
  imageUrl: string;
  recommended?: boolean;
  remainingText?: string;
}

export interface Sanctuary {
  id: string;
  name: string;
  category: 'nordic' | 'coastal' | 'alpine' | 'desert';
  location: string;
  region: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  extendedStory: string;
  curatorName: string;
  curatorTitle: string;
  curatorAvatar: string;
  heroImage: string;
  galleryImages: { url: string; title: string; category: string }[];
  highlightTrio: { title: string; description: string; icon: string }[];
  amenities: { name: string; subtitle: string; icon: string }[];
  rooms: SanctuaryRoom[];
  acousticDecibel: number;
  acousticClassification: string;
  ratingsBreakdown: {
    cleanliness: number;
    location: number;
    quietness: number;
    service: number;
    kaiseki: number;
    restorative: number;
  };
  testimonials: {
    quote: string;
    author: string;
    origin: string;
    date: string;
    avatar: string;
  }[];
  mapDetails: {
    zone: string;
    travelInfo: string;
    coordinates: string;
  };
}

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  perPerson?: boolean;
  tag?: string;
  description: string;
  includedByDefault?: boolean;
}

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'kaiseki',
    name: 'Private Kaiseki Dinner & Rare Sake Pairing',
    price: 140,
    perPerson: true,
    tag: 'Artisanal',
    description: 'Multi-course hyper-seasonal gastronomy served in the cedar pavilion overlooking the rock garden. Curated by Master Chef Kenji Matsuno.'
  },
  {
    id: 'spa',
    name: 'Organic Forest Herbal Spa Ritual (90 min)',
    price: 180,
    perPerson: false,
    tag: 'Curated',
    description: 'Restorative onsen thermal immersion followed by Hinoki cypress oil body treatment and Japanese mugwort compression.',
    includedByDefault: true
  },
  {
    id: 'transfer',
    name: 'Chauffeured Airport Transfer (Kyoto Station)',
    price: 65,
    perPerson: false,
    tag: 'VIP Service',
    description: 'Private zero-emission executive sedan with quiet cabin service, chilled hand linens, and bottled mountain spring water upon arrival.'
  }
];

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'komorebi-forest',
    name: 'The Komorebi Forest Sanctuary',
    category: 'nordic',
    location: 'Arashiyama Bamboo Grove, Kyoto',
    region: 'Sagatenryuji, Ukyo Ward',
    country: 'Japan',
    pricePerNight: 520,
    rating: 4.98,
    reviewCount: 340,
    tagline: 'Sukiya Carpentry Heritage & Biophilic Architecture',
    description: 'Tucked into the mist-shrouded foothills of Arashiyama, The Komorebi Forest Sanctuary is a dialogue between ancient Japanese timber joinery and Nordic calm.',
    extendedStory: 'Named after the Japanese word for sunlight filtering through canopy leaves, each structure is elevated on discreet cedar stilts to let the living forest floor breathe unimpeded. Guests awake to meditative stream water acoustics, hand-whisked Uji matcha ceremonies, and unhurried immersions in private geothermal onsen pools fragrant with fresh hinoki wood resin.',
    curatorName: 'Aura Kyoto Guild',
    curatorTitle: 'Master Curators • 8 years welcoming mindful guests',
    curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBHoCib7C4JafFsIdM4sQGNJ4RqxBN8rzse-s7AesYX8HGtol8yj3KC3PG_n8w5earnK0zB3vjip6yGir0FZoRhv9s3wWogdkWuEuljvujmXLK2TQRTwR94I0mEdHFDJV3tVrnboiqGrJRrdSHf1acZ8EU3f4KhFM3Nw0zLXzieDk-j1rNrjRIpGr8Q32qFDvE-IIDzSkZkFlVaadTe_47VScynu6BuV3RtgHojn_76QUe5daJTVIV9Q',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDrp96vex9IyKingCOAQAlFnltJ160mPRS84CGywNQ24XmzFXvT51hvhD5regrSoFP48XoI6GJQGUn2KMxC49QYXc3RiztPRhbQbLe7Hx5pI6F4iEbErqW-e6HnGdZCVCSzdh0iHpIqbUHuwsUiQX5pTtRgp8cC1TpHd4XODWGAnPb3eQOdXdQ1KkkXfR8ZahyxLOBCOA3rItdhaDGVIAlKujFFl4oC93WDx4uAgprw3OfFHFZwqajyQ',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDrp96vex9IyKingCOAQAlFnltJ160mPRS84CGywNQ24XmzFXvT51hvhD5regrSoFP48XoI6GJQGUn2KMxC49QYXc3RiztPRhbQbLe7Hx5pI6F4iEbErqW-e6HnGdZCVCSzdh0iHpIqbUHuwsUiQX5pTtRgp8cC1TpHd4XODWGAnPb3eQOdXdQ1KkkXfR8ZahyxLOBCOA3rItdhaDGVIAlKujFFl4oC93WDx4uAgprw3OfFHFZwqajyQ',
        title: 'Exterior Pavilion & Stream',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Yu-wUcON5fwtzPRmHdrkcRhpSKrl-7EwW7_FJDGXy1CHVTGDa1xrVMiu0rGPcGTDw-GGSaHt8UC2ellLKUxLbGja6TJ-Qb890D2BO7wey4o-m7tiPbXVa1e3PQbChJuPlTVcW7Zz292YTDGl0wJ2DU7T_nZeU9couoJDfPVEdFv2qDVtsmximPq37b42M6xU8IMSkv3TXpJuFauRUsKk5x70vCgiZZt9pXU9OcdCQ1YdlSF0b0pVvQ',
        title: 'Tatami Master Suite & Canopy Outlook',
        category: 'Bedrooms'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvj4q6Q4RV4f6In5u_aEErm3cNo85MSeUpn6qc1gPwmjvZ3hGdxtvhAmTCFpQZOVnNZH9Fs-X7c8ydy-PGtx6kKdr9AK1N7o8Z2sPwc-djonT4z0glddKCXbyTafCpUtZLaPi9wppPtmk4_Yps41arHDaUuGeEIpIA2T57Rw86eDZLxfyiiqG6KQR011_KhA0sod66xmf6B7gpVm6URR3Fv4K5tUmTams4hZhtbzIxbyaXAWy7AnCyow',
        title: 'Steaming Outdoor Hinoki Cypress Onsen',
        category: 'Onsen & Bath'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkTFahM7SEAGYhU_qPVXm1f4BLxIAJ9Sk2L1rfTQPSwKeaai4lIidi8Qa9s5RVqNwtmhgAW1kOSthHwAbUap-9wiXV4cW8dgxubYtM6HT_d2haOlw_4D5xJ8P_OHo5ojjb4turvJvzP3PcGkI316Ji2NjfjZPcebF_nUDhnbOY_OMh2EGzMxzE_IhcG6DbPrx2AjZ7Uolu2_L1JcwtqcoaQm4iuzHhOwBZkT5jofXGN92oP_1UP8Dj8g',
        title: 'Cantilevered Balcony Terrace over Bamboo Grove',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5fKg-jRzzhsmtelVCrmL6zGq6f0Sf7HTuehtJrGUJ5QaRNBrfZwl4MsJuxO-3y_DTBMiuTCF_85eEDMrQOtTJR0_ymzTREVFKkISTeUB_SRiIIKn2oEv_epcR-4gtDMshy888lKEh3nU5alldiETn-B6aWF14ShboRbGjEqetTHF2Y_4o85S489iZvjEdzNIdl2OkldTozDUqeyAMAFu6hxqOW9KXleqeBsQ_4xc5KoxMHZv978Pqw',
        title: 'Secluded Tea Ceremony Pavilion & Raku Wares',
        category: 'Dining'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK-M1ivrq8Z4xhhCUmyaW3gee5cBtRjKDqcyK1SVSTrZGMVbDoILuL6WSm2xUxeyoRcGLEZnsSsLpwlj8r_gQzsvw5OhHJpRtbM3KDObrkPF3DNfoh4KqujYym2xWWtNHI9ykykNMRW8zs9H0xGaW4kbkK4eIQBF3SLqf0JJpdAv2kTaY5UY2pKdj8F13NWvQz0scfIZYxQA5R_JAzzMg2x5fId02C_RGZTEDaQge0vs5ccC6fJYEBDQ',
        title: 'Golden Hour Louvered Sunbeams',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1jmHaME6zq_8BpWstcXROkdi3Hmp3JUaG-Wj4tZgqB3kj2RnRNgXk1SppuJPJWjSjmdclfc-bKnpMwadPfJXYmRIgf102662EvYSltr7hO5OI0usMDAkl2SRGD-kXHOzsUf3MI-AAUJGRMkJWNB5TOua5NvObRYbqDG5PAUdhjTL2XiF0qnMTHMC0dG6b8b7q_bS7robFuXpEOC8JoRkBjgD8mhnMleRF-Rv0FuyyaTlQ4IIA1Y3NdQ',
        title: 'Artisanal Kyoto Breakfast Spread',
        category: 'Dining'
      }
    ],
    highlightTrio: [
      {
        title: 'Private Open-Air Onsen',
        description: 'Direct mineral geothermal spring fed through aromatic hinoki cypress tubs.',
        icon: 'hot_tub'
      },
      {
        title: 'Forest Bathing Trails',
        description: 'Direct private pathway accessing protected Arashiyama bamboo paths.',
        icon: 'forest'
      },
      {
        title: 'Kaiseki Epicurean',
        description: 'Multi-course hyper-seasonal dining curated by Michelin-awarded masters.',
        icon: 'restaurant'
      }
    ],
    amenities: [
      { name: 'Cedar Wood Bath', subtitle: 'Wild botanical salts', icon: 'bathtub' },
      { name: 'Forest Yoga Shala', subtitle: 'Daily dawn pranayama', icon: 'self_improvement' },
      { name: 'Daily Organic Breakfast', subtitle: 'Seasonal Kyoto produce', icon: 'bakery_dining' },
      { name: 'Optical Wi-Fi 6E', subtitle: '500 Mbps silent coverage', icon: 'wifi' },
      { name: 'Heated Stone Floors', subtitle: 'Ashikaga slate radials', icon: 'thermostat' },
      { name: 'Ceremonial Matcha Bar', subtitle: 'In-room whisk & kettle', icon: 'local_cafe' }
    ],
    rooms: [
      {
        id: 'forest-pavilion-suite',
        name: 'Forest Pavilion Suite',
        bed: 'King Bed',
        size: '65 m² (700 sqft)',
        capacity: '2 Guests',
        pricePerNight: 520,
        recommended: true,
        description: 'Elevated sanctuary pavilion featuring an open-concept timber layout, private outdoor hinoki cedar onsen, and uninterrupted panoramic outlooks over the Arashiyama forest canopy.',
        tags: ['Private Onsen', 'Forest Balcony', 'Free Cancellation', 'Breakfast Included'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw2b-qP1HJdhj_dqg2-lxswsRze7qi8q6Dk5cd-yDQgvkaQ8h56ypEGF6xnx10MgHbB0CjpNz5i11AGmwwI2AylyKDRPNlmEJibW9cxeOHkUuVN6UC-Et_DPrT-TJSStNHVja6FgwGpeUPqzONrRhmtDpNfHiUFgr73lPxmWEpJf0EqJraD66HOmhkZFacVTWEvjEk_CJ6KOI_1ZKWUBAf6ZlVMdK_wX4btfujOmrrocRFaxPVEaESkQ'
      },
      {
        id: 'nordic-minimalist-villa',
        name: 'Nordic Minimalist Villa',
        bed: '2 King Beds',
        size: '110 m² (1,180 sqft)',
        capacity: '4 Guests',
        pricePerNight: 890,
        remainingText: 'Only 1 Villa Remaining',
        description: 'Standalone double-suite estate with secluded courtyard moss garden, dual private onsen pools, heated Nordic stone hearth, and full in-villa butler tea service.',
        tags: ['Private Plunge Pool', 'Zen Moss Garden', 'Free Cancellation', 'Kaiseki Dinner Included'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6xE20EgN5MCS2OX5opA-AFTuOohsZ7redXbzb90WYwr7zDOzp-PLnKxhmLq-FavwItDaZyib8WNuSyXe10GIFkIPknizF-9JQ9OYP8Z7TRoa5FXg-O9GKJ9N7AEJUR4UxzczSzCM85TkZIb1nIS85x9RLHTfK65m30ey-gDw6PkIPM8ZthNPQOjHbDlzV2oPFwQMhtznlw03EObE2xaLPBt4ABL309WffBepLUc0WQF3IUnC1SKnkQ'
      },
      {
        id: 'zen-garden-studio',
        name: 'Zen Garden Studio',
        bed: 'Queen Bed',
        size: '45 m² (485 sqft)',
        capacity: '2 Guests',
        pricePerNight: 360,
        remainingText: 'Available Instant Booking',
        description: 'An intimate meditative retreat directly bordering the dry gravel rock garden. Includes a private sheltered tea terrace, rain shower, and soaking tub.',
        tags: ['Tea Terrace', 'Garden View', 'Free Cancellation'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi12NNFWjTSzrd4I2GF7SVS-EFQ55RqRUKWHwUXnpeuqneHItcSfrBfrt9ct0HBM2vn556p616dl8sI_28XAD7rPxSrR4_6ITOiwzWL_Eyz67oKGIe3C-jVsVYFRQpDjAh427KlJFFF2Mfw0w8Vy37t2UbgG5zJ-W0a_qJgKfr-bGhXQKfndVpqFMC0pgbBB8UjP2j-UzMmMTY-gR0q7HK6c9cDNccR0f_WVXXq8d_hdfdEu1mZLbX9Q'
      }
    ],
    acousticDecibel: 19.4,
    acousticClassification: 'Whisper Grade (< 22 dB Ambient)',
    ratingsBreakdown: {
      cleanliness: 5.0,
      location: 4.9,
      quietness: 5.0,
      service: 5.0,
      kaiseki: 4.95,
      restorative: 4.9
    },
    testimonials: [
      {
        quote: 'An architectural masterpiece of quietude. Listening to rain against the cedar canopy from our private onsen tub was the most transcendent moment of our travels across Japan. Unbelievable kaiseki dinner.',
        author: 'Evelyn Vance',
        origin: 'Stockholm',
        date: 'Stayed Sept 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJ20BtyHl_oY_bYmW62uZJ43Z_FLWV_Sb0uphg89fxSE5JpBtwoWH2uunCU-idIV1397rDItqsrbiXn38kjXT5mDtO6HoK1THTzrwmZi33e5VprvOnHTP4WTw_C_2RriA5hNvCPlNfJ5yyjHmmvCXgUdpDMsqPEm2idLSVa2qF8X0p02iFH-zEWL_GH2UFoldLxUhXs-YXnLCmHZFUb-KZs5bDEMcoAW-KCI-zwQazthftQ2jAEbkfQ'
      },
      {
        quote: 'The silence here is tangible. You wake up inside the bamboo forest. Every detail from the hand-carved tea implements to the heated stone floors reflects consummate reverence for hospitality.',
        author: 'Kenji & Sarah Moriyama',
        origin: 'San Francisco',
        date: 'Stayed Oct 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdUQb_4r2xM5Nt8VwUGLOghIVY_wBTu2SaSUIAm3_rZc4rwiEk4NyvIjDyF1xmos6NV_JJq3sYSGbP8P0enD1WTv-pzCj7qW7RWOlmf-UcmnYaD4VEhZyCjzFloS9lWNbOtyoOBjyRTDtR-gNGE62pQgs7DDb2e5KZ-Esyjp_jh6rRPIeirc3jzRIzBxUd8niVoAgFQtMff2N3sXnZiyWA-28-RAbk618DIm72-oNZqQeZEASb3r12AA'
      }
    ],
    mapDetails: {
      zone: 'Protected Kyoto Forest Reserve',
      travelInfo: 'Private vehicle transfer included from Kyoto Station (22 minutes). Complete silence guaranteed after dusk.',
      coordinates: '35.0168° N, 135.6713° E'
    }
  },
  {
    id: 'miramonti-forest',
    name: 'Miramonti Forest Sanctuary',
    category: 'alpine',
    location: 'Dolomites, South Tyrol',
    region: 'Val di Funes',
    country: 'Italy',
    pricePerNight: 520,
    rating: 4.97,
    reviewCount: 142,
    tagline: 'Perched 1,230m Above the Alpine Mist',
    description: 'Perched 1,230 meters above the alpine mist, featuring bioclimatic charred larch framing, cantilevered hot water basins, and thermal saline pools.',
    extendedStory: 'Nestled on a steep granite cliff overlooking the snow-crested Geisler peaks, Miramonti embraces subalpine silence. Built with blackened yakisugi wood and locally quarried porphyry stone, the sanctuary provides an intimate shelter from high mountain winds while opening directly to dramatic jagged horizons.',
    curatorName: 'Klaus & Maria Gasser',
    curatorTitle: 'Mountain Architects & Alpine Naturalists',
    curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw_hiwyOBlmQ7wIBF4DzDP6msvlyybNh3ZbFppOJSiBUYhZokpca7rLi7zfbW9eg1YGTcMEzqG1JzqpgjI-taqRjiZgvKlFQtMJFm_IMZxlnt-sNY-O4VXE1iU4J9I4kuiygDBNmPkB3ud23ncdjEjnN6LAdOX8FxMsoAr71ttAlxzGjidgCrGXvm7ETA3M6e9vMUiEup65xRIeqaM9hEQXGberHQ6hKfKvCAEtA4VemYDn6AQzYaZGg',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBkDuY9mGNkZZqO1qaHeCx3UofJJFr74HxjqFfgPt4ShLHnipPxwYiekJ-DEzVQhvO5_2zU4BBv9Cg7IKJk4BmMifMydMx5vzqXlrqOS0t_dqpYOwG6fKCJq9Tv9OL_J_xVoa1m7tj60OO4ZQ7ABaWzmg8wYCS-1Ol3-AoAMKFDwTBzPsM3ZchNsJhDMKPXWgQzjtH-IGpQU22Ou3J4aEzeic8MoT0Mkf3y7-j4zoxCpRlme5hgMSUHQ',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBkDuY9mGNkZZqO1qaHeCx3UofJJFr74HxjqFfgPt4ShLHnipPxwYiekJ-DEzVQhvO5_2zU4BBv9Cg7IKJk4BmMifMydMx5vzqXlrqOS0t_dqpYOwG6fKCJq9Tv9OL_J_xVoa1m7tj60OO4ZQ7ABaWzmg8wYCS-1Ol3-AoAMKFDwTBzPsM3ZchNsJhDMKPXWgQzjtH-IGpQU22Ou3J4aEzeic8MoT0Mkf3y7-j4zoxCpRlme5hgMSUHQ',
        title: 'Alpine Cantilevered Chalet',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_jH5HKRyHMomNZir2ERXovGha3_NbOH-hJuQmexoZTyuyeu55vtHScu83ttyXjmaMUzsl5ud8rNwfTX_-PTWaT4qXEYQF8ecLHWHFc61QH5mvgtOkppKMUe-Y48k07awxKnZoi0BbEE8BMC71z3XX3ZAR7XPRJhs9WwwfO-G0sr1UfpwPaZuu4ilHIxmugl1_5o8Kgtkocwl4XcctTos028pePKmpQd_CLtHlBIjnwL8YajASXdQQA',
        title: 'Heated Infinity Mineral Basin',
        category: 'Onsen & Bath'
      }
    ],
    highlightTrio: [
      { title: 'Infinity Hot Basin', description: 'Thermal saline pool heated via underground biomass.', icon: 'pool' },
      { title: "Chef's Tasting Table", description: 'Wild herbs, fermented mountain pine nuts, and pasture cheeses.', icon: 'restaurant' },
      { title: 'Open Hearth Fireplace', description: 'Sunken seating area centered around raw stone hearth.', icon: 'local_fire_department' }
    ],
    amenities: [
      { name: 'Thermal Saline Pool', subtitle: '38°C year-round', icon: 'pool' },
      { name: 'Finnish Forest Sauna', subtitle: 'Subalpine spruce aroma', icon: 'sauna' },
      { name: 'Alpine Breakfast', subtitle: 'Fresh mountain honey', icon: 'bakery_dining' },
      { name: 'Telescopic Stargazing', subtitle: 'Zero light pollution deck', icon: 'flare' }
    ],
    rooms: [
      {
        id: 'dolomite-cliff-suite',
        name: 'Dolomite Cliff Suite',
        bed: 'King Bed',
        size: '72 m²',
        capacity: '2 Guests',
        pricePerNight: 520,
        recommended: true,
        description: 'Glass-walled cantilevered suite framing the limestone needles of the Odle group, with cedar soaking tub and heated larch terrace.',
        tags: ['Cliff View', 'Infinity Basin', 'Free Cancellation'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_jH5HKRyHMomNZir2ERXovGha3_NbOH-hJuQmexoZTyuyeu55vtHScu83ttyXjmaMUzsl5ud8rNwfTX_-PTWaT4qXEYQF8ecLHWHFc61QH5mvgtOkppKMUe-Y48k07awxKnZoi0BbEE8BMC71z3XX3ZAR7XPRJhs9WwwfO-G0sr1UfpwPaZuu4ilHIxmugl1_5o8Kgtkocwl4XcctTos028pePKmpQd_CLtHlBIjnwL8YajASXdQQA'
      }
    ],
    acousticDecibel: 18.2,
    acousticClassification: 'Whisper Grade (< 20 dB Ambient)',
    ratingsBreakdown: {
      cleanliness: 4.98,
      location: 4.95,
      quietness: 5.0,
      service: 4.96,
      kaiseki: 4.92,
      restorative: 4.98
    },
    testimonials: [
      {
        quote: 'Floating in the hot saline water under falling autumn snow with jagged peaks glowing in pink alpenglow is something I will remember for the rest of my life.',
        author: 'Julian Vandermeer',
        origin: 'Amsterdam',
        date: 'Stayed Nov 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3XKWg16gKf5yFKCT14rD_0wTD9W6NtyaLwUpAw6coZ9ldW1MjgA1LNDsxsImoLk8_B9S7eoVjCEUNX3WwL2Eib3EE5HWLzKZ1R-UNhDI6UnpCxOT7ho8j_3EcbrlPvbyhChfxR8YhvKWXcl4Yw2aB8AQeuOQ-1YlQCiANqlCgqDhaLgrFzHg8gY9J-BcjxSk7NpY72loVFNu-0gUfXY0LURn-z-czPkcM1NB7V7muDRS2UFNsvATbVg'
      }
    ],
    mapDetails: {
      zone: 'Puez-Odle Nature Park Reserve',
      travelInfo: 'Helipad on site or 45-min mountain shuttle from Bolzano.',
      coordinates: '46.6432° N, 11.7180° E'
    }
  },
  {
    id: 'vardo-fjord',
    name: 'Vardø Fjord Studio',
    category: 'nordic',
    location: 'Lofoten Archipelagos',
    region: 'Reine Fjord',
    country: 'Norway',
    pricePerNight: 440,
    rating: 4.99,
    reviewCount: 89,
    tagline: 'Suspended Over Cold Crystal Arctic Tides',
    description: 'Suspended over cold crystal tides with panoramic glass ceilings for Northern Lights contemplation and Finnish wood sauna rituals.',
    extendedStory: 'Built on historic rorbu stilt foundations over granite skerries, Vardø Fjord Studio offers direct maritime connection to the Arctic Ocean. Watch orcas break the glass-still water from your breakfast nook, warm your bones by the cast iron Jotul stove, and experience the profound stillness of polar light.',
    curatorName: 'Astrid & Torben Solheim',
    curatorTitle: 'Arctic Architects & Marine Stewards',
    curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw_hiwyOBlmQ7wIBF4DzDP6msvlyybNh3ZbFppOJSiBUYhZokpca7rLi7zfbW9eg1YGTcMEzqG1JzqpgjI-taqRjiZgvKlFQtMJFm_IMZxlnt-sNY-O4VXE1iU4J9I4kuiygDBNmPkB3ud23ncdjEjnN6LAdOX8FxMsoAr71ttAlxzGjidgCrGXvm7ETA3M6e9vMUiEup65xRIeqaM9hEQXGberHQ6hKfKvCAEtA4VemYDn6AQzYaZGg',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4F_PQjTKpuFU8YShjDyGb9taF3Y_KGZS3BWyK7kOch8D6jzyc2ZClSk6jpHNSWFLSnNMVuGiThmFwKm-w7FYIfHGVed1b-4KnHG7p0GYXArk_PkG0WKcVh8mX9hKBeQd4fIxT_jnhm_J4-ulZyaIVtazB7V3CwOT6JXN7l5arLw0Wop5s4g8cMiOrIxkIZAmvZHagAdqDAhBUCv-2Ox9Hzyb4xgE5kbJtK5j111f-SVRbTeLLVcNyMA',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4F_PQjTKpuFU8YShjDyGb9taF3Y_KGZS3BWyK7kOch8D6jzyc2ZClSk6jpHNSWFLSnNMVuGiThmFwKm-w7FYIfHGVed1b-4KnHG7p0GYXArk_PkG0WKcVh8mX9hKBeQd4fIxT_jnhm_J4-ulZyaIVtazB7V3CwOT6JXN7l5arLw0Wop5s4g8cMiOrIxkIZAmvZHagAdqDAhBUCv-2Ox9Hzyb4xgE5kbJtK5j111f-SVRbTeLLVcNyMA',
        title: 'Stilt Cabin Over Reine Fjord',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk4Y1f-nsRcrp8kk5N1umYUvoblk7tb5r7nnFLCwjyYxfph__XPVxRv6vkKqHzk7B2-G533eb833VU-dMQaDYXxu84FWJoB3tB9l2vi9QsbVl6do4O604o98B6xgqwnTZtiFzDZw1gaJHcBOyUTcbjGI74h0aknqf_YyR4olOlXvx4uL5RWzoCiN9NkQZKFmVb02A47xV3vGoI5Atr99G5_vU6I4J4pjsxwKKMXmMEaVpHpEbp82tXPg',
        title: 'Aurora Observation Glass Loft',
        category: 'Bedrooms'
      }
    ],
    highlightTrio: [
      { title: 'Seaside Floating Sauna', description: 'Wood-fired pine sauna with cold ocean plunge ladder.', icon: 'sauna' },
      { title: 'Private Arctic Zodiac', description: 'Included electric tender boat for silent fjord excursions.', icon: 'kayaking' },
      { title: 'Starlink Pure Silence', description: 'Ultra-fast satellite connectivity with manual kill switch.', icon: 'wifi' }
    ],
    amenities: [
      { name: 'Floating Sauna', subtitle: 'Direct sea ladder', icon: 'sauna' },
      { name: 'Glass Aurora Ceiling', subtitle: 'Retractable thermal blinds', icon: 'nightlight' },
      { name: 'Organic Nordic Larder', subtitle: 'Smoked char & cloudberries', icon: 'bakery_dining' },
      { name: 'Wood Pellet Fireplace', subtitle: 'Silent radiant convection', icon: 'heat' }
    ],
    rooms: [
      {
        id: 'vardo-stilt-studio',
        name: 'Vardø Stilt Studio',
        bed: 'King Platform Bed',
        size: '58 m²',
        capacity: '2 Guests',
        pricePerNight: 440,
        recommended: true,
        description: 'Nordic spruce timber pavilion cantilevered over Reine fjord, with full glass ceiling and sauna access.',
        tags: ['Fjord Horizon', 'Ocean Plunge', 'Starlink Pure'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk4Y1f-nsRcrp8kk5N1umYUvoblk7tb5r7nnFLCwjyYxfph__XPVxRv6vkKqHzk7B2-G533eb833VU-dMQaDYXxu84FWJoB3tB9l2vi9QsbVl6do4O604o98B6xgqwnTZtiFzDZw1gaJHcBOyUTcbjGI74h0aknqf_YyR4olOlXvx4uL5RWzoCiN9NkQZKFmVb02A47xV3vGoI5Atr99G5_vU6I4J4pjsxwKKMXmMEaVpHpEbp82tXPg'
      }
    ],
    acousticDecibel: 17.5,
    acousticClassification: 'Pristine Arctic Solitude (< 18 dB)',
    ratingsBreakdown: {
      cleanliness: 5.0,
      location: 5.0,
      quietness: 5.0,
      service: 4.98,
      kaiseki: 4.90,
      restorative: 5.0
    },
    testimonials: [
      {
        quote: 'Four nights without the hum of traffic or neon. I woke to arctic sea swells and returned to work with my thoughts completely settled.',
        author: 'Elena Rostova',
        origin: 'Copenhagen',
        date: 'Stayed Sept 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyY0yH0FbZNdTLCMwgeZGNa99COP50VleYXOvKlX8baA4sNaqzdPU3ZUYQuJv6ZTRhte4OqKAuFYXLAGj9rujPDMh-JaCJjvqaQjGaLnt3xMmWPCpP4m-pWzNsgS4YFPMoFXelOen46p6ChX8iuHn4RomNBkTZesEfe4DVgT4m6_euIzIVLGc7unwdseru_tZkUTGcL80QJD46Oz2GkH-NTtkQVxn5JgE2w5Ea1FxfW-VNaYDjXM3V0g'
      }
    ],
    mapDetails: {
      zone: 'Lofotodden National Coastal Reserve',
      travelInfo: 'Private rib boat shuttle from Leknes airport (40 mins).',
      coordinates: '67.9304° N, 13.0883° E'
    }
  },
  {
    id: 'akro-stone-cove',
    name: 'Akro Stone Cove',
    category: 'coastal',
    location: 'Milos Caldera',
    region: 'Sarakiniko Terraces',
    country: 'Greece',
    pricePerNight: 610,
    rating: 4.94,
    reviewCount: 210,
    tagline: 'Bioclimatic Subterranean Stone Suites',
    description: 'Carved directly into white pumice cliffs above turquoise shallows. Unhurried Aegean isolation with outdoor culinary counter.',
    extendedStory: 'Embedded seamlessly within the sculptured volcanic pumice of Milos, Akro Stone Cove blurs the threshold between geological formation and habitable sanctuary. Thick earth-sheltered stone keeps interiors naturally chilled beneath the Grecian sun, while private plunge pools reflect azure Aegean waves below.',
    curatorName: 'Eleni & Nikos Vlachos',
    curatorTitle: 'Cycladic Preservationists & Architects',
    curatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxhVniEgWucEBOv5BJQmmwGznElaUoeGYqVA4JbUWRLqXSqMIvNt5Qns8Zen6Vt3uqa3EdPPAixiseVk0sLATUG_cwpDSrqOdVka94mgqxA1kfKutVGsDd-GDO1vyEwSeNnP0YaAb1n33KqY5tNUIrbVNQ-Ux1aZ6nSU2IeG3yS-4SI5Y0-dI_bpI6-nfJaXUjtaAxVXxXtoM28mh-e_RDfOI-jHqJqxT7qjHhTbiaBknPiTfvOwx1Og',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhFA-ViQBtwxvAgC6Rn2ucDH-FfJk1cG8f8W_XQ0Ovcn5BsJjKqFAxXBIRdgZSG7-KP_C5Eq3m9Pd4ANNcK6xjAxMgXyRsbXFbZs7vr7rG7GaGKFUVxotto_tK7RZSjs2tFBjDFdx_SXjw9ifvYPM8S9EY5oHQeZXA6xwcHcp85onzJ1fe58v0KlipxiM7YYSBhBHJ0iZpUmfi9K_jHaA_Vep4ajBuvEAUqQ4aNsneBGHAKUY0OQ-buA',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhFA-ViQBtwxvAgC6Rn2ucDH-FfJk1cG8f8W_XQ0Ovcn5BsJjKqFAxXBIRdgZSG7-KP_C5Eq3m9Pd4ANNcK6xjAxMgXyRsbXFbZs7vr7rG7GaGKFUVxotto_tK7RZSjs2tFBjDFdx_SXjw9ifvYPM8S9EY5oHQeZXA6xwcHcp85onzJ1fe58v0KlipxiM7YYSBhBHJ0iZpUmfi9K_jHaA_Vep4ajBuvEAUqQ4aNsneBGHAKUY0OQ-buA',
        title: 'Caldera Cliff Face Architecture',
        category: 'Architecture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw3wBfl--Dd9Sy3a3Cih8OE_bAP8puvEIUwMcs6qCDjZ1Id-GJ9Dr1473uDZgmkbOIQUModQOrdpISlvKIupJ04srOOxwN3iUYGFi1DF8wklCK2Uv3M3FgAZczBHVCDqyV5pyqHLseVp4j4jcpM0N5HQuwEIDPeWObMcoVhekWkibTPC7gPrzKthBM-b78gJX-T8R9bm8vCZcks9Qc9jCydvnWFeAl0lOlOxFWzgTN4oZ_g3M2zk5tdA',
        title: 'Subterranean Stone Plunge Pool',
        category: 'Onsen & Bath'
      }
    ],
    highlightTrio: [
      { title: 'Cave Plunge Pool', description: 'Shaded volcanic cavern pool overlooking Aegean blue.', icon: 'water' },
      { title: 'Natural Cellar', description: 'Curated bio-dynamic Cycladic Assyrtiko selections.', icon: 'wine_bar' },
      { title: 'Solar Off-Grid', description: '100% self-powered architectural sustainability.', icon: 'sunny' }
    ],
    amenities: [
      { name: 'Private Sea Access', subtitle: 'Private ladder to cove', icon: 'scuba_diving' },
      { name: 'Sunken Olive Courtyard', subtitle: 'Handcrafted stoneware', icon: 'park' },
      { name: 'Organic Breakfast Basket', subtitle: 'Wild thyme honey & figs', icon: 'bakery_dining' },
      { name: 'Bioclimatic Airflow', subtitle: 'Zero synthetic noise', icon: 'air' }
    ],
    rooms: [
      {
        id: 'caldera-cavern-suite',
        name: 'Caldera Cavern Suite',
        bed: 'Built-in Concrete King',
        size: '85 m²',
        capacity: '2 Guests',
        pricePerNight: 610,
        recommended: true,
        description: 'Monolithic chalk stone suite carved into maritime cliff, with private plunge pool, outdoor kitchen, and private sea cove stairs.',
        tags: ['Private Cove', 'Cave Plunge Pool', 'Solar Off-Grid'],
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw3wBfl--Dd9Sy3a3Cih8OE_bAP8puvEIUwMcs6qCDjZ1Id-GJ9Dr1473uDZgmkbOIQUModQOrdpISlvKIupJ04srOOxwN3iUYGFi1DF8wklCK2Uv3M3FgAZczBHVCDqyV5pyqHLseVp4j4jcpM0N5HQuwEIDPeWObMcoVhekWkibTPC7gPrzKthBM-b78gJX-T8R9bm8vCZcks9Qc9jCydvnWFeAl0lOlOxFWzgTN4oZ_g3M2zk5tdA'
      }
    ],
    acousticDecibel: 21.1,
    acousticClassification: 'Gentle Maritime Swell (< 23 dB)',
    ratingsBreakdown: {
      cleanliness: 4.96,
      location: 4.98,
      quietness: 4.92,
      service: 4.95,
      kaiseki: 4.91,
      restorative: 4.97
    },
    testimonials: [
      {
        quote: 'Swimming into the subterranean cave pool as twilight turned the sea violet was magical. Not a sound other than the rhythmic lap of clear water against limestone.',
        author: 'Marcus Brandt',
        origin: 'Berlin',
        date: 'Stayed Aug 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw_hiwyOBlmQ7wIBF4DzDP6msvlyybNh3ZbFppOJSiBUYhZokpca7rLi7zfbW9eg1YGTcMEzqG1JzqpgjI-taqRjiZgvKlFQtMJFm_IMZxlnt-sNY-O4VXE1iU4J9I4kuiygDBNmPkB3ud23ncdjEjnN6LAdOX8FxMsoAr71ttAlxzGjidgCrGXvm7ETA3M6e9vMUiEup65xRIeqaM9hEQXGberHQ6hKfKvCAEtA4VemYDn6AQzYaZGg'
      }
    ],
    mapDetails: {
      zone: 'Protected Cycladic Maritime Zone',
      travelInfo: 'Private solar catamaran transfer from Adamas Port (18 mins).',
      coordinates: '36.7583° N, 24.4539° E'
    }
  }
];

export const CURATED_LANDSCAPES = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    subtitle: 'Bamboo Valley',
    stayCount: 18,
    startingPrice: 380,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLYeTTgn4kBnXsxTxsva-W3FC74lw16siLf4csWH0XkdmoKWaFXAWODPLNJxBE5j3M-7aD_xrqX2V_m5KUJ3XaQFaFc9b9_bhApv-Md2Y7HXt9NbCKbUvjneskEYiInTbIV6mu28YglUnCLmW2eOPhvfW9gM3C2IU3h29m4xsSzdTEo_Dz0vO_dAsMDXyQvFWwz76SQbg1s1TANtZCQ-yQUtcgNoj7-J8B87x3M_Il5VOczF2SmK2QWw'
  },
  {
    id: 'reine',
    name: 'Reine',
    country: 'Norway',
    subtitle: 'Arctic Archipelagos',
    stayCount: 12,
    startingPrice: 420,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZaLOwVjKZoiqrI-4DeHX9kaDP-cjkEGVRiwadr14SBD0p6WCUQNtvyxqos2cdnU7dhfa0PAWVhrLQFsiIF8EyFuvVdoDJNHyLPuxxV6CZJSynC6gpXllVdEkVEAiAvU2H3RxzVjdlhq2GlqB1cl0OZu0XGNamMT9zBGOPHG-axrL1J22HmzHmbts2g0wDnjRZkf6sUwr1niFrzA-sRWW7qMmLqlmDZ6iT4oY3dmtaTes73wSXhcd0cg'
  },
  {
    id: 'dolomites',
    name: 'Dolomites',
    country: 'Italy',
    subtitle: 'Limestone Crags',
    stayCount: 24,
    startingPrice: 490,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzcpMzlKl71T_jodWeJ3iYbLe2QsU-IT8O9hxV5dhOZ4-mkwJsGdrUfjGyJNP8-WcHkWh9BR0JLZ7OtokEa_NteI2iEyQGElgEWjO3ZLqr_Et3ferQcLew5twlaVQPI50kUX-fMuTmzTGyFlMmR8-aCm4CUNg9O2HtcKaF6hx7qpyLLb9M3FkNZIFkjGhLa6R9bBwnt9hq2e17e8vuMHMSraMDOwRiAGAIpUXGsOzAnJP07W3mcI800g'
  },
  {
    id: 'zermatt',
    name: 'Zermatt',
    country: 'Switzerland',
    subtitle: 'Glacial Peaks',
    stayCount: 15,
    startingPrice: 550,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD5iYbdQcEHIuIKxDUUf4-I9lY8V14tYGwzQrXUMOd6822zn84EtWU--me4Ky2Efgo2nLObmT4_-c7qlkiCZAYGCXKhgJJUXC-lGL1q3t1ok6Vy_lPD-kAVcYj8YrH7_AzEy0cK5FWjK-pQfSF8Zfb-xaERNbVsG2S5hV0mdDjOp6PrsAkqOiDp-mntaiS6ez2dCdbO-7kJo0F_7LdInhP10lc_71RiRboJMnRJEuHhzCYUz_SniGUkQ'
  }
];
