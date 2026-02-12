// The spread of Christianity — key moments in the Church's geographic
// expansion from the Upper Room to every continent.
// Entries are ordered chronologically.

const eraColors = {
  apostolic: '#d4a853',     // warm gold — Apostolic Age
  roman: '#c97a5a',         // terracotta — Roman Empire era
  medieval: '#7a9ac9',      // steel blue — medieval expansion
  colonial: '#8ab87a',      // muted green — age of exploration
  modern: '#c9a0dc',        // lavender — modern missions
}

const spreadEvents = [
  // ──────────────────────── APOSTOLIC AGE ────────────────────────
  {
    id: 'sp-01',
    name: 'Pentecost',
    location: 'Jerusalem',
    lat: 31.7784,
    lng: 35.2346,
    year: 33,
    yearDisplay: 'c. AD 33',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'The Holy Spirit descends upon the Apostles in the Upper Room. Peter preaches and three thousand are baptized. The Church is born and begins to spread from Jerusalem.',
    keyFigure: 'The Apostles',
    scripture: 'Acts 2:1–41',
    link: 'https://en.wikipedia.org/wiki/Pentecost',
  },
  {
    id: 'sp-02',
    name: 'The Church in Antioch',
    location: 'Antioch (Antakya, Turkey)',
    lat: 36.2028,
    lng: 36.1500,
    year: 40,
    yearDisplay: 'c. AD 40',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'Believers fleeing persecution in Jerusalem preach to Greeks in Antioch. It is here that disciples are first called "Christians." Antioch becomes the launchpad for Paul\'s missionary journeys.',
    keyFigure: 'Sts. Paul & Barnabas',
    scripture: 'Acts 11:19–26',
    link: 'https://en.wikipedia.org/wiki/Church_of_Antioch',
  },
  {
    id: 'sp-03',
    name: 'Paul in Corinth',
    location: 'Corinth, Greece',
    lat: 37.9392,
    lng: 22.9319,
    year: 50,
    yearDisplay: 'c. AD 50',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'Paul spends eighteen months establishing one of the most important early communities. His letters to the Corinthians are among the earliest written documents of Christianity.',
    keyFigure: 'St. Paul',
    scripture: 'Acts 18:1–11',
    link: 'https://en.wikipedia.org/wiki/First_Epistle_to_the_Corinthians',
  },
  {
    id: 'sp-04',
    name: 'Paul in Ephesus',
    location: 'Ephesus (Selçuk, Turkey)',
    lat: 37.9396,
    lng: 27.3417,
    year: 53,
    yearDisplay: 'c. AD 53–56',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'Paul teaches daily in the hall of Tyrannus for two years, so that "all who lived in Asia heard the word of the Lord." Ephesus becomes a center of Christianity in Asia Minor.',
    keyFigure: 'St. Paul',
    scripture: 'Acts 19:1–10',
    link: 'https://en.wikipedia.org/wiki/Ephesus',
  },
  {
    id: 'sp-05',
    name: 'Peter & Paul in Rome',
    location: 'Rome, Italy',
    lat: 41.9028,
    lng: 12.4964,
    year: 60,
    yearDisplay: 'c. AD 60–67',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'Both Peter and Paul bring the Gospel to the heart of the Roman Empire. Their martyrdom under Nero consecrates Rome as the center of the Western Church and the See of Peter.',
    keyFigure: 'Sts. Peter & Paul',
    scripture: 'Romans 1:7–15',
    link: 'https://en.wikipedia.org/wiki/Saint_Peter',
  },
  {
    id: 'sp-06',
    name: 'Thomas in India',
    location: 'Kerala, India',
    lat: 9.9312,
    lng: 76.2673,
    year: 52,
    yearDisplay: 'c. AD 52',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'According to strong tradition, the Apostle Thomas traveled to the Malabar Coast, establishing Christian communities that endure to this day as the Syro-Malabar and Syro-Malankara Churches — among the oldest in the world.',
    keyFigure: 'St. Thomas the Apostle',
    scripture: 'John 20:24–29',
    link: 'https://en.wikipedia.org/wiki/Saint_Thomas_Christians',
  },
  {
    id: 'sp-07',
    name: 'Mark in Alexandria',
    location: 'Alexandria, Egypt',
    lat: 31.2001,
    lng: 29.9187,
    year: 60,
    yearDisplay: 'c. AD 60',
    era: 'apostolic',
    eraLabel: 'Apostolic Age',
    description:
      'The evangelist Mark founds the Church in Alexandria, which becomes one of the great patriarchates and a center of Christian theology. The Catechetical School of Alexandria produces Clement and Origen.',
    keyFigure: 'St. Mark the Evangelist',
    scripture: 'Mark 16:15',
    link: 'https://en.wikipedia.org/wiki/Mark_the_Evangelist',
  },

  // ──────────────────────── ROMAN EMPIRE ERA ────────────────────────
  {
    id: 'sp-08',
    name: 'Christianity in Lyon',
    location: 'Lyon, France',
    lat: 45.7578,
    lng: 4.8320,
    year: 177,
    yearDisplay: 'AD 177',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'The martyrs of Lyon and Vienne, including the slave girl Blandina, bear witness under brutal persecution. Their bishop Irenaeus, a disciple of Polycarp who knew the Apostle John, becomes a pillar of orthodox theology.',
    keyFigure: 'St. Irenaeus of Lyon',
    link: 'https://en.wikipedia.org/wiki/Irenaeus',
  },
  {
    id: 'sp-09',
    name: 'Christianity in Carthage',
    location: 'Carthage (Tunis, Tunisia)',
    lat: 36.8525,
    lng: 10.3234,
    year: 200,
    yearDisplay: 'c. AD 200',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'North Africa becomes a powerhouse of Latin Christianity. Tertullian writes the first major theological works in Latin; later, Cyprian as bishop and Augustine of nearby Hippo shape Western theology for centuries.',
    keyFigure: 'Tertullian, St. Cyprian, St. Augustine',
    link: 'https://en.wikipedia.org/wiki/Christianity_in_Africa#North_Africa',
  },
  {
    id: 'sp-10',
    name: 'Conversion of Armenia',
    location: 'Etchmiadzin, Armenia',
    lat: 40.1633,
    lng: 44.2919,
    year: 301,
    yearDisplay: 'AD 301',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'King Tiridates III is baptized by Gregory the Illuminator, making Armenia the first nation to adopt Christianity as its state religion — even before the Roman Empire.',
    keyFigure: 'St. Gregory the Illuminator',
    link: 'https://en.wikipedia.org/wiki/Armenian_Apostolic_Church',
  },
  {
    id: 'sp-11',
    name: 'Edict of Milan',
    location: 'Milan, Italy',
    lat: 45.4642,
    lng: 9.1900,
    year: 313,
    yearDisplay: 'AD 313',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'Emperor Constantine and Licinius issue the Edict of Milan, granting religious tolerance throughout the Roman Empire. Three centuries of intermittent persecution end, and Christianity can worship freely.',
    keyFigure: 'Emperor Constantine',
    link: 'https://en.wikipedia.org/wiki/Edict_of_Milan',
  },
  {
    id: 'sp-12',
    name: 'Conversion of Ethiopia',
    location: 'Axum, Ethiopia',
    lat: 14.1211,
    lng: 38.7467,
    year: 330,
    yearDisplay: 'c. AD 330',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'King Ezana of Axum converts to Christianity through the influence of Frumentius, who is consecrated the first bishop of Ethiopia by Athanasius of Alexandria. The Ethiopian Orthodox Church traces its roots to this moment.',
    keyFigure: 'St. Frumentius',
    link: 'https://en.wikipedia.org/wiki/Ethiopian_Orthodox_Tewahedo_Church',
  },
  {
    id: 'sp-13',
    name: 'Conversion of Georgia',
    location: 'Mtskheta, Georgia',
    lat: 41.8447,
    lng: 44.7178,
    year: 337,
    yearDisplay: 'c. AD 337',
    era: 'roman',
    eraLabel: 'Roman Empire',
    description:
      'St. Nino, a captive woman from Cappadocia, converts King Mirian III and Queen Nana of Iberia (Georgia). The Georgian Orthodox Church is one of the oldest Christian communities in the world.',
    keyFigure: 'St. Nino',
    link: 'https://en.wikipedia.org/wiki/Nino_(saint)',
  },

  // ──────────────────────── MEDIEVAL EXPANSION ────────────────────────
  {
    id: 'sp-14',
    name: 'Mission to Ireland',
    location: 'Armagh, Ireland',
    lat: 54.3503,
    lng: -6.6528,
    year: 432,
    yearDisplay: 'AD 432',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'St. Patrick, a former slave, returns to Ireland as a bishop and missionary. Within a generation, Ireland is transformed into a center of Christian learning that will later re-evangelize much of Europe.',
    keyFigure: 'St. Patrick',
    link: 'https://en.wikipedia.org/wiki/Saint_Patrick',
  },
  {
    id: 'sp-15',
    name: 'Baptism of Clovis',
    location: 'Reims, France',
    lat: 49.2583,
    lng: 4.0317,
    year: 496,
    yearDisplay: 'AD 496',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'King Clovis I of the Franks is baptized by St. Remigius, bringing the most powerful Germanic kingdom into Catholic Christianity. France becomes "the eldest daughter of the Church."',
    keyFigure: 'St. Remigius',
    link: 'https://en.wikipedia.org/wiki/Clovis_I#Conversion_to_Catholicism',
  },
  {
    id: 'sp-16',
    name: 'Mission to England',
    location: 'Canterbury, England',
    lat: 51.2802,
    lng: 1.0789,
    year: 597,
    yearDisplay: 'AD 597',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'Pope Gregory the Great sends Augustine and forty monks to the Anglo-Saxons. King Ethelbert of Kent converts, and Canterbury becomes the mother church of English Christianity.',
    keyFigure: 'St. Augustine of Canterbury',
    link: 'https://en.wikipedia.org/wiki/Augustine_of_Canterbury',
  },
  {
    id: 'sp-17',
    name: 'Baptism of the Rus\'',
    location: 'Kyiv, Ukraine',
    lat: 50.4501,
    lng: 30.5234,
    year: 988,
    yearDisplay: 'AD 988',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'Grand Prince Vladimir of Kyiv receives baptism and orders the baptism of his people in the Dnieper River. Christianity spreads across the vast lands of Kievan Rus\', shaping the civilization of Eastern Europe.',
    keyFigure: 'St. Vladimir the Great',
    link: 'https://en.wikipedia.org/wiki/Baptism_of_Kyiv',
  },
  {
    id: 'sp-18',
    name: 'Conversion of Scandinavia',
    location: 'Trondheim, Norway',
    lat: 63.4305,
    lng: 10.3951,
    year: 1000,
    yearDisplay: 'c. AD 1000',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'Norway, Denmark, Iceland, and Sweden gradually embrace Christianity between the 10th and 12th centuries. The Nidaros Cathedral at Trondheim becomes the northernmost major pilgrimage site in Christendom.',
    keyFigure: 'St. Olaf of Norway',
    link: 'https://en.wikipedia.org/wiki/Christianization_of_Scandinavia',
  },
  {
    id: 'sp-19',
    name: 'Conversion of Lithuania',
    location: 'Vilnius, Lithuania',
    lat: 54.6872,
    lng: 25.2797,
    year: 1387,
    yearDisplay: 'AD 1387',
    era: 'medieval',
    eraLabel: 'Medieval Expansion',
    description:
      'Grand Duke Jogaila is baptized and Lithuania, the last pagan state in Europe, officially becomes Catholic. The baptism unites Lithuania and Poland in a personal union that will endure for centuries.',
    keyFigure: 'King Władysław II Jagiełło',
    link: 'https://en.wikipedia.org/wiki/Christianization_of_Lithuania',
  },

  // ──────────────────────── AGE OF EXPLORATION ────────────────────────
  {
    id: 'sp-20',
    name: 'Our Lady of Guadalupe & the Americas',
    location: 'Mexico City, Mexico',
    lat: 19.4853,
    lng: -99.1195,
    year: 1531,
    yearDisplay: 'AD 1531',
    era: 'colonial',
    eraLabel: 'Age of Exploration',
    description:
      'Following the apparition of Our Lady of Guadalupe to Juan Diego, nine million indigenous people are baptized within a decade. Latin America becomes the most Catholic continent on earth.',
    keyFigure: 'St. Juan Diego',
    link: 'https://en.wikipedia.org/wiki/Our_Lady_of_Guadalupe',
  },
  {
    id: 'sp-21',
    name: 'Francis Xavier in Japan',
    location: 'Kagoshima, Japan',
    lat: 31.5966,
    lng: 130.5571,
    year: 1549,
    yearDisplay: 'AD 1549',
    era: 'colonial',
    eraLabel: 'Age of Exploration',
    description:
      'The Jesuit missionary Francis Xavier arrives in Kagoshima and begins evangelizing Japan. Within decades there are hundreds of thousands of Japanese Christians — a community that will endure even through centuries of persecution.',
    keyFigure: 'St. Francis Xavier',
    link: 'https://en.wikipedia.org/wiki/Francis_Xavier',
  },
  {
    id: 'sp-22',
    name: 'Christianity in the Philippines',
    location: 'Cebu, Philippines',
    lat: 10.3157,
    lng: 123.8854,
    year: 1521,
    yearDisplay: 'AD 1521',
    era: 'colonial',
    eraLabel: 'Age of Exploration',
    description:
      'Magellan\'s expedition plants the cross in Cebu and baptizes Chief Humabon and hundreds of islanders. The Philippines becomes the only predominantly Catholic nation in Asia, a faith deeply woven into Filipino identity.',
    keyFigure: 'Ferdinand Magellan',
    link: 'https://en.wikipedia.org/wiki/Christianity_in_the_Philippines',
  },
  {
    id: 'sp-23',
    name: 'Jesuit Missions in South America',
    location: 'São Miguel das Missões, Brazil',
    lat: -28.5564,
    lng: -54.5558,
    year: 1609,
    yearDisplay: 'AD 1609–1767',
    era: 'colonial',
    eraLabel: 'Age of Exploration',
    description:
      'The Jesuit Reductions create self-governing Christian communities among the Guaraní people across present-day Paraguay, Argentina, and Brazil. At their height, over 100,000 indigenous people live in these missions.',
    keyFigure: 'Society of Jesus',
    link: 'https://en.wikipedia.org/wiki/Jesuit_reductions',
  },
  {
    id: 'sp-24',
    name: 'Matteo Ricci in China',
    location: 'Beijing, China',
    lat: 39.9042,
    lng: 116.4074,
    year: 1601,
    yearDisplay: 'AD 1601',
    era: 'colonial',
    eraLabel: 'Age of Exploration',
    description:
      'The Jesuit Matteo Ricci gains access to the imperial court in Beijing, pioneering a mission of inculturation — presenting Christianity through Chinese philosophical categories and earning the respect of scholars.',
    keyFigure: 'Matteo Ricci, S.J.',
    link: 'https://en.wikipedia.org/wiki/Matteo_Ricci',
  },

  // ──────────────────────── MODERN MISSIONS ────────────────────────
  {
    id: 'sp-25',
    name: 'Martyrs of Korea',
    location: 'Seoul, South Korea',
    lat: 37.5665,
    lng: 126.9780,
    year: 1784,
    yearDisplay: 'AD 1784–1866',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'Uniquely in Church history, Korean Catholicism is founded not by foreign missionaries but by lay scholars who discovered the faith through Chinese texts. Over 10,000 martyrs bear witness during waves of persecution.',
    keyFigure: 'St. Andrew Kim Taegon & companions',
    link: 'https://en.wikipedia.org/wiki/Korean_Martyrs',
  },
  {
    id: 'sp-26',
    name: 'Missions to Sub-Saharan Africa',
    location: 'Bagamoyo, Tanzania',
    lat: -6.4394,
    lng: 38.9019,
    year: 1868,
    yearDisplay: 'AD 1868',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'The Holy Ghost Fathers establish one of the first mission stations in East Africa at Bagamoyo. The 19th and 20th centuries see explosive growth; by 2025, Africa has the fastest-growing Catholic population in the world.',
    keyFigure: 'Spiritan Missionaries',
    link: 'https://en.wikipedia.org/wiki/Christianity_in_Africa',
  },
  {
    id: 'sp-27',
    name: 'Martyrs of Uganda',
    location: 'Namugongo, Uganda',
    lat: 0.3781,
    lng: 32.6083,
    year: 1886,
    yearDisplay: 'AD 1886',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'Twenty-two Catholic and twenty-three Anglican converts are martyred on the orders of Kabaka Mwanga II. Their witness ignites the faith in East Africa; today Uganda is one of the most Christian nations on the continent.',
    keyFigure: 'St. Charles Lwanga & companions',
    link: 'https://en.wikipedia.org/wiki/Uganda_Martyrs',
  },
  {
    id: 'sp-28',
    name: 'The Church in Oceania',
    location: 'Sydney, Australia',
    lat: -33.8688,
    lng: 151.2093,
    year: 1820,
    yearDisplay: '19th century',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'Irish convicts and settlers bring the faith to Australia; Marist and other missionaries carry it across the Pacific Islands. World Youth Day 2008 in Sydney signals Oceania\'s place in the global Church.',
    keyFigure: 'Fr. John Joseph Therry & Marist Fathers',
    link: 'https://en.wikipedia.org/wiki/Catholic_Church_in_Australia',
  },
  {
    id: 'sp-29',
    name: 'Growth in Vietnam',
    location: 'Ho Chi Minh City, Vietnam',
    lat: 10.8231,
    lng: 106.6297,
    year: 1624,
    yearDisplay: 'AD 1624–present',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'Alexandre de Rhodes and Jesuit missionaries bring Christianity to Vietnam, creating the Vietnamese romanized script (Quốc Ngữ) in the process. Despite centuries of persecution, Vietnam has nearly seven million Catholics today.',
    keyFigure: 'Alexandre de Rhodes, S.J.; Vietnamese Martyrs',
    link: 'https://en.wikipedia.org/wiki/Catholic_Church_in_Vietnam',
  },
  {
    id: 'sp-30',
    name: 'The Church in the United States',
    location: 'Baltimore, Maryland, USA',
    lat: 39.2904,
    lng: -76.6122,
    year: 1789,
    yearDisplay: 'AD 1789',
    era: 'modern',
    eraLabel: 'Modern Missions',
    description:
      'John Carroll is appointed the first Catholic bishop in the United States. From a small, marginalized community, American Catholicism grows through waves of immigration to become the nation\'s largest single denomination.',
    keyFigure: 'Bishop John Carroll',
    link: 'https://en.wikipedia.org/wiki/John_Carroll_(bishop)',
  },
]

// Build arcs showing the chronological spread —
// each event connects to the next, tracing the faith's movement.
function buildSpreadArcs() {
  const arcsOut = []
  for (let i = 0; i < spreadEvents.length - 1; i++) {
    const from = spreadEvents[i]
    const to = spreadEvents[i + 1]
    const dist = Math.abs(from.lat - to.lat) + Math.abs(from.lng - to.lng)
    if (dist < 0.5) continue
    arcsOut.push({
      id: `sp-arc-${i}`,
      startLat: from.lat,
      startLng: from.lng,
      endLat: to.lat,
      endLng: to.lng,
      era: to.era,
      order: i,
    })
  }
  return arcsOut
}

const spreadArcs = buildSpreadArcs()

export { spreadEvents, spreadArcs, eraColors }
