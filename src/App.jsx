import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const AUTH = {
  username: "Cutus",
  password: "Chanchikulkeshi"
};

const giftSteps = [
  {
    id: 1,
    title: "Capybara Cuddle",
    message: "The comfort I get when I cuddle you I relate to a capybara's warm hug",
    icon: "🦫",
    burst: ["🦫", "✨", "💖", "🎀"]
  },
  {
    id: 2,
    title: "Tweety Duck Giggle",
    message: "A tiny yellow duck waddles in with adorable birthday squeaks.",
    icon: "🐥",
    burst: ["🐥", "✨", "💛", "🎊"]
  },
  {
    id: 3,
    title: "Butterfly Parade",
    message: "Colorful butterflies flutter around and sprinkle magic.....What magic you ask? I also don't know",
    icon: "🦋",
    burst: ["🦋", "🦋", "✨", "🌸"]
  },
  {
    id: 4,
    title: "Tulip Garden",
    message: "Ofcourse I had to add in some tulips cause theyre your favorite flower and they remind me of you.",
    icon: "🌷",
    burst: ["🌷", "💐", "✨", "💗"]
  }
];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function buildButterflies(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: randomRange(5, 92),
    delay: randomRange(0, 6),
    duration: randomRange(8, 14),
    size: randomRange(18, 36),
    drift: randomRange(-40, 40)
  }));
}

function buildMagicButterflies(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: randomRange(8, 88),
    top: randomRange(15, 78),
    dx: randomRange(-260, 260),
    dy: randomRange(-190, 140),
    duration: randomRange(3.6, 6.2),
    delay: randomRange(0, 1),
    size: randomRange(34, 66),
    hue: randomRange(0, 320)
  }));
}

function buildGlitters(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: randomRange(0, 100),
    top: randomRange(0, 100),
    size: randomRange(5, 14),
    duration: randomRange(1.4, 2.8),
    delay: randomRange(0, 1.2)
  }));
}

function buildTulipBouquets(count) {
  const options = ["💐", "🌷", "🌸"];
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: randomRange(3, 97),
    top: randomRange(10, 90),
    size: randomRange(28, 56),
    delay: randomRange(0, 1.1),
    duration: randomRange(1.6, 2.8),
    icon: options[index % options.length]
  }));
}

function buildPoppers(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: randomRange(0, 100),
    top: randomRange(0, 100),
    delay: randomRange(0, 1.8),
    duration: randomRange(1.4, 2.8),
    color: ["#ff3366", "#ffb703", "#7c3aed", "#00c2ff", "#06d6a0"][index % 5]
  }));
}

export default function App() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [opened, setOpened] = useState([]);
  const [celebration, setCelebration] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const [capybaraHugOn, setCapybaraHugOn] = useState(false);
  const [duckWaddleOn, setDuckWaddleOn] = useState(false);
  const [butterflyMagicOn, setButterflyMagicOn] = useState(false);
  const [tulipBurstOn, setTulipBurstOn] = useState(false);
  const [effectSeed, setEffectSeed] = useState(0);

  const [page, setPage] = useState("surprise");
  const [placeName, setPlaceName] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [scrapbookIndex, setScrapbookIndex] = useState(0);
  const [turnClass, setTurnClass] = useState("");

  const audioContextRef = useRef(null);
  const entriesRef = useRef([]);
  const turnTimerRef = useRef(null);

  const butterflies = useMemo(() => buildButterflies(16), []);
  const poppers = useMemo(() => buildPoppers(120), [celebration]);
  const magicButterflies = useMemo(() => buildMagicButterflies(18), [effectSeed]);
  const magicGlitters = useMemo(() => buildGlitters(48), [effectSeed]);
  const tulipBouquets = useMemo(() => buildTulipBouquets(36), [effectSeed]);

  const scrapbookPages = useMemo(() => {
    const memoryPages = entries.map((entry) => ({ ...entry, type: "memory" }));
    return [
      {
        type: "cover",
        id: "cover",
        title: "Our Virtual Scrapbook",
        text: "This is just the beginning. Turn each page to relive our places and memories."
      },
      ...memoryPages,
      {
        type: "add",
        id: "add",
        title: "Add New Memory"
      }
    ];
  }, [entries]);

  const allOpened = opened.length === giftSteps.length;

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    if (!capybaraHugOn) return;
    const timer = setTimeout(() => setCapybaraHugOn(false), 2600);
    return () => clearTimeout(timer);
  }, [capybaraHugOn]);

  useEffect(() => {
    if (!duckWaddleOn) return;
    const timer = setTimeout(() => setDuckWaddleOn(false), 2600);
    return () => clearTimeout(timer);
  }, [duckWaddleOn]);

  useEffect(() => {
    if (!butterflyMagicOn) return;
    const timer = setTimeout(() => setButterflyMagicOn(false), 6200);
    return () => clearTimeout(timer);
  }, [butterflyMagicOn]);

  useEffect(() => {
    if (!tulipBurstOn) return;
    const timer = setTimeout(() => setTulipBurstOn(false), 2900);
    return () => clearTimeout(timer);
  }, [tulipBurstOn]);

  useEffect(() => {
    if (scrapbookIndex > scrapbookPages.length - 1) {
      setScrapbookIndex(Math.max(0, scrapbookPages.length - 1));
    }
  }, [scrapbookIndex, scrapbookPages.length]);

  useEffect(() => {
    return () => {
      entriesRef.current.forEach((entry) => {
        if (entry.isObjectUrl) URL.revokeObjectURL(entry.photo);
      });
      if (turnTimerRef.current) clearTimeout(turnTimerRef.current);
    };
  }, []);

  function initAudio() {
    if (!soundOn) return null;
    if (typeof window === "undefined") return null;
    const AudioContextImpl = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextImpl) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextImpl();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }

  function playTone(ctx, frequency, duration, delay = 0, gainValue = 0.05, type = "sine") {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = ctx.currentTime + delay;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.04);
  }

  function playGiftSound(giftId) {
    const ctx = initAudio();
    if (!ctx) return;

    if (giftId === 1) {
      playTone(ctx, 170, 0.22, 0, 0.07, "triangle");
      playTone(ctx, 135, 0.26, 0.12, 0.06, "triangle");
      playTone(ctx, 220, 0.18, 0.24, 0.05, "sine");
      return;
    }

    if (giftId === 2) {
      playTone(ctx, 720, 0.1, 0, 0.05, "square");
      playTone(ctx, 650, 0.1, 0.11, 0.05, "square");
      playTone(ctx, 760, 0.1, 0.22, 0.045, "square");
      return;
    }

    if (giftId === 3) {
      [880, 1175, 1318, 1567].forEach((note, index) => {
        playTone(ctx, note, 0.22, index * 0.08, 0.045, "sine");
      });
      return;
    }

    [392, 494, 587, 784].forEach((note, index) => {
      playTone(ctx, note, 0.26, index * 0.1, 0.045, "triangle");
    });
  }

  function playCelebrationSound() {
    const ctx = initAudio();
    if (!ctx) return;
    [523, 659, 784, 1047, 1318].forEach((note, index) => {
      playTone(ctx, note, 0.18, index * 0.1, 0.06, "sine");
    });
  }

  function resetAll() {
    entriesRef.current.forEach((entry) => {
      if (entry.isObjectUrl) URL.revokeObjectURL(entry.photo);
    });
    entriesRef.current = [];

    setUser("");
    setPass("");
    setError("");
    setUnlocked(false);
    setOpened([]);
    setCelebration(false);
    setSoundOn(true);
    setCapybaraHugOn(false);
    setDuckWaddleOn(false);
    setButterflyMagicOn(false);
    setTulipBurstOn(false);
    setEffectSeed(0);

    setPage("surprise");
    setPlaceName("");
    setMemoryText("");
    setPhotoUrl("");
    setPhotoFile(null);
    setEntries([]);
    setScrapbookIndex(0);
    setTurnClass("");
  }

  function onLogin(event) {
    event.preventDefault();
    if (user === AUTH.username && pass === AUTH.password) {
      setUnlocked(true);
      setError("");
      initAudio();
      return;
    }
    setError("Wrong username or password. Try our special words.");
  }

  function openGift(id) {
    if (celebration || opened.includes(id)) return;

    playGiftSound(id);
    setOpened((prev) => [...prev, id]);

    if (id === 1) {
      setCapybaraHugOn(true);
      return;
    }

    if (id === 2) {
      setDuckWaddleOn(true);
      return;
    }

    setEffectSeed(Date.now());

    if (id === 3) {
      setButterflyMagicOn(true);
      return;
    }

    setTulipBurstOn(true);
  }

  function startCelebration() {
    if (!allOpened) return;
    setCelebration(true);
    playCelebrationSound();
  }

  function turnTo(index) {
    if (index < 0 || index >= scrapbookPages.length || index === scrapbookIndex) return;

    setTurnClass(index > scrapbookIndex ? "turn-next" : "turn-prev");
    setScrapbookIndex(index);

    if (turnTimerRef.current) clearTimeout(turnTimerRef.current);
    turnTimerRef.current = setTimeout(() => setTurnClass(""), 640);
  }

  function addScrapbookEntry(event) {
    event.preventDefault();

    const trimmedPlace = placeName.trim();
    const trimmedMemory = memoryText.trim();
    const trimmedUrl = photoUrl.trim();

    let resolvedPhoto = "";
    let isObjectUrl = false;

    if (photoFile) {
      resolvedPhoto = URL.createObjectURL(photoFile);
      isObjectUrl = true;
    } else if (trimmedUrl) {
      resolvedPhoto = trimmedUrl;
    }

    if (!trimmedPlace || !resolvedPhoto) return;

    const newEntry = {
      id: Date.now(),
      place: trimmedPlace,
      memory: trimmedMemory || "A special memory to keep forever.",
      photo: resolvedPhoto,
      isObjectUrl
    };

    setEntries((prev) => [newEntry, ...prev]);
    setPlaceName("");
    setMemoryText("");
    setPhotoUrl("");
    setPhotoFile(null);
    setTimeout(() => turnTo(1), 0);
  }

  function removeEntry(id) {
    setEntries((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target && target.isObjectUrl) URL.revokeObjectURL(target.photo);
      return prev.filter((item) => item.id !== id);
    });
  }

  if (!unlocked) {
    return (
      <main className="app-shell login-view">
        <div className="glow glow-a" />
        <div className="glow glow-b" />

        <form className="login-card" onSubmit={onLogin}>
          <h1>Our Secret Room</h1>
          <p>Enter the magic username and password to open up this cool site.</p>

          <label>
            Username
            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="username"
              autoComplete="off"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={pass}
              onChange={(event) => setPass(event.target.value)}
              placeholder="password"
            />
          </label>

          <button type="submit">Click on me daddy</button>
          {error ? <span className="error-msg">{error}</span> : null}
          <small className="hint">You are very pretty btw</small>
        </form>
      </main>
    );
  }

  if (page === "scrapbook") {
    const current = scrapbookPages[scrapbookIndex];

    return (
      <main className="app-shell party-view scrapbook-page">
        <div className="sky-gradient" />
        <section className="content-wrap scrapbook-wrap">
          <div className="controls-row">
            <h1>Our Virtual Scrapbook</h1>
            <div className="book-actions">
              <button className="sound-toggle" type="button" onClick={() => setPage("surprise")}>Back To Surprise</button>
              <button className="reset-btn" type="button" onClick={resetAll}>Reset Website</button>
            </div>
          </div>

          <p className="scrapbook-intro">Turn pages like a real scrapbook and keep adding photos with place names.</p>

          <div className="book-shell">
            <article className={`book-page ${turnClass}`} key={`${current.id}-${scrapbookIndex}`}>
              {current.type === "cover" ? (
                <div className="cover-page">
                  <h2>{current.title}</h2>
                  <p>{current.text}</p>
                  <span>{"📖✨💖"}</span>
                </div>
              ) : null}

              {current.type === "memory" ? (
                <div className="memory-page">
                  <img src={current.photo} alt={current.place} />
                  <div className="memory-page-content">
                    <h3>{current.place}</h3>
                    <p>{current.memory}</p>
                    <button type="button" className="delete-btn" onClick={() => removeEntry(current.id)}>Remove This Page</button>
                  </div>
                </div>
              ) : null}

              {current.type === "add" ? (
                <form className="scrapbook-form" onSubmit={addScrapbookEntry}>
                  <h3>Add New Memory Page</h3>
                  <label>
                    Place Name
                    <input value={placeName} onChange={(event) => setPlaceName(event.target.value)} placeholder="Example: Ooty, Marina Beach, Home" />
                  </label>

                  <label>
                    Memory Note
                    <textarea value={memoryText} onChange={(event) => setMemoryText(event.target.value)} placeholder="Write one sweet line about this memory" rows={3} />
                  </label>

                  <label>
                    Photo URL (optional if file chosen)
                    <input value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} placeholder="https://..." />
                  </label>

                  <label>
                    Upload Photo
                    <input type="file" accept="image/*" onChange={(event) => setPhotoFile(event.target.files?.[0] || null)} />
                  </label>

                  <button className="celebrate-btn" type="submit">Add To Scrapbook</button>
                </form>
              ) : null}
            </article>

            <div className="book-nav">
              <button className="nav-btn" type="button" onClick={() => turnTo(scrapbookIndex - 1)} disabled={scrapbookIndex === 0}>Previous Page</button>
              <span>Page {scrapbookIndex + 1} / {scrapbookPages.length}</span>
              <button className="nav-btn" type="button" onClick={() => turnTo(scrapbookIndex + 1)} disabled={scrapbookIndex === scrapbookPages.length - 1}>Next Page</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell party-view">
      <div className="sky-gradient" />
      <div className="cute-wall" aria-hidden="true">
        <span className="wall-emoji e1">🦫</span>
        <span className="wall-emoji e2">🐥</span>
        <span className="wall-emoji e3">🦋</span>
        <span className="wall-emoji e4">🌷</span>
      </div>

      {butterflies.map((butterfly) => (
        <span
          key={butterfly.id}
          className="butterfly"
          style={{
            left: `${butterfly.left}%`,
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
            fontSize: `${butterfly.size}px`,
            "--drift": `${butterfly.drift}px`
          }}
        >
          🦋
        </span>
      ))}

      {capybaraHugOn ? (
        <section className="interaction-layer capybara-hug-layer" aria-hidden="true">
          <div className="capybara-hug-main">🦫</div>
          <div className="capybara-hug-arms">🤗</div>
          <div className="capybara-hug-hearts">💖 💖 💖</div>
        </section>
      ) : null}

      {duckWaddleOn ? (
        <section className="interaction-layer duck-waddle-layer" aria-hidden="true">
          <div className="duck-path">🐥</div>
          <div className="duck-spark">✨</div>
        </section>
      ) : null}

      {butterflyMagicOn ? (
        <section className="butterfly-magic" aria-hidden="true">
          {magicButterflies.map((item) => (
            <span
              key={`m-${item.id}`}
              className="magic-butterfly"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                fontSize: `${item.size}px`,
                "--dx": `${item.dx}px`,
                "--dy": `${item.dy}px`,
                "--hue": `${item.hue}deg`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`
              }}
            >
              🦋
            </span>
          ))}

          {magicGlitters.map((item) => (
            <span
              key={`g-${item.id}`}
              className="magic-glitter"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`
              }}
            />
          ))}
        </section>
      ) : null}

      {tulipBurstOn ? (
        <section className="interaction-layer tulip-burst-layer" aria-hidden="true">
          {tulipBouquets.map((item) => (
            <span
              key={`t-${item.id}`}
              className="tulip-bouquet"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                fontSize: `${item.size}px`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`
              }}
            >
              {item.icon}
            </span>
          ))}
        </section>
      ) : null}

      <section className="content-wrap">
        <div className="controls-row">
          <h1>You are the best thing that happened to me, ANDDDDDDD it's your Birthdayyyyy</h1>
          <div className="book-actions">
            <button className="sound-toggle" onClick={() => setSoundOn((prev) => !prev)} type="button">{soundOn ? "Sound: ON" : "Sound: OFF"}</button>
            <button className="reset-btn" type="button" onClick={resetAll}>Reset Website</button>
          </div>
        </div>

        <p>Sooo you can basically click on each thingy and it pops.....it seemed cool when I was developing it.</p>

        <div className="gift-grid">
          {giftSteps.map((gift) => {
            const isOpen = opened.includes(gift.id);
            return (
              <article
                key={gift.id}
                className={`gift-card ${isOpen ? "open" : ""}`}
                onClick={() => openGift(gift.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") openGift(gift.id);
                }}
              >
                <span className="gift-icon">{isOpen ? gift.icon : "🎁"}</span>
                <h2>{gift.title}</h2>
                <p>{isOpen ? gift.message : "Tap to unwrap this gift"}</p>
                {isOpen ? (
                  <div className="cute-burst" aria-hidden="true">
                    {gift.burst.map((item, index) => (
                      <span
                        key={`${gift.id}-${index}`}
                        className="burst-emoji"
                        style={{
                          "--dx": `${(index - 1.5) * 28}px`,
                          "--dy": `${-65 - (index % 2) * 18}px`,
                          "--delay": `${index * 0.05}s`
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <button className="celebrate-btn" onClick={startCelebration} disabled={!allOpened}>
          {allOpened ? "Final Surprise" : `Open ${giftSteps.length - opened.length} more gift(s)`}
        </button>
      </section>

      {celebration ? (
        <section className="celebration-layer">
          {poppers.map((popper) => (
            <span
              key={popper.id}
              className="popper"
              style={{
                left: `${popper.left}%`,
                top: `${popper.top}%`,
                animationDelay: `${popper.delay}s`,
                animationDuration: `${popper.duration}s`,
                background: popper.color
              }}
            />
          ))}

          <div className="grand-cute" aria-hidden="true">
            <span>🦫</span>
            <span>🐥</span>
            <span>🦋</span>
            <span>🌷</span>
          </div>

          <div className="wish-card">
            <h2>Happy Birthday, My cute lil wdnaidwiad!</h2>
            <p>
              This is just the beginning of our website. Next, we are building our
              virtual scrapbook of photos, places, and memories together.
            </p>
            <span>{"🎉🎂✨"}</span>
            <button className="scrapbook-btn cta-pop" type="button" onClick={() => setPage("scrapbook")}>Open Our Scrapbook</button>
          </div>
        </section>
      ) : null}
    </main>
  );
}