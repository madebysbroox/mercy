// The Mass — each major element mapped to its geographic origin or the place
// where it was formalized in the liturgy.  Grouped by the four major divisions.

const massPartColors = {
  introductory: '#c4a35a',   // warm gold
  word: '#7aab7a',           // sage green
  eucharist: '#b05555',      // deep red
  concluding: '#8a7ab0',     // soft violet
}

const massParts = [
  // ──────────────────────── INTRODUCTORY RITES ────────────────────────
  {
    id: 'mass-01',
    name: 'Sign of the Cross',
    section: 'introductory',
    sectionLabel: 'Introductory Rites',
    order: 1,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 150,
    century: '2nd century',
    description:
      'The faithful mark themselves with the sign of the Cross, invoking the Holy Trinity. Early Christians in Jerusalem traced the cross on their foreheads; Tertullian attests to the practice by AD 200.',
    scripture: 'Matthew 28:19',
    liturgicalText: 'In the name of the Father, and of the Son, and of the Holy Spirit.',
    link: 'https://www.wordonfire.org/articles/contributors/a-short-history-of-the-sign-of-the-cross/',
  },
  {
    id: 'mass-02',
    name: 'Penitential Act',
    section: 'introductory',
    sectionLabel: 'Introductory Rites',
    order: 2,
    lat: 41.9028,
    lng: 12.4964,
    origin: 'Rome',
    year: 1050,
    century: '11th century',
    description:
      'The congregation acknowledges their sinfulness and asks for God\'s mercy. The Confiteor ("I confess") was formalized in the Roman liturgy during the medieval period, though penitential prayers opened worship from the earliest centuries.',
    scripture: '1 John 1:8–9',
    liturgicalText: 'I confess to almighty God and to you, my brothers and sisters…',
    link: 'https://en.wikipedia.org/wiki/Confiteor',
  },
  {
    id: 'mass-03',
    name: 'Kyrie Eleison',
    section: 'introductory',
    sectionLabel: 'Introductory Rites',
    order: 3,
    lat: 41.0082,
    lng: 28.9784,
    origin: 'Constantinople',
    year: 350,
    century: '4th century',
    description:
      'The ancient Greek cry "Lord, have mercy" entered Christian worship from the Eastern liturgical tradition. It is one of the few Greek phrases preserved in the Latin Mass, a bridge between East and West.',
    scripture: 'Mark 10:47',
    liturgicalText: 'Kyrie, eleison. Christe, eleison. Kyrie, eleison.',
    link: 'https://www.wordonfire.org/articles/kyrie-eleison/',
  },
  {
    id: 'mass-04',
    name: 'Gloria',
    section: 'introductory',
    sectionLabel: 'Introductory Rites',
    order: 4,
    lat: 31.7300,
    lng: 35.1994,
    origin: 'Bethlehem / Rome',
    year: 300,
    century: '2nd–4th century',
    description:
      'The "Great Doxology" begins with the angels\' hymn at Christ\'s birth. Originally a morning prayer in the East, it was introduced into the Roman Mass by Pope Symmachus around AD 500, initially only for bishops on feast days.',
    scripture: 'Luke 2:14',
    liturgicalText: 'Glory to God in the highest, and on earth peace to people of good will.',
    link: 'https://en.wikipedia.org/wiki/Gloria_in_excelsis_Deo',
  },

  // ──────────────────────── LITURGY OF THE WORD ────────────────────────
  {
    id: 'mass-05',
    name: 'Old Testament Reading',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 5,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 50,
    century: 'Apostolic era',
    description:
      'The reading of the Hebrew Scriptures in Christian worship continues the synagogue practice that Jesus himself participated in. The early Church preserved this link to salvation history as the foundation for understanding the Gospel.',
    scripture: 'Luke 4:16–21',
    liturgicalText: 'The Word of the Lord. — Thanks be to God.',
    link: 'https://www.wordonfire.org/videos/sermons/reading-the-new-testament-in-light-of-the-old/',
  },
  {
    id: 'mass-06',
    name: 'Responsorial Psalm',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 6,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 50,
    century: 'Temple period',
    description:
      'The Psalms of David, sung antiphonally in the Temple, became the prayer book of the Church. The congregation\'s sung response to the lector carries forward three thousand years of worship in the same words.',
    scripture: 'Psalm 150',
    liturgicalText: 'The response varies with the liturgical season.',
    link: 'https://www.wordonfire.org/articles/barron/the-psalms-the-churchs-song-book/',
  },
  {
    id: 'mass-07',
    name: 'Epistle Reading',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 7,
    lat: 37.9392,
    lng: 22.9319,
    origin: 'Corinth / Apostolic Churches',
    year: 50,
    century: '1st century',
    description:
      'Paul\'s letters were read aloud in the assemblies to which they were sent, and then circulated among other churches. This practice of public reading of apostolic writings became a fixed part of the liturgy by the 2nd century.',
    scripture: 'Colossians 4:16',
    liturgicalText: 'The Word of the Lord. — Thanks be to God.',
    link: 'https://en.wikipedia.org/wiki/Epistle_in_the_liturgy',
  },
  {
    id: 'mass-08',
    name: 'Gospel Acclamation',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 8,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 100,
    century: 'Ancient',
    description:
      '"Alleluia" — Praise the Lord — is a Hebrew liturgical acclamation from Temple worship. The congregation stands and sings it to greet the proclamation of the Gospel, acknowledging the presence of Christ in his Word.',
    scripture: 'Revelation 19:1–6',
    liturgicalText: 'Alleluia, alleluia!',
    link: 'https://en.wikipedia.org/wiki/Gospel_acclamation',
  },
  {
    id: 'mass-09',
    name: 'Gospel Reading',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 9,
    lat: 32.8831,
    lng: 35.4961,
    origin: 'Galilee / Holy Land',
    year: 50,
    century: '1st century',
    description:
      'The highpoint of the Liturgy of the Word: the deacon or priest proclaims the words and deeds of Jesus from the four Gospels. The assembly stands in reverence, as the living voice of Christ speaks to his Church.',
    scripture: 'John 1:14',
    liturgicalText: 'The Gospel of the Lord. — Praise to you, Lord Jesus Christ.',
    link: 'https://en.wikipedia.org/wiki/Gospel_reading',
  },
  {
    id: 'mass-10',
    name: 'Homily',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 10,
    lat: 36.2028,
    lng: 36.1500,
    origin: 'Antioch',
    year: 50,
    century: '1st century',
    description:
      'Following the Jewish synagogue tradition, the early Church included an explanation of the Scriptures. The great homilists of Antioch — Ignatius, John Chrysostom — shaped this tradition of breaking open the Word for the assembly.',
    scripture: 'Nehemiah 8:8',
    liturgicalText: 'No fixed text — the homilist speaks from the readings of the day.',
    link: 'https://www.wordonfire.org/articles/8-elements-of-a-phenomenal-homily/',
  },
  {
    id: 'mass-11',
    name: 'Nicene Creed',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 11,
    lat: 40.4293,
    lng: 29.7213,
    origin: 'Nicaea / Constantinople',
    year: 325,
    century: 'AD 325 / 381',
    description:
      'The profession of faith formulated at the Councils of Nicaea (325) and Constantinople (381) in response to heresies. The entire congregation professes the core truths of the faith together, a living link to the early Church Fathers.',
    scripture: '1 Corinthians 15:3–5',
    liturgicalText: 'I believe in one God, the Father almighty, maker of heaven and earth…',
    link: 'https://www.wordonfire.org/articles/barron/the-eloquent-ambiguity-of-i-believe/',
  },
  {
    id: 'mass-12',
    name: 'Prayer of the Faithful',
    section: 'word',
    sectionLabel: 'Liturgy of the Word',
    order: 12,
    lat: 41.9028,
    lng: 12.4964,
    origin: 'Rome / Antioch',
    year: 155,
    century: '2nd century',
    description:
      'The baptized exercise their priestly office by interceding for the Church and the world. Justin Martyr describes this practice in Rome around AD 155: after the readings, "we offer prayers in common for ourselves and for all others."',
    scripture: '1 Timothy 2:1–2',
    liturgicalText: 'Lord, hear our prayer.',
    link: 'https://www.wordonfire.org/articles/praying-for-the-world-on-good-friday/',
  },

  // ──────────────────────── LITURGY OF THE EUCHARIST ────────────────────────
  {
    id: 'mass-13',
    name: 'Offertory',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 13,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 50,
    century: '1st century',
    description:
      'Bread and wine are brought to the altar, echoing both the Temple offerings and Melchizedek\'s offering of bread and wine. The prayers "Blessed are you, Lord God of all creation" derive from ancient Jewish blessings (berakot).',
    scripture: 'Genesis 14:18; Hebrews 7:1–3',
    liturgicalText: 'Blessed are you, Lord God of all creation, for through your goodness we have received the bread we offer you…',
    link: 'https://www.wordonfire.org/articles/at-the-offertory-therefore/',
  },
  {
    id: 'mass-14',
    name: 'Preface & Sanctus',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 14,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem / Rome',
    year: 250,
    century: '1st–4th century',
    description:
      'The Preface is a solemn prayer of thanksgiving leading to the Sanctus — "Holy, Holy, Holy" — drawn from Isaiah\'s vision of the heavenly liturgy in the Temple. Earth joins the worship of the angels and saints.',
    scripture: 'Isaiah 6:3; Revelation 4:8',
    liturgicalText: 'Holy, Holy, Holy Lord God of hosts. Heaven and earth are full of your glory.',
    link: 'https://en.wikipedia.org/wiki/Sanctus',
  },
  {
    id: 'mass-15',
    name: 'Eucharistic Prayer & Consecration',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 15,
    lat: 31.7718,
    lng: 35.2280,
    origin: 'Jerusalem — the Upper Room',
    year: 33,
    century: 'AD 33',
    description:
      'The summit of the Mass: the priest speaks Christ\'s own words over the bread and wine — "This is my Body… This is the chalice of my Blood." The sacrifice of Calvary is made present on the altar. The Church has faithfully repeated these words since the Last Supper.',
    scripture: 'Luke 22:19–20; 1 Corinthians 11:23–26',
    liturgicalText: 'Take this, all of you, and eat of it, for this is my Body, which will be given up for you.',
    link: 'https://www.wordonfire.org/articles/the-eucharist-as-thanksgiving/',
  },
  {
    id: 'mass-16',
    name: 'The Our Father',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 16,
    lat: 32.8831,
    lng: 35.4961,
    origin: 'Galilee',
    year: 30,
    century: 'Ministry of Jesus',
    description:
      'The prayer that Jesus himself taught his disciples. The Didache (c. AD 90) instructs Christians to pray it three times daily. In the Mass it prepares the faithful for Communion — "Give us this day our daily bread."',
    scripture: 'Matthew 6:9–13',
    liturgicalText: 'Our Father, who art in heaven, hallowed be thy name…',
    link: 'https://www.wordonfire.org/videos/sermons/what-is-the-lords-prayer-about/',
  },
  {
    id: 'mass-17',
    name: 'Sign of Peace',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 17,
    lat: 41.9028,
    lng: 12.4964,
    origin: 'Rome',
    year: 150,
    century: '2nd century',
    description:
      'The faithful exchange a sign of reconciliation and charity before receiving Communion, fulfilling Christ\'s command to be reconciled before approaching the altar. Justin Martyr and Hippolytus describe this "holy kiss" in the Roman liturgy.',
    scripture: 'Matthew 5:23–24; Romans 16:16',
    liturgicalText: 'The peace of the Lord be with you always. — And with your spirit.',
    link: 'https://en.wikipedia.org/wiki/Kiss_of_peace',
  },
  {
    id: 'mass-18',
    name: 'Agnus Dei',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 18,
    lat: 41.9028,
    lng: 12.4964,
    origin: 'Rome',
    year: 700,
    century: '7th century',
    description:
      'Pope Sergius I — of Syrian origin — introduced the singing of "Lamb of God" during the fraction rite around AD 700. The chant echoes the words of John the Baptist and the vision of the Lamb in Revelation.',
    scripture: 'John 1:29; Revelation 5:6–12',
    liturgicalText: 'Lamb of God, you take away the sins of the world, have mercy on us.',
    link: 'https://www.wordonfire.org/videos/sermons/behold-the-lamb-of-god/',
  },
  {
    id: 'mass-19',
    name: 'Holy Communion',
    section: 'eucharist',
    sectionLabel: 'Liturgy of the Eucharist',
    order: 19,
    lat: 31.7718,
    lng: 35.2280,
    origin: 'Jerusalem — the Upper Room',
    year: 33,
    century: 'AD 33',
    description:
      'The faithful receive the Body and Blood of Christ, fulfilling his command "Do this in remembrance of me." From the earliest days the Church gathered on the Lord\'s Day for the "breaking of bread," the center of Christian life.',
    scripture: 'John 6:53–56; Acts 2:42',
    liturgicalText: 'The Body of Christ. — Amen.',
    link: 'https://www.wordonfire.org/presence/',
  },

  // ──────────────────────── CONCLUDING RITES ────────────────────────
  {
    id: 'mass-20',
    name: 'Final Blessing',
    section: 'concluding',
    sectionLabel: 'Concluding Rites',
    order: 20,
    lat: 31.7784,
    lng: 35.2346,
    origin: 'Jerusalem',
    year: 50,
    century: 'Apostolic era',
    description:
      'The priest blesses the assembly in the name of the Holy Trinity, continuing the ancient priestly blessing of Israel. The People of God are sent forth strengthened by Word and Sacrament.',
    scripture: 'Numbers 6:24–26',
    liturgicalText: 'May almighty God bless you, the Father, and the Son, and the Holy Spirit.',
    link: 'https://en.wikipedia.org/wiki/Priestly_blessing',
  },
  {
    id: 'mass-21',
    name: 'Dismissal — Ite, Missa Est',
    section: 'concluding',
    sectionLabel: 'Concluding Rites',
    order: 21,
    lat: 41.9028,
    lng: 12.4964,
    origin: 'Rome',
    year: 450,
    century: '5th century',
    description:
      'The Latin dismissal "Ite, missa est" — "Go, you are sent" — gives the Mass its very name. It is not merely an ending but a commissioning: the faithful are sent into the world to live what they have celebrated.',
    scripture: 'Matthew 28:19–20',
    liturgicalText: 'Go forth, the Mass is ended. — Thanks be to God.',
    link: 'https://en.wikipedia.org/wiki/Ite,_missa_est',
  },
]

// Arcs connecting consecutive parts of the Mass by their geographic origins,
// showing how the liturgy draws from across the ancient Christian world.
function buildMassArcs() {
  const arcsOut = []
  for (let i = 0; i < massParts.length - 1; i++) {
    const from = massParts[i]
    const to = massParts[i + 1]
    // Skip arcs between points at the same location
    const dist = Math.abs(from.lat - to.lat) + Math.abs(from.lng - to.lng)
    if (dist < 0.5) continue
    arcsOut.push({
      id: `mass-arc-${i}`,
      startLat: from.lat,
      startLng: from.lng,
      endLat: to.lat,
      endLng: to.lng,
      section: to.section,
      order: i,
    })
  }
  return arcsOut
}

const massArcs = buildMassArcs()

export { massParts, massArcs, massPartColors }
