// Locations of Jesus's life and ministry, in roughly chronological order.
// Coordinates are approximate centers of the ancient sites.

const locations = [
  {
    id: 1,
    name: 'Bethlehem',
    lat: 31.7054,
    lng: 35.2024,
    category: 'birth',
    period: 'Birth & Infancy',
    description: 'Birthplace of Jesus, in a manger because there was no room at the inn.',
    scripture: 'Luke 2:1-20; Matthew 2:1-12',
  },
  {
    id: 2,
    name: 'Egypt',
    lat: 30.0444,
    lng: 31.2357,
    category: 'infancy',
    period: 'Birth & Infancy',
    description:
      'The Holy Family fled to Egypt to escape King Herod\'s massacre of the innocents.',
    scripture: 'Matthew 2:13-15',
  },
  {
    id: 3,
    name: 'Nazareth',
    lat: 32.6996,
    lng: 35.3035,
    category: 'childhood',
    period: 'Hidden Life',
    description:
      'Jesus grew up here in the home of Mary and Joseph, living a hidden life of prayer and labor for roughly thirty years.',
    scripture: 'Luke 2:39-40, 51-52',
  },
  {
    id: 4,
    name: 'Jerusalem (Temple)',
    lat: 31.7781,
    lng: 35.2354,
    category: 'childhood',
    period: 'Hidden Life',
    description:
      'At age twelve, Jesus was found teaching in the Temple, astonishing the elders with his understanding.',
    scripture: 'Luke 2:41-50',
  },
  {
    id: 5,
    name: 'Jordan River',
    lat: 31.8367,
    lng: 35.5504,
    category: 'baptism',
    period: 'Beginning of Ministry',
    description:
      'Jesus was baptized by John the Baptist. The heavens opened and the Spirit descended like a dove.',
    scripture: 'Matthew 3:13-17; Mark 1:9-11',
  },
  {
    id: 6,
    name: 'Judean Desert',
    lat: 31.55,
    lng: 35.38,
    category: 'ministry',
    period: 'Beginning of Ministry',
    description:
      'Jesus fasted forty days and forty nights and was tempted by the devil three times.',
    scripture: 'Matthew 4:1-11; Luke 4:1-13',
  },
  {
    id: 7,
    name: 'Cana',
    lat: 32.7504,
    lng: 35.3391,
    category: 'miracle',
    period: 'Galilean Ministry',
    description:
      'At a wedding feast, Jesus performed his first public miracle, turning water into wine at Mary\'s request.',
    scripture: 'John 2:1-11',
  },
  {
    id: 8,
    name: 'Capernaum',
    lat: 32.8803,
    lng: 35.5753,
    category: 'ministry',
    period: 'Galilean Ministry',
    description:
      'The center of Jesus\'s Galilean ministry. He taught in the synagogue, healed the sick, and called his first disciples.',
    scripture: 'Matthew 4:13; Mark 1:21-34',
  },
  {
    id: 9,
    name: 'Sea of Galilee',
    lat: 32.8231,
    lng: 35.5831,
    category: 'miracle',
    period: 'Galilean Ministry',
    description:
      'Jesus calmed the storm, walked on water, and called fishermen to become fishers of men.',
    scripture: 'Matthew 14:22-33; Mark 4:35-41',
  },
  {
    id: 10,
    name: 'Bethsaida',
    lat: 32.9073,
    lng: 35.6303,
    category: 'miracle',
    period: 'Galilean Ministry',
    description:
      'Near here, Jesus fed five thousand people with five loaves and two fish.',
    scripture: 'Luke 9:10-17; John 6:1-15',
  },
  {
    id: 11,
    name: 'Mount Tabor',
    lat: 32.6869,
    lng: 35.3914,
    category: 'miracle',
    period: 'Galilean Ministry',
    description:
      'Traditional site of the Transfiguration, where Jesus appeared in glory with Moses and Elijah.',
    scripture: 'Matthew 17:1-9; Mark 9:2-8',
  },
  {
    id: 12,
    name: 'Tyre & Sidon',
    lat: 33.2705,
    lng: 35.2038,
    category: 'ministry',
    period: 'Beyond Galilee',
    description:
      'Jesus traveled to this Gentile region and healed the daughter of a Canaanite woman who showed great faith.',
    scripture: 'Matthew 15:21-28; Mark 7:24-30',
  },
  {
    id: 13,
    name: 'Caesarea Philippi',
    lat: 33.2484,
    lng: 35.6944,
    category: 'ministry',
    period: 'Beyond Galilee',
    description:
      'Peter proclaimed, "You are the Christ, the Son of the living God." Jesus gave him the keys of the Kingdom.',
    scripture: 'Matthew 16:13-20',
  },
  {
    id: 14,
    name: 'Samaria (Sychar)',
    lat: 32.2132,
    lng: 35.2851,
    category: 'ministry',
    period: 'Journeys to Jerusalem',
    description:
      'At Jacob\'s Well, Jesus spoke with the Samaritan woman, revealing himself as the living water.',
    scripture: 'John 4:1-42',
  },
  {
    id: 15,
    name: 'Jericho',
    lat: 31.8611,
    lng: 35.4617,
    category: 'ministry',
    period: 'Journeys to Jerusalem',
    description:
      'Jesus healed the blind Bartimaeus and called the tax collector Zacchaeus down from a sycamore tree.',
    scripture: 'Mark 10:46-52; Luke 19:1-10',
  },
  {
    id: 16,
    name: 'Bethany',
    lat: 31.7714,
    lng: 35.2576,
    category: 'miracle',
    period: 'Journeys to Jerusalem',
    description:
      'Home of Lazarus, Martha, and Mary. Jesus raised Lazarus from the dead after four days in the tomb.',
    scripture: 'John 11:1-44',
  },
  {
    id: 17,
    name: 'Jerusalem (Passion)',
    lat: 31.7784,
    lng: 35.2296,
    category: 'passion',
    period: 'Passion, Death & Resurrection',
    description:
      'Jesus entered Jerusalem on Palm Sunday, celebrated the Last Supper, was arrested in Gethsemane, tried, crucified at Golgotha, and buried in the nearby tomb.',
    scripture: 'Matthew 26-28; Mark 14-16; Luke 22-24; John 18-20',
  },
  {
    id: 18,
    name: 'Mount of Olives',
    lat: 31.7781,
    lng: 35.2451,
    category: 'ascension',
    period: 'Passion, Death & Resurrection',
    description:
      'After appearing to his disciples for forty days following his Resurrection, Jesus ascended into heaven from the Mount of Olives.',
    scripture: 'Acts 1:9-12; Luke 24:50-53',
  },
]

// Build arcs connecting consecutive locations to trace the journey
const arcs = locations.slice(0, -1).map((loc, i) => ({
  startLat: loc.lat,
  startLng: loc.lng,
  endLat: locations[i + 1].lat,
  endLng: locations[i + 1].lng,
  fromName: loc.name,
  toName: locations[i + 1].name,
  order: i,
}))

// Color palette by category
const categoryColors = {
  birth: '#e8c44a',
  infancy: '#e8c44a',
  childhood: '#7ec8e3',
  baptism: '#4a90d9',
  ministry: '#c9a0dc',
  miracle: '#f0a35c',
  passion: '#d94a4a',
  ascension: '#fafad2',
}

export { locations, arcs, categoryColors }
