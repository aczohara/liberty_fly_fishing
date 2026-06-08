import { useState } from 'react';
import TopoBackground from './TopoBackground';

const GOOGLE = 'google';
const TA     = 'tripadvisor';

// Most compelling reviews first — emotional impact, specific stories, longevity
const reviews = [
    { platform: TA,     name: 'Eric W',              time: 'Jul 2025',      text: 'I\'ve had dozens of guides throughout the Rockies. Patrick is in the top two or three I\'ve ever had. He worked diligently all day to keep us on the fish. My 12-year-old son\'s first float trip — Patrick was an unbelievable coach for him. Highly recommend.' },
    { platform: GOOGLE, name: 'John Hansen',          time: '1 year ago',    text: 'Unbelievable experience with Patrick on the Eagle River. Perhaps one of the best guides I have ever fished with in 40 plus years. Great communication, great coaching and top-notch ability to read water and put you on fish.' },
    { platform: TA,     name: 'Liz D',               time: 'Jul 2025',      text: 'Patrick is 5 stars all the way — very knowledgeable, patient, helpful and just a fun guy! It happened to be my birthday and he showed up with cupcakes and party hats!! Now THIS is the guide you want to call!' },
    { platform: GOOGLE, name: 'Fred Carragher',       time: '7 months ago',  text: 'I travel quite a bit and hire fishing guides often. Patrick is one of the BEST! You will not be disappointed. He is always positive and will make even a beginner feel great about their efforts. Highest recommendations — we will be back trip after trip.' },
    { platform: GOOGLE, name: 'Marc Friedberg',       time: '11 months ago', text: 'Five incredible years and dozens of float trips on the Roaring Fork and Colorado River with Patty from Liberty Flyfishing. His passion for angling is inspiring — every trip has been outstanding.' },
    { platform: GOOGLE, name: 'T E Leonard',          time: '1 month ago',   text: 'Who would have believed on a snowy 28-degree day you can have the best afternoon of trout fishing. Five of us, three guides — Patrick, Taylor, and David. Outstanding instruction and a day we won\'t forget.' },
    { platform: GOOGLE, name: 'Cassidy Bryant',       time: '1 year ago',    text: 'Fishing with Patrick was truly one of the best experiences I\'ve ever had with a fishing guide! As a first-timer, he took the time to explain every detail from casting to fly placement. Will always fish with Patrick when I come to CO!' },
    { platform: GOOGLE, name: 'Andrew Mcliney',       time: '1 year ago',    text: 'I have been fishing with Pat for over 6 years. All of my trips have exceeded my expectations. Pat is professional, optimistic and passionate — he always finds a way to give shots at trophy fish.' },
    { platform: TA,     name: 'Megan H',              time: 'Jul 2025',      text: 'Patrick and the Liberty guides are the real deal! We\'ve hired this crew 5 times and each experience has made me even more hooked on fly fishing. We\'ve even brought our 8-year-old daughter — she caught two trout on her own! An incredible Colorado experience.' },
    // ── remaining Google ───────────────────────────────────────────────────────
    { platform: GOOGLE, name: 'Taylor Woodard',       time: '10 months ago', text: 'The Best Fly Fishing Guide — We\'ve been floating with Patrick for years! Every single trip somehow gets better. His knowledge of the water and passion for teaching makes every outing unforgettable.' },
    { platform: GOOGLE, name: 'Joshua Davis',         time: '10 months ago', text: 'Had a fantastic guided float trip with Patrick from Liberty Fly Fishing. The boat, rods, and all the gear were in top-notch condition. Patrick was phenomenal — especially with my nine-year-old son, making the day both fun and educational.' },
    { platform: GOOGLE, name: 'Isabel Brandmeyer',    time: '1 year ago',    text: 'Pat is the best fly fishing guide in Vail Valley! I have been fishing with him many times — he has taught me everything I need to know and makes fishing super fun. We always catch awesome fish in every season.' },
    { platform: GOOGLE, name: 'Jessica Luiz',         time: '1 year ago',    text: 'My fiancé and I had a wonderful time fly fishing with Patrick. He made everything so easy and fun. Patrick was a great teacher, super knowledgeable and patient every time I got my fly tangled. Highly recommend!!' },
    { platform: GOOGLE, name: 'Brandon Abel',         time: '10 months ago', text: 'Fished with Patty for two days on the Roaring Fork — two different sections, caught plenty of fish both days. Absolutely hammered the biggest trout I\'ve ever caught with Patty\'s help and guidance. He is the man. I\'ll be back.' },
    { platform: GOOGLE, name: 'Steve Cserpnyak',      time: '1 year ago',    text: 'Patrick and his team at Liberty Flyfishing are one of the best flyfishing guide services in Colorado. His knowledge of the Roaring Fork Valley is second to none.' },
    { platform: GOOGLE, name: 'Bruce McClendon',      time: '11 months ago', text: 'We had a great experience with Patrick. He was very knowledgeable and taught us how to fly fish. We rafted the river for 4–5 miles — he was very patient and we caught eight trout. It was a barrel of fun. I would do it again!' },
    { platform: GOOGLE, name: 'Catie',                time: '1 year ago',    text: 'Patrick really knows what he\'s doing and makes sure you\'re learning and having fun the whole time. He was very communicative in the planning process and did an awesome job picking out local fishing options.' },
    { platform: GOOGLE, name: 'Kristen Sawyer',       time: '1 year ago',    text: 'Patrick was an amazing guide/teacher for my first time fly fishing. He was very patient and explained in depth all the things I needed to know to catch multiple fish! I will definitely be using Patrick in the future!' },
    { platform: GOOGLE, name: 'Bob',                  time: '11 months ago', text: 'Great day on the water! We had an amazing float on the Roaring Fork. Patrick knows this river well and he put us on fish all day! We are already scheduling our next float!' },
    { platform: GOOGLE, name: 'Ryan Johnson',         time: '11 months ago', text: 'Epic day of fishing on the Roaring Fork. I will definitely book future fly fishing trips. Patrick is an excellent guide and person.' },
    { platform: GOOGLE, name: 'MBT',                  time: '5 months ago',  text: 'Fished the Colorado with Patrick on December 10, 2025. What an incredible trip! Patrick is a patient, detailed and knowledgeable guide, not to mention a genuinely nice guy.' },
    { platform: GOOGLE, name: 'Jeff Carragher',       time: '7 months ago',  text: 'Fantastic Fall Float down the Colorado and Roaring Fork! Patrick and his Liberty team put a great 2 days together for us. Highly recommend his services! We will be back.' },
    { platform: GOOGLE, name: 'Zach Ryan',            time: '10 months ago', text: 'Patrick from Liberty has been my favorite guide to use in Colorado. Multiple trips throughout the years and he has always provided top quality service.' },
    { platform: GOOGLE, name: 'Marty Hogan',          time: '9 months ago',  text: 'Patrick is an excellent guide that I\'ve fished with for years. He has also been a patient teacher of my son during our trips.' },
    { platform: GOOGLE, name: 'Andrew Carragher',     time: '7 months ago',  text: 'One of the best fishing experiences I\'ve ever had. Can\'t imagine having spent it with anyone else.' },
    { platform: GOOGLE, name: 'Andrew Plugge',        time: '1 year ago',    text: 'Great ¾ day with Patrick on the Eagle. Put us on sizable fish consistently and coached a first-time streamer fisher to the best catch of the day. Will definitely be back.' },
    { platform: GOOGLE, name: 'Jeff Farmer',          time: '10 months ago', text: 'A friend kept raving how amazing Pat from Liberty was. He might have undersold it! The day was absolutely amazing!' },
    { platform: GOOGLE, name: 'Elizabeth Cox',        time: '11 months ago', text: 'Patrick is a master of the river and runs a top notch business. He is a patient teacher and happily accommodates all skill levels. It is always a great time — highly recommend!' },
    { platform: GOOGLE, name: 'Jack Keenan',          time: '1 year ago',    text: 'Had a blast fishing with Patrick today. Cast, mend, marinate and hook. Easy peasy. You won\'t regret going with Patrick/Liberty.' },
    { platform: GOOGLE, name: 'M 3 Properties',       time: '1 year ago',    text: 'Great experience using this guide service. We had three boats and 5 people — each guide was excellent in teaching fly fishing and patient with first-timers. Great family activity!' },
    { platform: GOOGLE, name: 'John Colvin',          time: '1 year ago',    text: 'Patrick was a phenomenal teacher for my first time fly fishing. He asked me my goals for the day and did not disappoint!' },
    { platform: GOOGLE, name: 'Kris Hedstrom',        time: '2 days ago',    text: 'Awesome day! Patrick took us to some great spots that produced. He took care of all the mishaps with a smile. Can\'t say enough good things. Looking forward to fishing Louisiana with him too.' },
    { platform: GOOGLE, name: 'Pat Seitz',            time: '1 month ago',   text: 'Guides were great and we caught a lot of fish. Never fly fished before, but came away feeling like a pro 😁' },
    { platform: GOOGLE, name: 'Lev Buslovich',        time: '1 month ago',   text: 'Beautiful scenery, knowledgeable guides, lots of fish and great time.' },
    { platform: GOOGLE, name: 'Karen Cornella',       time: '1 month ago',   text: 'Thanks Patrick for an amazing day on the river! As a first-time fly fisher I really appreciated your patience and enthusiasm! You got me hooked on the sport!' },
    { platform: GOOGLE, name: 'Dave Cornella',        time: '1 month ago',   text: 'We had an awesome day on the river with Patrick! He kept us on the fish all day and we caught loads of trout! He\'s a fishing enthusiast and was such a pleasure to spend the day with! We\'ll be back.' },
    { platform: GOOGLE, name: 'Maria Elosua',         time: '1 month ago',   text: 'Had an amazing time with Joel and Patrick! They were amazing guides and super patient teaching me as a first timer.' },
    { platform: GOOGLE, name: 'Diego Elosua',         time: '1 month ago',   text: 'I went on a float trip with Patrick and it was amazing. Patrick has great patience and is a great teacher. Truly recommend!' },
    { platform: GOOGLE, name: 'Michael Montoya',      time: '1 year ago',    text: 'Had a great day fishing the eagle river.' },
    // ── TripAdvisor ───────────────────────────────────────────────────────────
    { platform: TA,     name: 'Enesontour',           time: 'Jul 2025',      text: 'Absolutely fantastic experience! I booked a float for myself and my 81-year-old dad, who hadn\'t touched a rod in decades. Within minutes Pop went from "Wait, which end goes in the water?" to snagging trout like he was back in his prime. A memory we\'ll talk about for years.' },
    { platform: TA,     name: 'Ryan R',               time: 'Jul 2025',      text: 'Fishing with Patrick was phenomenal. You can tell from the beginning that he has a passion for the sport, the fish, and the river. He will go above and beyond to make sure you have a great experience. The best guide out there.' },
    { platform: TA,     name: 'Fred Carragher',       time: 'Oct 2025',      text: 'Never been to Colorado to fish in the Fall but it will now be an annual trip. Liberty Fly Fishing and Patrick are the best! Weather was terrible but we were on fish ALL DAY for two days straight.' },
    { platform: TA,     name: 'Justin M',             time: 'Sep 2024',      text: 'I had an absolute blast with Patrick on the Roaring Fork and Colorado. Incredibly knowledgeable and great instructors. I had never tossed streamers until this trip — now I\'m confident casting large streamers! They put you on fish. Highly recommended.' },
    { platform: TA,     name: 'Andrew P',             time: 'May 2025',      text: 'Had a blast on the Eagle River with my dad. Caught 20+ on a ¾-day trip with solid average length and weight. Patrick was extremely knowledgeable and positive, guiding us to larger fish. Will definitely be back!' },
    { platform: TA,     name: 'Isabel B',             time: 'Dec 2024',      text: 'Pat is the best fly fishing guide in Vail Valley! He has taught me everything I need to know and makes fishing super fun. He truly knows all the rivers and the best spots. He also makes great lunch — an extra perk! 100% recommend!' },
    { platform: TA,     name: 'Andrew M',             time: 'Dec 2024',      text: 'I have been fishing with Pat for over 6 years. All of my trips have exceeded my expectations. Even on a cold December float, Pat found a way to get us on the fish — over 10 caught, multiple above 17 inches, with hot chili on the water.' },
    { platform: TA,     name: 'Chandler C',           time: 'Sep 2024',      text: 'Great experience using Liberty! We had three total guides and they were all fantastic. They put each of us on fish and put in effort the entire float trip. Very patient with the people in our group who were new to fly fishing. Highly recommend!' },
    { platform: TA,     name: 'Laura Lee C',          time: 'Sep 2024',      text: '14 miles, 7 hours and 5 rainbow trout later — had the best day ever. First time fly fishing and certainly not the last. Huge kudos to PattyG ❤️' },
    { platform: TA,     name: 'John C',               time: 'May 2025',      text: 'First time fly fishing. Patrick was phenomenal coaching the fundamentals! A great student only comes from a great teacher. Forever hooked thanks to Patrick! Can\'t wait to go again.' },
    { platform: TA,     name: 'Zach R',               time: 'Jul 2025',      text: 'Patrick from Liberty has been my favorite guide in Colorado. Multiple trips over the years — always top quality service. On my most recent trip, friends new to fly fishing got expert coaching and he put us on a ton of fish.' },
    { platform: TA,     name: 'Bruce McClendon',      time: 'Jun 2025',      text: 'We had a wonderful experience with Liberty Fly Fishing. Patrick is a great guide and teacher. He taught us how to fly fish and we floated down the Eagle River and caught a trout. It was really a wonderful trip.' },
    { platform: TA,     name: 'Ryan J',               time: 'Jun 2025',      text: 'Epic day of fishing on the Roaring Fork. Patrick educated us on the fishery, knot tying, and rigging techniques. I will definitely book future fly fishing trips. Awesome guide and person.' },
    { platform: TA,     name: 'Brandon A',            time: 'Jul 2025',      text: 'I fished with Liberty Fly Fishing on the Roaring Fork between Carbondale and Glenwood Springs. Patrick was amazing — he taught me so much and we landed a ton of fish nymphing and on the dry fly.' },
    { platform: TA,     name: 'Kristen S',            time: 'Nov 2024',      text: 'Patrick was an amazing guide/teacher for my first time fly fishing. He was very patient and explained in depth all the things I needed to know to catch multiple fish! I will definitely be using Patrick in the future!' },
    { platform: TA,     name: 'Daydream / Eagle',     time: 'May 2025',      text: 'Patrick did fantastic for my wife and I during a trip to Vail. We fished the Eagle River with great success. His instructions were very clear and he went the extra mile to take us back to our hotel after an incredible day.' },
    { platform: TA,     name: 'Compass',              time: 'Jul 2025',      text: 'Great trip! Patrick was fun to be with, knowledgeable and patient. Beautiful scenery and yes — we caught trout. Looking forward to another trip.' },
    { platform: TA,     name: 'Megan H',              time: 'Jul 2025',      text: 'If you\'re looking for expert guidance and an extra fishy experience then do yourself a favor and guide with Liberty! We\'ve seen bald eagle, deer, osprey and incredible mountain scenes. There\'s not much that compares to fly fishing down a Colorado river.' },
];

// The 2 stories that stop readers cold — shown as featured pull-quotes
const FEATURED = [
    {
        platform: TA,
        name: 'Enesontour',
        time: 'Jul 2025',
        text: 'I booked a float for myself and my 81-year-old dad, who hadn\'t touched a rod in decades. Within minutes Pop went from "Wait, which end goes in the water?" to snagging trout like he was back in his prime. A memory we\'ll talk about for years.',
    },
    {
        platform: TA,
        name: 'Liz D',
        time: 'Jul 2025',
        text: 'Patrick is 5 stars all the way. It happened to be my birthday and he showed up with cupcakes and party hats!! Very knowledgeable, patient, helpful and just a fun guy to be on the water with. This is the guide you want to call.',
    },
];

const ICON = {
    google:      { src: '/google_icon.png',         label: 'Google' },
    tripadvisor: { src: '/tripadvisor-858x858.png', label: 'Tripadvisor' },
};

const INITIAL_COUNT = 9;

function FeaturedQuote({ review }) {
    const icon = ICON[review.platform];
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem 3rem',
            boxShadow: '0 4px 24px rgba(26,46,69,0.1)',
            border: '1px solid rgba(26,46,69,0.06)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative quote mark */}
            <span style={{
                position: 'absolute',
                top: '-0.5rem',
                left: '1.5rem',
                fontSize: '8rem',
                lineHeight: 1,
                color: 'var(--color-accent)',
                opacity: 0.12,
                fontFamily: 'Georgia, serif',
                pointerEvents: 'none',
                userSelect: 'none',
            }}>
                &ldquo;
            </span>
            {/* Stars */}
            <div style={{ color: 'var(--color-accent)', fontSize: '1rem', letterSpacing: '3px', marginBottom: '1rem' }}>
                ★★★★★
            </div>
            <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: 1.75,
                color: 'var(--color-text-dark)',
                margin: '0 0 1.5rem',
                fontStyle: 'italic',
                paddingLeft: '0.5rem',
            }}>
                &ldquo;{review.text}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                    <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-primary)',
                        margin: '0 0 0.1rem',
                    }}>{review.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: 0 }}>{review.time}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <img src={icon.src} alt={icon.label} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {icon.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ review }) {
    const icon = ICON[review.platform];
    return (
        <div className="review-card" style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '1.6rem',
            boxShadow: '0 2px 16px rgba(26,46,69,0.07)',
            border: '1px solid rgba(26,46,69,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--color-accent)', fontSize: '0.85rem', letterSpacing: '2px' }}>★★★★★</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <img src={icon.src} alt={icon.label} style={{ width: 16, height: 16, objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {icon.label}
                    </span>
                </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: '1.75', color: 'var(--color-text-dark)', margin: 0, flex: 1 }}>
                &ldquo;{review.text}&rdquo;
            </p>

            <div style={{ borderTop: '1px solid rgba(26,46,69,0.07)', paddingTop: '0.8rem' }}>
                <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.74rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                }}>{review.name}</p>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{review.time}</p>
            </div>
        </div>
    );
}

export default function Reviews() {
    const [showAll, setShowAll] = useState(false);
    const displayed = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);
    const googleCount = reviews.filter(r => r.platform === GOOGLE).length;
    const taCount     = reviews.filter(r => r.platform === TA).length;

    return (
        <section id="reviews" style={{
            backgroundColor: 'var(--color-bg-off-white)',
            padding: 'var(--spacing-xxl) 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <TopoBackground position="20% 80%" opacity={0.18} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span className="overline" style={{ display: 'block', textAlign: 'center' }}>Guest Reviews</span>
                    <h2 style={{
                        color: 'var(--color-primary)',
                        marginBottom: '0.75rem',
                        textTransform: 'none',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    }}>
                        {reviews.length} Five-Star Reviews
                    </h2>

                    {/* Stars + count */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</span>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)' }}>5.0</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>·</span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{reviews.length} five-star reviews</span>
                    </div>

                    {/* Platform pills */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        {[
                            { src: '/google_icon.png',         label: `Google · ${googleCount} reviews` },
                            { src: '/tripadvisor-858x858.png', label: `Tripadvisor · ${taCount} reviews` },
                        ].map(p => (
                            <div key={p.label} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                backgroundColor: 'white', border: '1px solid rgba(26,46,69,0.1)',
                                borderRadius: '999px', padding: '0.3rem 0.85rem',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            }}>
                                <img src={p.src} alt="" style={{ width: 15, height: 15, objectFit: 'contain' }} />
                                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>
                                    {p.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gold divider */}
                <div style={{ width: '48px', height: '3px', backgroundColor: 'var(--color-accent)', margin: '2rem auto 3rem' }} />

                {/* Featured pull-quotes — 2 columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '3rem',
                }}>
                    {FEATURED.map((r, i) => <FeaturedQuote key={i} review={r} />)}
                </div>

                {/* Card grid */}
                <div className="reviews-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.25rem',
                }}>
                    {displayed.map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>

                {/* Show more / less */}
                <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => setShowAll(v => !v)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.82rem', padding: '0.85rem 2.2rem' }}
                    >
                        {showAll ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
                    </button>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                fontSize: '0.75rem', color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-heading)', fontWeight: 600,
                                letterSpacing: '0.05em', textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                        >
                            <img src="/google_icon.png" alt="" style={{ width: 14, height: 14 }} />
                            See all Google reviews ↗
                        </a>
                        <a
                            href="https://www.tripadvisor.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                fontSize: '0.75rem', color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-heading)', fontWeight: 600,
                                letterSpacing: '0.05em', textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                        >
                            <img src="/tripadvisor-858x858.png" alt="" style={{ width: 14, height: 14 }} />
                            See all Tripadvisor reviews ↗
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .review-card:hover { box-shadow: 0 8px 32px rgba(26,46,69,0.14) !important; transform: translateY(-3px); }
                @media (max-width: 900px) {
                    .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    #reviews .container > div:nth-child(5) { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 560px) {
                    .reviews-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}
