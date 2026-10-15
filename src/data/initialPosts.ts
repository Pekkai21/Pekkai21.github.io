import { Post, ShelfItem } from '../types';
import heroStudyImg from '../assets/images/editorial_study_hero_1792063595009.jpg';
import bookRovelliImg from '../assets/images/book_rovelli_cover_1792063596027.jpg';
import filmCinemaImg from '../assets/images/film_cinema_still_1792063595527.jpg';
import dailyRainImg from '../assets/images/daily_rain_window_1792063595645.jpg';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'ethics-of-voluntary-discomfort-seneca',
    title: 'On the Ethics of Voluntary Discomfort',
    subtitle: 'Seneca’s radical remedy for the modern hedonic treadmill and phantom anxieties.',
    category: 'philosophy',
    date: '2026-10-14',
    readingTimeMinutes: 7,
    featured: true,
    coverImage: heroStudyImg,
    coverCaption: 'Study desk at dawn, reflecting on Seneca’s Moral Letters to Lucilius.',
    tags: ['Stoicism', 'Ethics', 'Attention', 'Modernity'],
    excerpt: 'In Moral Letters XVIII, Seneca advises Lucilius to set aside a few days each month to live on the scantiest fare and roughest dress, asking himself: "Is this the condition that I feared?" Why this ancient mental inoculation matters today.',
    philosophicalSchool: 'Roman Stoicism',
    centralThesis: 'Voluntary deprivation is not ascetic martyrdom; it is cognitive immunisation against the catastrophic dread of status loss.',
    dialectic: {
      thesis: 'Comfort is the natural objective of civilization; by minimizing friction, we free our intellects for higher creative pursuit.',
      antithesis: 'Uninterrupted comfort diminishes physiological and psychological antifragility, turning minor inconveniences into existential crises.',
      synthesis: 'Periodic, deliberate exposure to physical and social friction re-calibrates our baseline, decoupling contentment from external luxury.'
    },
    primaryReferences: [
      'Seneca, Lucius Annaeus. Epistulae Morales ad Lucilium (Letter XVIII: On Festivals and Fasting)',
      'Marcus Aurelius. Meditations, Book IV (On the Inner Citadel)',
      'Nassim Nicholas Taleb. Antifragile: Things That Gain from Disorder'
    ],
    keyConcepts: [
      {
        term: 'Hedonic Adaptation',
        definition: 'The observed psychological tendency of humans to quickly return to a relatively stable level of happiness despite major positive or negative events.'
      },
      {
        term: 'Premeditatio Malorum',
        definition: 'The Stoic exercise of visualizing potential hardships in advance to eliminate irrational shock and cultivate resilience.'
      },
      {
        term: 'Ataraxia',
        definition: 'A state of serene calmness, lucid equanimity, and freedom from emotional turmoil.'
      }
    ],
    content: `
During the Roman festival of Saturnalia, while the rest of the empire surrendered to unrestrained indulgence, Seneca wrote a peculiar letter to his younger friend Lucilius. He instructed him to set aside three or four days:

> "Set aside a certain number of days, during which you shall be content with the scantiest and cheapest fare, with coarse and rough dress, saying to yourself the while: 'Is this the condition that I feared?'"

### The Modern Comfort Trap

We inhabit an era engineered for frictionlessness. If a room drops below 21 degrees Celsius, an algorithmic thermostat corrects it within four minutes. If our blood sugar dips, an on-demand courier arrives with hot nourishment within thirty minutes. If boredom threatens for even six seconds, a high-density OLED display serves an infinite scroll of synthesized amusement.

Yet, counter-intuitively, our baseline anxiety has not dropped in proportion to our safety. In truth, it has metastasized.

When the horizon of tangible physical jeopardy recedes, the human psyche does not relax into perpetual tranquil bliss. Instead, it shifts its vigilance onto phantom threats: social standing, unread message badges, minor schedule perturbations, and subtle changes in conversational tone.

### The Antidote of Tangible Scarcity

Seneca understood that the fear of poverty and hardship is invariably more punishing than the actual condition itself. By voluntarily simulating the worst-case scenario—sleeping on a firm floor, taking a freezing wash, walking five miles in the autumn rain with water in your boots—the phantom dissolves.

You discover a biological reality: your ribs do not cave in; your brain remains intact; your dignity does not evaporate with your conveniences.

When you return to your warm bed and hot coffee, they cease to be entitlements that you take for granted; they become wondrous gifts. Voluntary discomfort does not sour the taste of abundance—it restores it.
    `.trim()
  },
  {
    id: 'post-2',
    slug: 'the-order-of-time-carlo-rovelli-review',
    title: 'The Order of Time by Carlo Rovelli',
    subtitle: 'A physicist dissolves the grandfather clock and reweaves our mortal existence.',
    category: 'book',
    date: '2026-10-10',
    readingTimeMinutes: 9,
    featured: true,
    coverImage: bookRovelliImg,
    coverCaption: 'Rivage Editions hardcover edition of Carlo Rovelli’s masterpiece.',
    tags: ['Physics', 'Time', 'Literature', 'Mortality'],
    excerpt: 'Rovelli achieves something extraordinary: he dismantles Newton’s universal clockwork using loop quantum gravity, and rebuilds our mortal relationship with grief, memory, and entropy.',
    bookAuthor: 'Carlo Rovelli',
    bookYear: 2018,
    bookPages: 240,
    bookRating: 4.9,
    favoriteQuote: 'We are time. We are this space, this clearing opened by the traces of memory inside the connections between our neurons. We are memory, we are nostalgia, we are longing for a future that will not come.',
    quoteAttribution: 'Carlo Rovelli, Chapter 13: The Source of Time',
    spoilers: false,
    content: `
### The Great Dissolution

The greatest mistake of common sense is the belief that time flows uniformly across the universe, like an invisible cosmic river carrying galaxies and coffee cups at the identical pace.

Carlo Rovelli begins *The Order of Time* by patiently, tenderly dismantling this illusion. He shows us that:
1. **Time passes faster in the mountains than at sea level.** Place two identical clocks on a kitchen table in Zurich and on the peak of the Matterhorn; the mountain clock will tick ahead because mass slows time.
2. **There is no universal "Now".** Asking what is happening "right now" on Proxima Centauri is as meaningless as asking what is happening "right now" in the room of a friend who died two centuries ago.
3. **At the fundamental level of the equations of quantum gravity, the variable $t$ does not even appear.**

### The World is Made of Events, Not Things

Perhaps Rovelli’s most profound philosophical shift is grammatical. We have inherited an ontology of *nouns*: rocks, bodies, stars, chairs. Rovelli argues that nature is composed exclusively of *verbs*: transitions, interactions, meetings.

> "A stone is a thing that persists for a few million years. A flash of lightning is an event that lasts a fraction of a second. But both are merely processes with differing rhythms."

A human being is not an object that enters the world and later departs. A human being is a flame: an open system of food, air, light, conversations, and chemical reactions that burns for eighty revolutions around a star before dissipating its thermal entropy back into the loam.

### Verdict & Recommendation

This is not merely a popular science manual; it is an extended lyric poem composed with the mathematical precision of Riemann and the melancholic wisdom of Marcus Aurelius. If you have ever grieved a departed companion or felt the vertigo of another year slipping past your fingers, read this book slowly, with pencil in hand.
    `.trim()
  },
  {
    id: 'post-3',
    slug: 'koyaanisqatsi-cinema-of-acceleration-review',
    title: 'Koyaanisqatsi & The Cinema of Acceleration',
    subtitle: 'Godfrey Reggio and Philip Glass’s prophetic vision of civilizational vertigo.',
    category: 'video',
    date: '2026-10-06',
    readingTimeMinutes: 6,
    featured: false,
    coverImage: filmCinemaImg,
    coverCaption: 'Long-exposure ribbons of evening transit echoing Koyaanisqatsi’s climax.',
    tags: ['Cinema', 'Documentary', 'Technology', 'Music'],
    excerpt: 'Forty-four years after its debut, Godfrey Reggio’s non-verbal masterpiece feels less like an avant-garde experiment and more like a live broadcast of our current condition.',
    videoDirector: 'Godfrey Reggio (Score by Philip Glass)',
    videoDuration: '1h 26m',
    videoPlatform: 'Criterion Collection / 35mm Restoration',
    videoRating: 5.0,
    timestamps: [
      {
        time: '00:00',
        label: 'The Great Petroglyphs',
        description: 'Fremont culture rock art in Horseshoe Canyon; primordial stasis before technology.'
      },
      {
        time: '18:45',
        label: 'Resource Extraction & Strip Mines',
        description: 'Giant dragline excavators devouring sandstone plateaus to Glass’s low brass drone.'
      },
      {
        time: '42:10',
        label: 'Pruitt-Igoe Demolition',
        description: 'The monumental collapse of modern utopian housing, set to elegiac choral hymns.'
      },
      {
        time: '1:02:15',
        label: 'The Grid (Time-Lapse City)',
        description: 'Human beings compressed into frenetic circuit boards, microchips, and arterial highways.'
      },
      {
        time: '1:21:30',
        label: 'Atlas Rocket Descent',
        description: 'The burning debris falling slowly from the blue sky, fulfilling the Hopi prophecy.'
      }
    ],
    content: `
### Cinema Without a Script

Godfrey Reggio took six years to assemble *Koyaanisqatsi* (Hopi language: "life out of balance"). There are no characters, no dialogue, no narrative voiceover, and no editorializing text cards. There is only the camera (directed by Ron Fricke) and Philip Glass’s cyclical arpeggios.

The film operates not as an intellectual argument, but as an affective visceral shock. 

### From Monument to Microchip

The opening third immerses the viewer in geological majesty: cloud shadow ripples across red sandstone arches, waves crash against oceanic promontories, light moves in glacial majesty.

Then, imperceptibly, machinery arrives. Not with sudden violence, but as a subtle metastasis. The geometric patterns of strip mines resemble microprocessors; the aerial view of Los Angeles cloverleaf interchanges mimics the blood circulation of a panicked mammal.

### Why It Demands a Rewatch Today

In 1982, the time-lapse sequences of crowds marching onto subway platforms felt like a stylized artistic provocation. In 2026, looking up from an algorithmic phone screen in Tokyo or New York, the film no longer feels stylized; it feels like an unfiltered documentary mirror.

Watch it in a darkened room with quality headphones. Notice how Philip Glass’s tempo alters your resting heart rate. It will leave you walking out into the street with your sensory receptors stripped clean.
    `.trim()
  },
  {
    id: 'post-4',
    slug: 'autumn-rain-bitter-coffee-daily-log',
    title: 'Autumn Rain, Bitter Coffee, and the Art of Doing Nothing',
    subtitle: 'Observations from a wooden window bench on the slow recovery of genuine attention.',
    category: 'daily',
    date: '2026-10-02',
    readingTimeMinutes: 5,
    featured: false,
    coverImage: dailyRainImg,
    coverCaption: 'Morning downpour on the courtyard maple leaves; black pour-over in a ceramic cup.',
    tags: ['Daily Life', 'Solitude', 'Attention', 'Kyoto'],
    excerpt: 'The rain began at five in the morning, softening the edges of the tiled roofs. I deliberately left my phone in a wooden drawer in the back hallway and sat with a hot cup of pour-over for sixty uninterrupted minutes.',
    dailyLocation: 'Kyoto, Northern Ward (Courtyard Bench)',
    dailyMoodWeather: 'Continuous drizzle, 13°C, petrichor and roasted barley',
    dailyEpiphany: 'Boredom is not an emptiness that must be immediately paved over with media; it is the fertile clearing where original thought first germinates.',
    content: `
The rain arrived at 5:15 AM, steady and unhurried, drumming against the moss garden and dripping from the copper eaves in rhythmic meter.

I noticed an automatic impulse when I sat down with my ceramic cup: my right hand reached into my jacket pocket for the rectangular glass slab. It was a muscle memory as involuntary as blinking in dust. But I had deliberately locked the phone inside an old elm chest in the hallway.

For the first twelve minutes, the mind protests. It generates false emergencies: *Did that email send? What is the weather forecast for tomorrow? Has someone written to you?*

Then, around the twenty-minute mark, something miraculous happens. The nervous system surrenders its frantic search for novelty.

You begin to notice the water droplet collecting on the tip of the maple leaf: how it swells into a spherical lens, catches the grey sky, quivers in the draft, and then falls with an audible tap onto the slate paving stone below.

We have forgotten that boredom is not a pathology. It is the soil. When you never let the mind lie fallow, you only ever harvest synthetic copies of other people’s tweets and talking points. Sitting in silence with a warm cup of coffee is not "lost time"—it is the only time you truly inhabit.
    `.trim()
  },
  {
    id: 'post-5',
    slug: 'the-absurd-hero-at-the-bus-stop-camus',
    title: 'The Absurd Hero at the Bus Stop: Camusian Everydayness',
    subtitle: 'Finding lucidity and defiant joy in the repetitive machinery of ordinary commute.',
    category: 'philosophy',
    date: '2026-09-26',
    readingTimeMinutes: 8,
    featured: false,
    coverImage: heroStudyImg,
    coverCaption: 'Notebook pages open to Camus’s Myth of Sisyphus.',
    tags: ['Existentialism', 'Camus', 'Routine', 'Meaning'],
    excerpt: '"Rising, tram, four hours in the office, meal, tram, four hours at work, meal, sleep, and Monday Tuesday Wednesday Thursday Friday and Saturday according to the same rhythm..." How Camus transforms the grind into a site of revolt.',
    philosophicalSchool: 'French Absurdism / Existentialism',
    centralThesis: 'The absurd is not despair; it is the lucid recognition of the silence of the universe met by our stubborn, passionate refusal to look away.',
    dialectic: {
      thesis: 'Human life requires an ultimate, transcendent purpose or divine blueprint to possess meaning.',
      antithesis: 'The universe is fundamentally indifferent, devoid of inherent script, leaving our existence arbitrary.',
      synthesis: 'By accepting the absence of ultimate purpose without flinching, we become free to author our own defiant, luminous joy in the immediate present.'
    },
    primaryReferences: [
      'Albert Camus. The Myth of Sisyphus (1942)',
      'Jean-Paul Sartre. Nausea (1938)',
      'Thomas Nagel. The Absurd (The Journal of Philosophy, 1971)'
    ],
    content: `
In *The Myth of Sisyphus*, Albert Camus describes the exact moment the spell of routine cracks:

> "It happens that the stage sets collapse. Rising, streetcar, four hours in the office or the factory, meal, streetcar, four hours of work, meal, sleep, and Monday Tuesday Wednesday Thursday Friday and Saturday according to the same rhythm—this path is easily followed most of the time. But one day the 'why' arises and everything begins in that weariness tinged with amazement."

### The False Escapes

When the "why" strikes us on a damp Tuesday morning under the neon flicker of a subway station, humans typically pursue one of two escapes:
1. **Philosophical Suicide**: Leaping into mystical or religious certainty, inventing an unseen afterlife to compensate for current misery.
2. **Numbing Diversion**: Doubling down on consumerism, hyper-optimization, and entertainment feeds so the question never surfaces again.

Camus rejected both. His answer was radical: **revolt, freedom, and passion.**

### Sisyphus as the Commuter

Sisyphus is condemned by the gods to roll a boulder up a mountain, only to watch it tumble back to the plain for all eternity. It is the ultimate metaphor for the repetitious labor of the human species.

Yet Camus insists: "One must imagine Sisyphus happy."

Why? Because in the descent—when Sisyphus walks back down the slope, his muscles burning, his hands coated in red dust—he knows his fate belongs to him. The gods cannot take away his lucidity.

When you stand at the bus stop in the rain waiting for the 8:14 AM service, and you look at the wet asphalt, the breath fogging your collar, and the fellow commuters shivering in silence: you are not a helpless cog. You are an absurd hero choosing to inhabit reality without illusions.
    `.trim()
  },
  {
    id: 'post-6',
    slug: 'stoner-john-williams-review',
    title: 'Stoner by John Williams: The Quiet Dignity of an Unremarkable Life',
    subtitle: 'Why a 1965 academic novel about a humble Missouri professor remains a quiet masterpiece.',
    category: 'book',
    date: '2026-09-18',
    readingTimeMinutes: 7,
    featured: false,
    coverImage: bookRovelliImg,
    coverCaption: 'The quiet beauty of William Stoner’s university cloisters.',
    tags: ['Literature', 'Novels', 'Solitude', 'Academia'],
    excerpt: 'William Stoner enters the University of Missouri to study agriculture, encounters Shakespeare’s Sonnet 73, and is struck by an enduring love of literature that carries him through marital discord and bureaucratic malice.',
    bookAuthor: 'John Williams',
    bookYear: 1965,
    bookPages: 288,
    bookRating: 4.8,
    favoriteQuote: 'He had dreamed of a kind of integrity, of a kind of purity that was whole; he had found compromise and the exhausting trivialities of scrupulousness. He had conceived wisdom, and at the end of the long years he had found ignorance. And what else? he thought. What else?',
    quoteAttribution: 'John Williams, Stoner (Chapter XVII)',
    spoilers: false,
    content: `
The opening paragraph of John Williams’s *Stoner* tells you how it ends: William Stoner was hired as an instructor in 1910, died in 1956, and his colleagues rarely speak of him now.

There are no battles, no murders, no sudden inheritances, and no heroic triumphs in this book. Stoner’s marriage is a cold domestic war; his university career is stunted by a petty departmental chairman; his single great love affair is snuffed out by moral scandal.

And yet, it is one of the most devastatingly beautiful novels written in the English language.

### What Makes Stoner Immortal?

Williams writes with a prose style so clear and unadorned that it feels carved into dry limestone. What elevates the novel is Stoner’s quiet, inviolable devotion to his work: the patient, honest examination of Latin grammars and Elizabethan verse.

In an age obsessed with virality, public recognition, and personal branding, *Stoner* stands as a quiet sanctuary. It reminds us that a life does not need to be famous or victorious to be profoundly meaningful. It only needs to be lived with integrity.
    `.trim()
  }
];

export const INITIAL_SHELF: ShelfItem[] = [
  {
    id: 'shelf-1',
    title: 'Discourses and Selected Writings',
    creator: 'Epictetus',
    category: 'philosophy',
    status: 'reading',
    progressPercent: 62,
    notes: 'Re-reading Book I on what is within our power and what is not.',
    rating: 5.0
  },
  {
    id: 'shelf-2',
    title: 'Stalker (1979)',
    creator: 'Andrei Tarkovsky',
    category: 'video',
    status: 'completed',
    progressPercent: 100,
    notes: 'The Room and the nature of human desire. Essay review in draft.',
    rating: 5.0
  },
  {
    id: 'shelf-3',
    title: 'The Denial of Death',
    creator: 'Ernest Becker',
    category: 'book',
    status: 'to-read',
    progressPercent: 0,
    notes: 'Recommended for the upcoming existential dread series.'
  },
  {
    id: 'shelf-4',
    title: 'Sans Soleil (1983)',
    creator: 'Chris Marker',
    category: 'video',
    status: 'to-read',
    progressPercent: 0,
    notes: 'Documentary travelogue examining memory and time in Tokyo and Guinea-Bissau.'
  },
  {
    id: 'shelf-5',
    title: 'Phenomenology of Perception',
    creator: 'Maurice Merleau-Ponty',
    category: 'philosophy',
    status: 'reading',
    progressPercent: 35,
    notes: 'Focusing on the body as the primary vehicle of knowing the world.'
  }
];
