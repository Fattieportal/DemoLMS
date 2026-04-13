import { Module, Quiz } from "./types";

export const modules: Module[] = [
  {
    id: "module-1",
    title: "Verkeersregels",
    description: "Leer de basisregels van het Nederlandse verkeer.",
    lessonsCount: 6,
    completedLessons: 6,
    color: "from-blue-500 to-blue-700",
    icon: "\uD83D\uDEA6",
    lessons: [
      {
        id: "m1-l1",
        title: "Maximumsnelheden",
        duration: "5 min",
        completed: true,
        locked: false,
        description:
          "In deze les leer je de maximumsnelheden op verschillende wegtypen: binnen de bebouwde kom (50 km/u), buiten de bebouwde kom (80 km/u), op provinciale wegen en op de snelweg (130 km/u).",
        keyPoints: [
          "Binnen de bebouwde kom: 50 km/u",
          "Buiten de bebouwde kom: 80 km/u",
          "Snelweg: 100 of 130 km/u",
          "Speciale zones: 30 km/u en 60 km/u",
        ],
      },
      {
        id: "m1-l2",
        title: "Stopafstand en reactietijd",
        duration: "8 min",
        completed: true,
        locked: false,
        description:
          "Ontdek hoe remafstand en reactietijd samen de totale stopafstand bepalen, en hoe factoren als snelheid, vermoeidheid en wegdek hierbij een rol spelen.",
        keyPoints: [
          "Reactietijd is gemiddeld 1 seconde",
          "Remafstand verdubbelt bij verdubbeling snelheid",
          "Totale stopafstand = reactieafstand + remafstand",
          "Nat wegdek verlengt de remafstand aanzienlijk",
        ],
      },
      {
        id: "m1-l3",
        title: "Rijstroken en rijbaangebruik",
        duration: "10 min",
        completed: true,
        locked: false,
        description:
          "Leer wanneer je van rijstrook mag wisselen, hoe je de rijbaan correct gebruikt en wat de regels zijn op wegen met meerdere rijstroken.",
        keyPoints: [
          "Rijd zoveel mogelijk rechts",
          "Gebruik de linkerrijstrook alleen om in te halen",
          "Blokkeer de rijstrook niet nodeloos",
          "Let op de wegmarkeringen bij rijstrookwisselingen",
        ],
      },
      {
        id: "m1-l4",
        title: "Inhalen en invoegen",
        duration: "7 min",
        completed: true,
        locked: false,
        description:
          "Wanneer mag je inhalen en wanneer niet? In deze les komen de regels rondom inhalen, inhalverboden en veilig invoegen uitgebreid aan bod.",
        keyPoints: [
          "Inhalen mag alleen links, tenzij anders aangegeven",
          "Inhaalverbod geldt bij doorgetrokken streep",
          "Bij invoegen: let op snelheidsverschil",
          "Verleen voorrang bij invoegen op de snelweg",
        ],
      },
      {
        id: "m1-l5",
        title: "Alcohol en rijden",
        duration: "9 min",
        completed: true,
        locked: false,
        description:
          "Wat zijn de wettelijke grenzen voor alcoholgebruik in het verkeer? Leer over de gevolgen van rijden onder invloed en de bijbehorende sancties.",
        keyPoints: [
          "Wettelijke grens: 0,5 promille (0,2 voor beginnende bestuurders)",
          "Alcohol vermindert reactievermogen en concentratie",
          "Rijden onder invloed kan leiden tot rijontzegging",
          "De BOB-campagne promoot nuchter rijden",
        ],
      },
      {
        id: "m1-l6",
        title: "Gordel en kinderzitjes",
        duration: "6 min",
        completed: true,
        locked: false,
        description:
          "Gordelgebruik is verplicht voor alle inzittenden. Kinderen tot 1,35 meter moeten in een goedgekeurd kinderzitje. Leer de regels en het belang van gordels.",
        keyPoints: [
          "Gordeldracht is verplicht voor bestuurder en alle passagiers",
          "Kinderen < 1,35 m vereisen een kinderzitje",
          "De gordel vermindert letselrisico enorm",
          "Boete voor niet dragen van gordel",
        ],
      },
    ],
  },
  {
    id: "module-2",
    title: "Verkeersborden",
    description: "Herken en begrijp alle Nederlandse verkeersborden.",
    lessonsCount: 5,
    completedLessons: 3,
    color: "from-sky-400 to-cyan-600",
    icon: "\uD83E\uDEA7",
    lessons: [
      {
        id: "m2-l1",
        title: "Gebodsborden",
        duration: "8 min",
        completed: true,
        locked: false,
        description:
          "Gebodsborden zijn ronde blauwe borden die een bepaald gedrag opleggen. Denk aan verplichte rijrichting, verplicht rechtsaf of minimumsnelheid.",
        keyPoints: [
          "Ronde blauwe borden zijn gebodsborden",
          "Ze geven een verplichte handeling aan",
          "Verplichte rijrichting: pijlen op blauw bord",
          "Minimumsnelheid: blauwe cirkel met getal",
        ],
      },
      {
        id: "m2-l2",
        title: "Verbodsborden",
        duration: "9 min",
        completed: true,
        locked: false,
        description:
          "Verbodsborden zijn ronde borden met een rode rand. Ze geven aan wat je NIET mag doen, zoals inhalen, parkeren of een bepaalde weg oprijden.",
        keyPoints: [
          "Ronde borden met rode rand zijn verbodsborden",
          "Verbod te inhalen: twee auto-silhouetten",
          "Doorrijverbod: verbod voor alle voertuigen",
          "Einde verbod: streep door het bord",
        ],
      },
      {
        id: "m2-l3",
        title: "Waarschuwingsborden",
        duration: "7 min",
        completed: true,
        locked: false,
        description:
          "Waarschuwingsborden zijn driehoekige borden met een rode rand. Ze waarschuwen voor gevaar dat verderop in de weg aanwezig is.",
        keyPoints: [
          "Driehoekige rode rand = waarschuwingsbord",
          "Ze kondigen gevaar aan, geen verbod",
          "Let op: kruispunten, bochten, kinderen",
          "Afstand tot gevaar staat soms op onderbord",
        ],
      },
      {
        id: "m2-l4",
        title: "Informatieborden",
        duration: "6 min",
        completed: false,
        locked: false,
        description:
          "Informatieborden geven nuttige reisinformatie, zoals richting, parkeerplaatsen en rustplaatsen. Ze zijn meist blauw of groen van kleur.",
        keyPoints: [
          "Blauwe borden: snelwegwegwijzers",
          "Groene borden: buiten bebouwde kom",
          "Witte borden: binnen bebouwde kom",
          "Bruine borden: toeristische attracties",
        ],
      },
      {
        id: "m2-l5",
        title: "Onderborden en aanvullingen",
        duration: "5 min",
        completed: false,
        locked: false,
        description:
          "Onderborden geven extra informatie bij een hoofdbord, zoals tijden, doelgroepen of uitzonderingen op het bord erboven.",
        keyPoints: [
          "Onderborden staan altijd onder het hoofdbord",
          "Ze beperken of verduidelijken het hoofdbord",
          "Tijdsaanduidingen en doelgroepen zijn veelvoorkomend",
          "Onderbord geldt alleen samen met het bovenliggende bord",
        ],
      },
    ],
  },
  {
    id: "module-3",
    title: "Voorrang en kruispunten",
    description: "Leer de voorrangsregels en kruispuntgedrag.",
    lessonsCount: 5,
    completedLessons: 1,
    color: "from-indigo-500 to-violet-600",
    icon: "\u270B",
    lessons: [
      {
        id: "m3-l1",
        title: "Rechts heeft voorrang",
        duration: "7 min",
        completed: true,
        locked: false,
        description:
          "Op kruispunten zonder borden of markeringen geldt de rechtsregel: verkeer van rechts heeft altijd voorrang. Leer wanneer deze regel van toepassing is.",
        keyPoints: [
          "Ongeregeld kruispunt: rechts voor links",
          "De regel geldt voor gelijkwaardige wegen",
          "Tram en bepaalde voertuigen hebben altijd voorrang",
          "Fietsers op het fietspad hebben ook de rechtsregel",
        ],
      },
      {
        id: "m3-l2",
        title: "Haaientanden en stopstrepen",
        duration: "8 min",
        completed: false,
        locked: false,
        description:
          "Haaientanden zijn witte driehoeken op de rijbaan die aangeven dat je voorrang moet verlenen. Een stopstreep verplicht je volledig te stoppen.",
        keyPoints: [
          "Haaientanden: verplicht voorrang verlenen",
          "Stopstreep: verplicht stoppen en dan voorrang verlenen",
          "De punt van de driehoeken wijst naar jou",
          "Negeren van haaientanden is gevaarlijk en strafbaar",
        ],
      },
      {
        id: "m3-l3",
        title: "Rotondes",
        duration: "6 min",
        completed: false,
        locked: false,
        description:
          "Op een rotonde heeft het verkeer op de rotonde in de meeste gevallen voorrang. Leer hoe je een rotonde correct nadert, oprijdt en verlaat.",
        keyPoints: [
          "Verkeer op de rotonde heeft voorrang (tenzij anders aangegeven)",
          "Gebruik de juiste rijstrook bij het oprijden",
          "Richting aangeven bij het verlaten van de rotonde",
          "Op sommige rotondes geldt de rechtsregel nog",
        ],
      },
      {
        id: "m3-l4",
        title: "Verkeersregelaars",
        duration: "5 min",
        completed: false,
        locked: true,
        description:
          "Verkeersregelaars (politie, boa's) hebben altijd voorrang op andere verkeersregels, inclusief verkeerslichten. Leer hun gebaren herkennen.",
        keyPoints: [
          "Verkeersregelaar gaat voor op verkeerslichten en borden",
          "Uitgestrekte arm naar rechts en links: stop voor naderende richting",
          "Rug naar verkeer: stop",
          "Zijwaarts staan: doorgaan",
        ],
      },
      {
        id: "m3-l5",
        title: "Bijzondere kruispunten",
        duration: "9 min",
        completed: false,
        locked: true,
        description:
          "Sommige kruispunten hebben speciale regels: spoorwegovergangen, tramkruispunten en oversteekplaatsen voor voetgangers en fietsers.",
        keyPoints: [
          "Spoorwegovergang: stop altijd als slagbomen dalen",
          "Tram heeft bijna altijd voorrang",
          "Voetgangersoversteek: voetgangers hebben voorrang als ze oversteken",
          "Laat fietsers passeren bij een fietspad",
        ],
      },
    ],
  },
  {
    id: "module-4",
    title: "Gevaarherkenning",
    description: "Leer gevaarlijke situaties tijdig herkennen en vermijden.",
    lessonsCount: 6,
    completedLessons: 0,
    color: "from-amber-400 to-orange-500",
    icon: "\u26A0\uFE0F",
    lessons: [
      {
        id: "m4-l1",
        title: "Wat is gevaarherkenning?",
        duration: "6 min",
        completed: false,
        locked: false,
        description:
          "Gevaarherkenning is het vermogen om potentieel gevaarlijke situaties in het verkeer te herkennen voordat ze zich voordoen. Dit is een kernonderdeel van het theorie-examen.",
        keyPoints: [
          "Anticiperen op gedrag van andere weggebruikers",
          "Gevaar tijdig herkennen vermindert ongelukken",
          "Kijk ver vooruit en scan de omgeving",
          "Herken afleidende situaties",
        ],
      },
      {
        id: "m4-l2",
        title: "Kwetsbare verkeersdeelnemers",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "Voetgangers, fietsers en motorrijders zijn kwetsbare verkeersdeelnemers. Ze lopen het grootste risico bij een aanrijding en verdienen extra aandacht.",
        keyPoints: [
          "Fietsers zijn moeilijker zichtbaar, let op dode hoek",
          "Kinderen reageren onvoorspelbaar",
          "Ouderen bewegen langzamer",
          "Motorrijders zijn moeilijker te zien in de spiegel",
        ],
      },
      {
        id: "m4-l3",
        title: "Weersomstandigheden",
        duration: "7 min",
        completed: false,
        locked: true,
        description:
          "Regen, mist, sneeuw en ijs hebben grote invloed op de rijomstandigheden. Leer hoe je je rijgedrag aanpast aan het weer.",
        keyPoints: [
          "Regen: vergroot stopafstand, gebruik dimlichten",
          "Mist: gebruik mistlichten, rij langzamer",
          "Sneeuw en ijs: remafstand kan 10x groter zijn",
          "Verblinding door laagstaande zon: extra opletten",
        ],
      },
      {
        id: "m4-l4",
        title: "Dode hoek en spiegels",
        duration: "9 min",
        completed: false,
        locked: true,
        description:
          "De dode hoek is het gebied dat je niet kunt zien via je spiegels. Leer hoe je dit blinde vlak controleert en gevaar voorkomt.",
        keyPoints: [
          "Controleer altijd de dode hoek voor het afslaan",
          "Vrachtauto's hebben een grote dode hoek",
          "Stel spiegels correct in voor maximaal zicht",
          "Gebruik de achteruitkijkspiegel bij remmen",
        ],
      },
      {
        id: "m4-l5",
        title: "Vermoeidheid en afleiding",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "Vermoeidheid en afleiding zijn gevaarlijke factoren achter het stuur. Ze vertragen je reactietijd en verminderen je concentratie aanzienlijk.",
        keyPoints: [
          "Mobiel bellen zonder handsfree is verboden en gevaarlijk",
          "Na 2 uur rijden: neem een pauze",
          "Tekenen van vermoeidheid: knipperende oogleden, gebrek aan concentratie",
          "Muziek en gesprekken kunnen afleiden",
        ],
      },
      {
        id: "m4-l6",
        title: "Gevaarherkenning op de snelweg",
        duration: "10 min",
        completed: false,
        locked: true,
        description:
          "De snelweg heeft eigen gevaren: hoge snelheden, invoegstroken, weefstroken en file. Leer hoe je veilig op de snelweg rijdt.",
        keyPoints: [
          "Houd minimaal 2 seconden afstand",
          "Verlaag snelheid bij file (filerijden)",
          "Let op invoegend verkeer",
          "Noodstop op de vluchtstrook: waarschuwingsdriehoek plaatsen",
        ],
      },
    ],
  },
  {
    id: "module-5",
    title: "Bijzondere manoeuvres",
    description: "Keren, parkeren, invoegen en andere bijzondere rijsituaties.",
    lessonsCount: 4,
    completedLessons: 0,
    color: "from-emerald-400 to-teal-600",
    icon: "\uD83D\uDD04",
    lessons: [
      {
        id: "m5-l1",
        title: "Keren en achteruitrijden",
        duration: "7 min",
        completed: false,
        locked: false,
        description:
          "Keren en achteruitrijden zijn bijzondere manoeuvres waarbij je extra goed moet opletten. Je bent verantwoordelijk voor de veiligheid van anderen.",
        keyPoints: [
          "Controleer altijd voor, achter en opzij voor je keert",
          "Achteruitrijden mag alleen als het veilig is",
          "Je bent aansprakelijk als je schade veroorzaakt bij achteruitrijden",
          "Geef richting aan bij keren",
        ],
      },
      {
        id: "m5-l2",
        title: "Parkeren en stilstaan",
        duration: "8 min",
        completed: false,
        locked: true,
        description:
          "Er zijn strikte regels voor parkeren en stilstaan. Je mag niet overal parkeren, ook niet als er geen bord staat.",
        keyPoints: [
          "Parkeren is verboden voor de inrit van een ander",
          "Niet parkeren op de bushalte, zebrapad of kruispunt",
          "Dubbel parkeren is altijd verboden",
          "Nacht parkeren: let op parkeerverbodsborden met tijden",
        ],
      },
      {
        id: "m5-l3",
        title: "Oprijden en verlaten van de snelweg",
        duration: "9 min",
        completed: false,
        locked: true,
        description:
          "Het oprijden van de snelweg via de invoegstrook en het verlaten via de uitrijstrook vraagt specifieke rijvaardigheden en kennis van de regels.",
        keyPoints: [
          "Versnellen op invoegstrook en zoek een gat in het verkeer",
          "Rijdend verkeer heeft geen voorrangsverplichting maar werkt wel mee",
          "Aankondigingsborden lezen voor de afrit",
          "Vertragen doe je pas op de uitrijstrook",
        ],
      },
      {
        id: "m5-l4",
        title: "Rijden in tunnels en bij spoorwegovergangen",
        duration: "6 min",
        completed: false,
        locked: true,
        description:
          "Tunnels en spoorwegovergangen hebben specifieke regels. Bij problemen in een tunnel moet je snel en correct handelen.",
        keyPoints: [
          "In tunnel: dimlicht aan, volg de vluchtrouteaanduidingen",
          "Spoorwegovergang: stop als slagbomen naar beneden gaan",
          "Nooit stoppen op de spoorwegovergang",
          "Bij panne in tunnel: voertuig verlaten en vluchtroute volgen",
        ],
      },
    ],
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    moduleId: "module-1",
    title: "Oefenvragen: Verkeersregels",
    questions: [
      {
        id: "q1",
        question: "Wat is de maximumsnelheid op een snelweg in Nederland voor personenauto's?",
        options: [
          "100 km/u",
          "120 km/u",
          "130 km/u",
          "140 km/u",
        ],
        correctIndex: 2,
        explanation:
          "De maximumsnelheid op de meeste snelwegen in Nederland is 130 km/u. Op sommige trajecten geldt overdag een snelheidslimiet van 100 km/u.",
      },
      {
        id: "q2",
        question: "Hoe lang is de gemiddelde reactietijd van een bestuurder?",
        options: [
          "0,5 seconde",
          "1 seconde",
          "2 seconden",
          "3 seconden",
        ],
        correctIndex: 1,
        explanation:
          "De gemiddelde reactietijd is ongeveer 1 seconde. Bij vermoeidheid of alcohol kan dit oplopen tot 2 seconden of meer.",
      },
      {
        id: "q3",
        question: "Welke promillegrens geldt voor beginnende bestuurders (eerste 5 jaar)?",
        options: [
          "0,0 promille",
          "0,2 promille",
          "0,5 promille",
          "0,8 promille",
        ],
        correctIndex: 1,
        explanation:
          "Voor beginnende bestuurders (rijbewijs korter dan 5 jaar) en jongeren onder de 24 geldt een strengere grens van 0,2 promille.",
      },
      {
        id: "q4",
        question: "Op welke rijstrook moet je normaal rijden op een weg met drie rijstroken?",
        options: [
          "Linkerrijstrook",
          "Middelste rijstrook",
          "Rechterrijstrook",
          "Maakt niet uit",
        ],
        correctIndex: 2,
        explanation:
          "Je moet zoveel mogelijk rechts rijden. De rechterrijstrook is de normale rijstrook; de andere rijstroken zijn bedoeld voor inhalen.",
      },
      {
        id: "q5",
        question: "Wat is de maximumsnelheid binnen de bebouwde kom?",
        options: [
          "30 km/u",
          "50 km/u",
          "70 km/u",
          "80 km/u",
        ],
        correctIndex: 1,
        explanation:
          "De standaard maximumsnelheid binnen de bebouwde kom is 50 km/u, tenzij een bord anders aangeeft (bijv. 30 km/u zones).",
      },
    ],
  },
  {
    id: "quiz-2",
    moduleId: "module-2",
    title: "Oefenvragen: Verkeersborden",
    questions: [
      {
        id: "q1",
        question: "Wat betekent een rond blauw bord met een witte pijl naar rechts?",
        options: [
          "Verboden rechtsaf te slaan",
          "Verplicht rechtsaf",
          "Aanbevolen rijrichting rechts",
          "Parkeren aan de rechterkant",
        ],
        correctIndex: 1,
        explanation:
          "Een rond blauw bord met een witte pijl is een gebodsbord. De pijl geeft de verplichte rijrichting aan. Een pijl naar rechts betekent dat je verplicht rechtsaf moet.",
      },
      {
        id: "q2",
        question: "Welk bord geeft aan dat je voorrang moet verlenen?",
        options: [
          "Een rood-wit driehoekig bord",
          "Een rond rood bord",
          "Een blauw vierkant bord",
          "Een geel diamantvormig bord",
        ],
        correctIndex: 0,
        explanation:
          "Het voorrangsbord (B1) is een rood-wit driehoekig bord met de punt naar beneden. Dit bord verplicht je voorrang te verlenen aan al het verkeer op de kruisende weg.",
      },
      {
        id: "q3",
        question: "Wat betekent het gele diamantvormige bord?",
        options: [
          "Gevaarlijk kruispunt",
          "Jij hebt voorrang",
          "Einde voorrangsweg",
          "Let op: tegenliggers",
        ],
        correctIndex: 1,
        explanation:
          "Het gele diamantbord (B3) geeft aan dat je op een voorrangsweg rijdt en dat jij voorrang hebt op verkeer dat van opzij komt.",
      },
    ],
  },
  {
    id: "quiz-3",
    moduleId: "module-3",
    title: "Oefenvragen: Voorrang en kruispunten",
    questions: [
      {
        id: "q1",
        question: "Op een kruispunt zonder borden of markeringen, wie heeft voorrang?",
        options: [
          "Wie het snelst rijdt",
          "Verkeer van rechts",
          "Verkeer van links",
          "Wie als eerste aankomt",
        ],
        correctIndex: 1,
        explanation:
          "Op een ongeregeld kruispunt zonder borden geldt de regel: verkeer van rechts heeft voorrang. Dit is een van de meest fundamentele voorrangsregels.",
      },
      {
        id: "q2",
        question: "Wat moet je doen bij haaientanden op de weg?",
        options: [
          "Je hebt voorrang en mag doorrijden",
          "Je moet stoppen en omkeren",
          "Je moet voorrang verlenen aan kruisend verkeer",
          "Je moet toeclaxonneren",
        ],
        correctIndex: 2,
        explanation:
          "Haaientanden (witte driehoeken op de rijbaan met de punt naar jou) geven aan dat je voorrang moet verlenen. Je moet het kruisende verkeer voorrang laten.",
      },
    ],
  },
];