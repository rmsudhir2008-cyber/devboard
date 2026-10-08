export const categories = ['All', 'Hackathon', 'Workshop', 'Conference', 'Meetup']

const categoryInfo = {
  Hackathon: { color: 'violet', topics: ['Build for Tomorrow', 'Code for Climate', 'Orbit', 'Open Source Forge', 'HealthTech Sprint', 'Fintech Frontier', 'Civic Stack', 'Future of Work', 'Pixel to Product', 'Data for Good'], formats: ['Hackathon', 'Build Jam', 'Innovation Sprint', 'Creator Challenge'], locations: ['Chennai · IIT Madras Research Park', 'Delhi · IIT Delhi Hauz Khas', 'Mumbai · IIT Bombay Powai', 'Kharagpur · IIT Kharagpur', 'Kanpur · IIT Kanpur Outreach Centre', 'Hyderabad · T-Hub', 'Bangalore · IISc Innovation Hub', 'Trichy · NIT Tiruchirappalli', 'Surat · SVNIT Innovation Lab', 'Bhopal · MANIT Campus'], tags: ['AI', 'Build teams', 'Prizes'], duration: '36 hours' },
  Workshop: { color: 'orange', topics: ['Design Systems', 'Cloud Native Camp', 'Modern React', 'Prompt Engineering', 'API Craft', 'Data Storytelling', 'Mobile Motion', 'Secure by Design', 'Product Discovery', 'DevOps Lab'], formats: ['Studio', 'Hands-on Lab', 'Workshop', 'Masterclass'], locations: ['Online · DevBoard Studio', 'Chennai · IIT Madras Incubation Cell', 'Bangalore · IIIT Bangalore', 'Pune · COEP Technological University', 'Hyderabad · IIIT Hyderabad', 'Delhi · IIIT Delhi', 'Kochi · Maker Village', 'Ahmedabad · IIT Gandhinagar', 'Online · Live classroom', 'Mysore · SJCE Innovation Centre'], tags: ['Hands-on', 'Certificate', 'Small group'], duration: '3 hours' },
  Conference: { color: 'blue', topics: ['The AI Shift', 'Product Futures', 'Frontend Forward', 'Cloud Connect', 'Women Who Ship', 'Developer Experience', 'The Open Web', 'Data Summit', 'India DevCon', 'Scale & Systems'], formats: ['Summit', 'Conference', 'Forum', 'Sessions'], locations: ['Mumbai · Jio World Centre', 'Bangalore · Palace Grounds', 'Chennai · Chennai Trade Centre', 'Delhi · India Habitat Centre', 'Hyderabad · HITEX Exhibition Centre', 'Kolkata · Biswa Bangla Convention Centre', 'Goa · BITS Goa Campus', 'Jaipur · JECRC Foundation', 'Online · Global stream', 'Bhubaneswar · IIT Bhubaneswar'], tags: ['Keynotes', 'Networking', 'Industry leaders'], duration: '1 day' },
  Meetup: { color: 'pink', topics: ['Frontend Fridays', 'Code & Chai', 'AI After Hours', 'Design Crit Club', 'Women in Tech', 'Startup Sidequests', 'Open Source Social', 'No-Code Night', 'Developer Coffee', 'The Debug Club'], formats: ['Meetup', 'Community Night', 'Show & Tell', 'Social'], locations: ['Bangalore · Indiranagar', 'Chennai · Adyar', 'Pune · Koregaon Park', 'Hyderabad · Banjara Hills', 'Mumbai · Bandra', 'Delhi · Hauz Khas Village', 'Kochi · Fort Kochi', 'Ahmedabad · Navrangpura', 'Coimbatore · Peelamedu', 'Indore · Vijay Nagar'], tags: ['Community', 'Networking', 'Friendly faces'], duration: '2.5 hours' },
}

const curatedEvents = [
  { id: 'build-for-tomorrow', title: 'Build for Tomorrow', category: 'Hackathon', date: '2026-11-15T09:00:00', endDate: '2026-11-16T18:00:00', location: 'Bangalore · NIMHANS Convention Centre', mode: 'In person', attendees: '1,200+', color: 'violet', description: 'A 36-hour sprint for builders creating technology with meaningful social impact. Bring an idea, find a team, and ship something people can use.', tags: ['AI', 'Social impact', 'Beginner friendly'] },
  { id: 'design-systems-live', title: 'Design Systems, Live', category: 'Workshop', date: '2026-10-21T18:30:00', endDate: '2026-10-21T21:00:00', location: 'Online · Zoom', mode: 'Online', attendees: '300 spots', color: 'orange', description: 'Turn scattered UI patterns into a practical design system. Learn from a working product team and leave with a tested starting framework.', tags: ['Design', 'Figma', 'Hands-on'] },
  { id: 'the-ai-shift', title: 'The AI Shift', category: 'Conference', date: '2026-12-04T10:00:00', endDate: '2026-12-04T18:30:00', location: 'Mumbai · Jio World Centre', mode: 'In person', attendees: '2,000+', color: 'blue', description: 'A one-day gathering for people shaping the next chapter of intelligent products, infrastructure, and creative tools.', tags: ['Artificial intelligence', 'Product', 'Keynotes'] },
  { id: 'frontend-fridays', title: 'Frontend Fridays', category: 'Meetup', date: '2026-10-16T18:00:00', endDate: '2026-10-16T20:30:00', location: 'Bangalore · Indiranagar', mode: 'In person', attendees: '80 spots', color: 'pink', description: 'A friendly evening for frontend engineers to trade ideas, share work, and meet people who care about the details.', tags: ['Frontend', 'Community', 'Lightning talks'] },
  { id: 'cloud-native-camp', title: 'Cloud Native Camp', category: 'Workshop', date: '2026-11-01T09:30:00', endDate: '2026-11-01T17:30:00', location: 'Online · DevBoard Studio', mode: 'Online', attendees: '150 spots', color: 'mint', description: 'Get hands-on with containers, deployment workflows, and observability in an all-day learning lab for modern engineering teams.', tags: ['Cloud', 'Kubernetes', 'Hands-on'] },
  { id: 'code-and-chai', title: 'Code & Chai', category: 'Meetup', date: '2026-11-07T16:00:00', endDate: '2026-11-07T18:00:00', location: 'Pune · Koregaon Park', mode: 'In person', attendees: '60 spots', color: 'yellow', description: 'No slides, no pressure. Just a welcoming co-working afternoon for makers who like good code and better conversations.', tags: ['Community', 'Networking', 'Casual'] },
]

const hashEvent = (id) => Array.from(id).reduce((hash, char) => ((hash * 31 + char.charCodeAt(0)) >>> 0), 7)
const visuals = ['art-orbit', 'art-circuit', 'art-neural', 'art-cloud', 'art-spark', 'art-terminal', 'art-wave', 'art-matrix']

const detailsFor = (event) => {
  const seed = hashEvent(event.id)
  const participantCount = 68 + (seed % 5400)
  const rewardPool = event.category === 'Hackathon' ? ['Prizes worth ₹25K', 'Prizes worth ₹50K', 'Prizes worth ₹1L', 'Mentor spotlight'] : event.category === 'Workshop' ? ['Skill badge included', 'Portfolio feedback', 'Hands-on certificate', 'Mentor office hours'] : event.category === 'Conference' ? ['Industry access pass', 'Curated networking', 'Keynote access', 'Recruiter sessions'] : ['Community perks', 'Peer feedback', 'Coffee & connections', 'Member spotlight']
  return {
  ...event,
  visual: visuals[seed % visuals.length],
  attendees: `${participantCount.toLocaleString()} members`,
  price: event.category === 'Conference' ? '₹499' : 'Free',
  reward: rewardPool[seed % rewardPool.length],
  eligibility: event.category === 'Hackathon' ? 'Open to students & early professionals' : event.category === 'Workshop' ? 'Open to all curious builders' : event.category === 'Conference' ? 'Open to students, educators & professionals' : 'Open to everyone in tech',
  deadline: event.category === 'Hackathon' ? 'Applications close in 6 days' : event.category === 'Workshop' ? 'Registration closes in 3 days' : event.category === 'Conference' ? 'Early access ends in 8 days' : 'RSVP closes in 4 days',
  registrations: `${participantCount.toLocaleString()} ${event.category === 'Hackathon' ? 'applied' : event.category === 'Workshop' ? 'enrolled' : event.category === 'Conference' ? 'registered' : 'going'}`,
  level: event.category === 'Workshop' ? 'Intermediate' : 'All levels',
  organizer: 'DevBoard Collective',
  duration: categoryInfo[event.category].duration,
  agenda: [
    { time: '09:00', title: 'Check-in & coffee', note: 'Pick up your badge and meet the community.' },
    { time: '10:00', title: event.category === 'Hackathon' ? 'Kick-off and team formation' : 'Main session', note: 'Practical ideas from people doing the work.' },
    { time: '13:00', title: 'Community break', note: 'A chance to connect with other curious minds.' },
    { time: '15:00', title: event.category === 'Conference' ? 'Featured conversations' : 'Build, practice & share', note: 'Put fresh knowledge into motion.' },
  ],
  speakers: ['Aarav Mehta · Product engineer', 'Maya Kapoor · Design lead', 'Rohan Iyer · Community builder'],
  rounds: event.category === 'Hackathon'
    ? [{ title: 'Registration', note: 'Save your spot and optionally find a team.' }, { title: 'Build sprint', note: 'Create, test, and shape your solution.' }, { title: 'Demo & judging', note: 'Share your work with mentors and judges.' }]
    : [{ title: 'Register', note: 'Confirm your place on the guest list.' }, { title: 'Show up', note: 'Join the sessions, people, and practical moments.' }, { title: 'Put it to work', note: 'Take the useful bits into your next project.' }],
  }
}

const generatedEvent = (category, index) => {
  const info = categoryInfo[category]
  const topic = info.topics[index % info.topics.length]
  const format = info.formats[Math.floor(index / info.topics.length) % info.formats.length]
  const date = new Date('2026-10-15T09:00:00')
  date.setDate(date.getDate() + index * 3 + categories.indexOf(category) * 4)
  const endDate = new Date(date)
  endDate.setHours(date.getHours() + (category === 'Hackathon' ? 36 : category === 'Conference' ? 8 : 3))
  const location = info.locations[(index * 7 + categories.indexOf(category) * 3) % info.locations.length]
  return detailsFor({
    id: `${category.toLowerCase()}-${String(index + 1).padStart(3, '0')}`,
    title: `${topic}: ${format} ${String(index + 1).padStart(3, '0')}`,
    category,
    date: date.toISOString(),
    endDate: endDate.toISOString(),
    location,
    mode: location.startsWith('Online') ? 'Online' : 'In person',
    attendees: `${50 + (index * 17) % 1800} ${category === 'Conference' ? 'attendees' : 'spots'}`,
    color: info.color,
    description: `${topic} is a ${info.duration} ${format.toLowerCase()} for people who want to learn, make progress, and meet collaborators. Expect useful context, practical moments, and time to share what you are working on.`,
    tags: [...info.tags, topic.split(' ')[0]],
  })
}

const buildEvents = () => categories.slice(1).flatMap((category) => {
  const featured = curatedEvents.filter((event) => event.category === category).map(detailsFor)
  return [...featured, ...Array.from({ length: 500 - featured.length }, (_, index) => generatedEvent(category, index + featured.length))]
})

export const events = buildEvents()
