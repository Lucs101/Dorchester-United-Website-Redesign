// =====================================================================
// DUSC content — single source for the whole site.
// Everything here was taken from dorchesterunited.org (current) and
// dorchesterunited.com (older site). Club admins can update copy, news
// and links here without touching any layout code.
// =====================================================================

export const CLUB = {
  name: "Dorchester United Soccer Club",
  short: "DUSC",
  slogan: "Play Hard, Play Smart, Play UNITED!",
  phone: "(843) 864-5770",
  phoneHref: "tel:+18438645770",
  email: "DorchesterUnitedSC@gmail.com",
  programEmail: "jeff@DorchesterUnited.org",
  website: "https://www.dorchesterunited.org",
  facebook: "https://www.facebook.com/profile.php?id=61558363793391",
  instagram: "https://www.instagram.com/dorchesterunited/",
  instagramHandle: "@dorchesterunited",
};

// Official registration / free-evaluation link from dorchesterunited.org/programs
export const REGISTER_URL =
  "https://playmetrics.com/signup?clubToken=TG9naW4tQ2x1Yi52MS0xMzkyLTE3Nzg4OTgxOTd8SVJPd3N5T0hQbVBwTDJXYWR5dS90clAxYjB1TXpveXRJdzZhTkg2cFhzZz0=&program_id=95318";
export const PLAYMETRICS_SITE = "http://dorchesterunited.sites.playmetrics.com/";
export const SEASON_BANNER = "Registration for the 2026 – 2027 Soccer Year is Now Open";

export type Program = {
  id: string;
  step: number;
  name: string;
  tag: string;
  blurb: string;
  birth: string;
  level: string;
  competitive: string;
  where: string;
  selection: string;
  season: string;
  extras: string[];
};

// 2025–2026 program details are from dorchesterunited.com program pages.
export const PROGRAMS: Program[] = [
  {
    id: "little-ballers",
    step: 1,
    name: "Little Ballers",
    tag: "Start here",
    blurb:
      "Beginner soccer for our youngest players — an introduction to the Beautiful Game focused on basic soccer skills in a fun environment.",
    birth: "Boys & girls born 2018 – 2021",
    level: "Beginner",
    competitive: "Introductory — fun first",
    where: "Practice and play at the Oakbrook YMCA",
    selection: "No selection — pre-registration required",
    season: "Players born 2016 & 2017 play in 1 tournament per year",
    extras: ["Coached by US Soccer Licensed Coaches", "Club fees cover administration, leagues, tournaments, coaches, referees & fields"],
  },
  {
    id: "recreation",
    step: 2,
    name: "Recreation",
    tag: "Play for the love of it",
    blurb:
      "Local teams for players who want to enjoy the game and compete close to home. All skill levels — including beginners — are welcome, and no tryouts are required.",
    birth: "Boys & girls born 2007 – 2016",
    level: "All skill levels welcome",
    competitive: "Local recreational play",
    where: "Practice and play games at the Oakbrook YMCA",
    selection: "No tryouts required",
    season: "Teams play in 1 tournament per season",
    extras: ["Coached by US Soccer Licensed Coaches", "Payment plans available"],
  },
  {
    id: "junior-academy",
    step: 3,
    name: "Junior Academy",
    tag: "Competitive development",
    blurb:
      "Competitive travel soccer for younger players who want to learn the game and compete across the Lowcountry and beyond.",
    birth: "Boys & girls born 2014 – 2019",
    level: "Competitive development",
    competitive: "SCYSA Carolina Premier League — Lowcountry Division",
    where: "Practice at Tom Conley Field in Ladson",
    selection: "Selection required — free evaluation",
    season: "Regular weekend travel around the Lowcountry · 1–2 tournaments per season",
    extras: ["Coached by US Soccer Licensed Coaches", "Payment plans available"],
  },
  {
    id: "academy",
    step: 4,
    name: "Academy",
    tag: "Travel soccer",
    blurb:
      "Competitive travel soccer for older boys and girls who want to compete throughout South Carolina and beyond.",
    birth: "Boys & girls born 2007 – 2013",
    level: "Advanced / fully committed",
    competitive: "SCYSA Open League",
    where: "Practice at Tom Conley Field in Ladson",
    selection: "Selection required — free evaluation",
    season: "Regular regional weekend travel, occasional state travel · 1–2 tournaments per season · U15 and older play a fall season only",
    extras: ["Coached by US Soccer Licensed Coaches", "Payment plans available"],
  },
];

// 2026–2027 competitive teams table — dorchesterunited.org/programs
export type AgeGroup = {
  age: string;
  range: string;
  fee: string;
  seasons: string;
  format: string;
};
export const AGE_GROUPS: AgeGroup[] = [
  { age: "U8", range: "Aug 1, 2018 – Jul 31, 2019", fee: "$875", seasons: "Fall & Spring", format: "5 v 5" },
  { age: "U9", range: "Aug 1, 2017 – Jul 31, 2018", fee: "$875", seasons: "Fall & Spring", format: "7 v 7" },
  { age: "U10", range: "Aug 1, 2016 – Jul 31, 2017", fee: "$875", seasons: "Fall & Spring", format: "7 v 7" },
  { age: "U11", range: "Aug 1, 2015 – Jul 31, 2016", fee: "$1,075", seasons: "Fall & Spring", format: "9 v 9" },
  { age: "U12", range: "Aug 1, 2014 – Jul 31, 2015", fee: "$1,075", seasons: "Fall & Spring", format: "9 v 9" },
  { age: "U13", range: "Aug 1, 2013 – Jul 31, 2014", fee: "$1,175", seasons: "Fall & Spring", format: "11 v 11" },
  { age: "U14", range: "Aug 1, 2012 – Jul 31, 2013", fee: "$1,175", seasons: "Fall & Spring", format: "11 v 11" },
  { age: "U15", range: "Aug 1, 2011 – Jul 31, 2012", fee: "$975", seasons: "Fall only", format: "11 v 11" },
  { age: "U16", range: "Aug 1, 2010 – Jul 31, 2011", fee: "$975", seasons: "Fall only", format: "11 v 11" },
  { age: "U17", range: "Aug 1, 2009 – Jul 31, 2010", fee: "$975", seasons: "Fall only", format: "11 v 11" },
  { age: "U18", range: "Aug 1, 2008 – Jul 31, 2009", fee: "$975", seasons: "Fall only", format: "11 v 11" },
];

export const INCLUDED = [
  "Club dues include everything except uniforms",
  "No extra team, admin, facility, coach, tournament or league fees",
  "Payment plans available",
  "Need-based financial aid available",
  "Uniforms sold separately in the club's Soccer.com store",
  "All evaluations are always free",
  "All teams practice 2× per week at Tom Conley Park in Ladson, plus an optional club-wide 3rd session",
  "All teams are coached by US Soccer Licensed Coaches",
  "U9 – U18 teams play in 1–2 tournaments per season",
];

export const CORE_VALUES = [
  { name: "Inclusivity", text: "Everyone is welcome here!" },
  { name: "Fair Play, Sportsmanship & Honesty", text: "The foundation of who we are." },
  { name: "Ambition", text: "The desire to be successful." },
  { name: "Effort", text: "Realizing our ambition takes work and sacrifice." },
  { name: "Teamwork", text: "Working together makes us all better!" },
  { name: "Respect & Empathy", text: "Kindness and understanding are non-negotiable." },
  { name: "Personal Responsibility", text: "Everyone is responsible for their own actions and development." },
  { name: "Gratitude", text: "We recognize how lucky we are, and are thankful for all we have." },
];

export const DEV_THEMES = [
  { name: "Teamwork", text: "Working together makes us all better." },
  { name: "Effort", text: "Realizing our ambition takes work and sacrifice." },
  { name: "Commitment", text: "With teamwork and effort, a key to success." },
  { name: "Competition", text: "A fun, safe and competitive environment to grow in." },
  { name: "Development", text: "Age-appropriate physical, cognitive, social and emotional needs." },
  { name: "Community", text: "Partnering with local families and businesses to reduce barriers." },
];

// Player Development Pathway — dorchesterunited.com
export const PHASES = [
  { ages: "U5 – U6", name: "Discovery", goal: "Having fun and learning to love the game", plan: "Movement exploration and ball discovery. Dribbling and shooting." },
  { ages: "U7 – U8", name: "Foundation", goal: "Having fun and wanting to play the game", plan: "Scanning, receiving, dribbling, short passing, and shooting." },
  { ages: "U9 – U12", name: "Progression", goal: "Having fun and learning the skills of the game", plan: "Scanning, receiving, dribbling, short combination play, overloads, and shooting." },
  { ages: "U13 – U15", name: "Game", goal: "Playing the game", plan: "Scanning, receiving, dribbling, short and long passing, quick combination play, overloads, and finishing." },
  { ages: "U16 – U19", name: "Competition", goal: "Winning the game", plan: "Scanning, receiving, dribbling, short and long passing, quick combination play, overloads, and finishing." },
];

export const HISTORY = [
  { when: "December 2024", title: "U19 win the SC Open Cup", text: "Our oldest team won the top division, giving up only 2 goals in 4 games with a backup goalie all weekend. The U17s finished as Open Cup finalists, undefeated in group play.", tag: "Results" },
  { when: "Fall 2023", title: "Record numbers · PMSL promotion", text: "A record number of players and teams across the Academy and Recreation programs. U17 and U19 boys earned promotion to the PMSL, and the U19s won their second SC Open Cup championship in 3 years. U14 Girls reached a championship game at the pre-season Columbia County Cup in Augusta.", tag: "Growth" },
  { when: "Fall 2022", title: "The DUSC Academy opens", text: "Teams begin practicing at Tom Conley Field and competing in the South Carolina Open League. Three DUSC teams qualify for SC Open Cup championship games — the U16 Boys win it all.", tag: "Milestone" },
  { when: "Spring 2022", title: "Tournament wins", text: "The U12 Girls and U14 Boys each win tournaments to round out the year.", tag: "Results" },
  { when: "December 2021", title: "First SC Open Cup championship", text: "DUSC captures its first SC Open Cup Championship.", tag: "Results" },
  { when: "Fall 2019", title: "First trip beyond the Y", text: "After the regular season, Dorchester United competes outside of the Oakbrook Y for the first time — in the James Island Cup.", tag: "Milestone" },
  { when: "April 2019", title: "DUSC is founded", text: "Co-founded by Jason Bond and Jeff Alperin, who met while coaching at the Oakbrook Y and first teamed up to coach a U14 team before expanding to U12 and U17.", tag: "Founding" },
];

export type NewsItem = {
  id: string;
  date: string; // ISO
  title: string;
  category: "Club Update" | "Registration" | "Results" | "Events" | "Field & Weather" | "Competition";
  summary: string;
  body: string[];
  source: "dorchesterunited.org" | "dorchesterunited.com";
  cta?: { label: string; href: string };
};

// Newest first. Add a new object at the top to publish a story.
export const NEWS: NewsItem[] = [
  {
    id: "age-group-changes",
    date: "2026-03-18",
    title: "Upcoming Age Group Changes",
    category: "Club Update",
    summary: "Town hall on the move from birth-year to school-year age brackets for the 2026–2027 soccer year.",
    body: [
      "There are a lot of concerns, and questions, regarding the upcoming change from birth year to school year, age brackets for the 2026-2027 soccer year.",
      "It is a confusing time in youth soccer, with lots of changes, but we are here to help you navigate the new landscape, and ensure your child is in a position to succeed.",
      "Join us for a town hall meeting, on Tuesday April 14, 7:15pm, at Tom Conley Park, where we will discuss all of these issues, our upcoming evaluations, and much more.",
      "Have questions? Email: jeff@DorchesterUnited.org",
    ],
    source: "dorchesterunited.org",
    cta: { label: "Email the club", href: "mailto:jeff@DorchesterUnited.org" },
  },
  {
    id: "evals-2025",
    date: "2025-04-01",
    title: "2025/2026 Evaluations",
    category: "Registration",
    summary: "Registration opened for the 2025/2026 soccer year evaluations.",
    body: [
      "Registration is now open for our upcoming evaluations for the 2025/2026 soccer year!",
      "For more information, please visit the club's PlayMetrics site.",
    ],
    source: "dorchesterunited.com",
    cta: { label: "Club PlayMetrics site", href: PLAYMETRICS_SITE },
  },
  {
    id: "spring-registration",
    date: "2024-12-30",
    title: "Registration for Spring Now Open",
    category: "Registration",
    summary: "Spots available for boys and girls ages 7–14, with a free evaluation.",
    body: [
      "We have spots available for boys and girls ages 7-14!",
      "Register today for a free evaluation. Email the club with any questions!",
    ],
    source: "dorchesterunited.com",
    cta: { label: "Free evaluation", href: REGISTER_URL },
  },
  {
    id: "u19-open-cup",
    date: "2024-12-09",
    title: "U19 Wins Open Cup",
    category: "Results",
    summary: "Congratulations to our U19s for capturing the Championship of the South Carolina Open Cup!",
    body: [
      "Congratulations to our U19s for a fantastic performance in capturing the Championship of the South Carolina Open Cup!",
      "After 2 Open Cup Championships in the past 3 years, this year our oldest team outdid themselves by winning the top division! They only gave up 2 goals in 4 games with a backup goalie all weekend! Great job boys, we are so proud of you!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "u17-open-cup",
    date: "2024-12-08",
    title: "U17 Finish as Open Cup Finalists",
    category: "Results",
    summary: "Undefeated in group play, the U17s lost a tough 1–0 championship game.",
    body: [
      "Congratulations to our U17s for finishing as finalists in the SC Open Cup!",
      "Undefeated in group play, they lost a tough 1-0 Championship game. They played fantastic all weekend and capped off their season with some hardware! Great job boys, we are very proud of you!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "league-play-next",
    date: "2024-09-01",
    title: "League Play Next",
    category: "Competition",
    summary: "Preseason tournaments are complete — teams competed in three different states.",
    body: [
      "Preseason tournaments are complete. We have had teams compete in three different states in the last 3 weeks and we saw some incredible individual and team performances!",
      "League play starts next week!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "night-at-battery",
    date: "2024-08-24",
    title: "DUSC Night at the Battery",
    category: "Events",
    summary: "Our annual night at the Charleston Battery — kickoff weekend for state league play.",
    body: [
      "Join us for our annual DUSC Night at the Charleston Battery!",
      "Come celebrate kickoff weekend for state league play and enjoy professional soccer in the Lowcountry with your friends!",
      "$12 General Admission tickets are available now!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "tom-conley-update",
    date: "2024-08-11",
    title: "Tom Conley Update",
    category: "Field & Weather",
    summary: "Storm damage to the lighting system at Tom Conley meant another week without practice.",
    body: [
      "We have experienced storm damage to our lighting system at Tom Conley and will miss another week of practice.",
      "We will be back next week. Be sure all of our players are getting their touches on the ball!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "tropical-storm",
    date: "2024-08-04",
    title: "Tropical Storm Update",
    category: "Field & Weather",
    summary: "First-week practices in doubt — families directed to their Team Reach pages.",
    body: [
      "It is not looking good for the first week of practice.",
      "Please check your Team Reach pages for updates regarding this weeks practices.",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "season-approaching",
    date: "2024-07-29",
    title: "Season Approaching",
    category: "Club Update",
    summary: "Practices start next week — check your Team Reach page for fall season updates.",
    body: [
      "Be sure to check your Team Reach page for all the updates regarding the upcoming fall season.",
      "Practices start next week!",
    ],
    source: "dorchesterunited.com",
  },
  {
    id: "upcoming-tournaments",
    date: "2024-07-01",
    title: "Upcoming Tournaments",
    category: "Competition",
    summary: "Fall tournaments in Myrtle Beach, Augusta, Asheville and Greensboro.",
    body: [
      "Be sure to check your Team Reach page for updates on our first round of Fall Tournaments: Myrtle Beach, Augusta, Asheville, & Greensboro!",
    ],
    source: "dorchesterunited.com",
  },
];

export const FIELDS = [
  {
    id: "tom-conley",
    name: "Tom Conley Field",
    venue: "Tom Conley Park",
    street: "1050 Discovery Dr",
    city: "Ladson, SC 29456",
    query: "1050 Discovery Dr, Ladson, SC 29456",
    use: "Home for Junior Academy and Academy practices, and where all competitive teams practice on the club's 2026–2027 program. Also the site of the club's town-hall meetings.",
    site: { label: "Tom Conley Park website", href: "https://www.tomconleypark.com/" },
    archived: "Last status posted on the older club site: Open — updated 08/21/24",
  },
  {
    id: "oakbrook-ymca",
    name: "Oakbrook YMCA",
    venue: "Oakbrook YMCA",
    street: "900 Crosscreek Dr",
    city: "Summerville, SC 29485",
    query: "900 Crosscreek Dr, Summerville, SC 29485",
    use: "Where the club began. Little Ballers and Recreation teams practiced and played here in the 2025–2026 program year.",
    site: null as null | { label: string; href: string },
    archived: "Last status posted on the older club site: Open — updated 09/05/24",
  },
];
export const mapsEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
export const mapsDirections = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export const PARTNERS = [
  { name: "Goose Creek Mitsubishi", href: "https://www.goosecreekmitsubishi.com/", key: "goose" },
  { name: "Ground Under Repair", href: "https://gurdesigns.com/", key: "gur" },
  { name: "Puma", href: "https://us.puma.com/us/en", key: "puma" },
  { name: "Soccer.com — DUSC Store", href: "https://www.soccer.com/club/#/2004900094/fanwear?category=Shirts&brand=puma", key: "soccer" },
] as const;

export type LinkItem = { label: string; href: string; note: string };
export const LINK_GROUPS: { title: string; blurb: string; items: LinkItem[] }[] = [
  {
    title: "Club essentials",
    blurb: "Registration, team pages and the club store.",
    items: [
      { label: "Register / Free Evaluation", href: REGISTER_URL, note: "PlayMetrics registration" },
      { label: "Club PlayMetrics site", href: PLAYMETRICS_SITE, note: "Team & program information" },
      { label: "Soccer.com — DUSC Store", href: "https://www.soccer.com/club/#/2004900094/fanwear?category=Shirts&brand=puma", note: "Uniforms & fanwear" },
      { label: "Soccer.com", href: "https://www.soccer.com/", note: "Gear & equipment" },
    ],
  },
  {
    title: "Leagues",
    blurb: "South Carolina Youth Soccer Association competitions.",
    items: [
      { label: "SCYSA", href: "https://www.scyouthsoccer.com/", note: "State association" },
      { label: "PMSL", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385518", note: "SCYSA league" },
      { label: "Open League", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385519", note: "SCYSA league" },
      { label: "Coastal Premier League", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385521", note: "SCYSA league" },
    ],
  },
  {
    title: "Tournaments & Cups",
    blurb: "Events DUSC teams have competed in.",
    items: [
      { label: "James Island Cup", href: "https://soccer.sincsports.com/TTContent.aspx?tid=JIC", note: "Tournament" },
      { label: "Savannah United Finale", href: "https://soccer.sincsports.com/TTContent.aspx?tid=CELPR&tab=1", note: "Tournament" },
      { label: "SC Open Cup", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385527", note: "State cup" },
      { label: "Presidents Cup", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385525", note: "State cup" },
    ],
  },
  {
    title: "The wider game",
    blurb: "National and international governing bodies.",
    items: [
      { label: "SCYSA (scysa.org)", href: "https://www.scysa.org/", note: "State association" },
      { label: "US Youth Soccer", href: "https://www.usyouthsoccer.org/", note: "National youth body" },
      { label: "U.S. Soccer", href: "https://www.ussoccer.com/", note: "National federation" },
      { label: "Concacaf", href: "https://www.concacaf.com/", note: "Regional confederation" },
      { label: "FIFA", href: "https://www.fifa.com/", note: "World governing body" },
    ],
  },
];

export const COMPETITIONS = [
  { name: "SCYSA Open League", who: "Academy teams", note: "All Academy teams play in the SCYSA Open League (2025–2026 program).", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385519" },
  { name: "Carolina Premier League — Lowcountry Division", who: "Junior Academy teams", note: "Junior Academy teams play in the SCYSA Carolina Premier League, Lowcountry Division (2025–2026 program).", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385521" },
  { name: "PMSL", who: "Promoted teams", note: "U17 and U19 boys earned promotion to the PMSL after the Fall 2023 Open League season.", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385518" },
  { name: "SC Open Cup", who: "State cup", note: "DUSC won its first SC Open Cup championship in December 2021. The U16 Boys won in Fall 2022 and the U19s won the top division in December 2024; the U17s were finalists that same weekend.", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385527" },
  { name: "Presidents Cup", who: "State cup", note: "Listed among the club's competition resources.", href: "https://www.scyouthsoccer.com/Default.aspx?tabid=1385525" },
  { name: "James Island Cup", who: "Tournament", note: "The club's first competition outside the Oakbrook Y (Fall 2019).", href: "https://soccer.sincsports.com/TTContent.aspx?tid=JIC" },
  { name: "Savannah United Finale", who: "Tournament", note: "Listed among the club's tournament resources.", href: "https://soccer.sincsports.com/TTContent.aspx?tid=CELPR&tab=1" },
  { name: "Columbia County Cup (Augusta)", who: "Pre-season tournament", note: "U14 Girls reached the championship game in Fall 2023.", href: "" },
];

export const PROGRAM_OPTIONS = ["Little Ballers", "Recreation", "Junior Academy", "Academy", "Not sure yet — help me choose"];
