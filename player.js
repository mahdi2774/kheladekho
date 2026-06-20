// player.js - Universal stream loader
// Created by Mahdi

const params = new URLSearchParams(location.search);
const matchId = params.get('id') || (MATCHES[0] && MATCHES[0].id);
const match = getMatchById(matchId) || MATCHES[0];

if (match) {
  document.getElementById('match-title').textContent = `${match.homeFlag} ${match.home} vs ${match.away} ${match.awayFlag}`;
  document.getElementById('match-sub').textContent =
    new Date(match.time).toLocaleString('en-GB', {timeZone:'Asia/Dhaka', dateStyle:'medium', timeStyle:'short'}) + ' BST • ' + match.competition;
  document.title = `${match.home} vs ${match.away} - WC LIVE`;
}

const videoEl = document.getElementById('video-player');
const iframeWrap = document.getElementById('iframe-wrap');
const noStreamEl = document.getElementById('no-stream');

function loadPlayer(m) {
  if (!m || !m.stream || !m.stream.url) {
    noStreamEl.style.display = 'flex';
    return;
  }
  const { type, url } = m.stream;

  if (type === 'iframe') {
    videoEl.style.display = 'none';
    iframeWrap.style.display = 'block';
    iframeWrap.innerHTML = `<iframe src="${url}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>`;
    return;
  }

  if (type === 'youtube') {
    // YouTube embed - youtube-nocookie for privacy
    videoEl.style.display = 'none';
    iframeWrap.style.display = 'block';
    iframeWrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${url}?autoplay=1&modestbranding=1&rel=0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    return;
  }

  // HLS .m3u8
  if (type === 'hls') {
    iframeWrap.style.display = 'none';
    videoEl.style.display = 'block';

    const plyrOptions = {
      controls: ['play-large','play','progress','current-time','mute','volume','settings','pip','airplay','fullscreen'],
      settings: ['quality','speed'],
      speed: { selected: 1, options: [0.75,1,1.25,1.5] },
      ratio: '16:9',
      fullscreen: { enabled: true, iosNative: true }
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        lowLatencyMode: true,
        backBufferLength: 30,
        enableWorker: true
      });
      hls.loadSource(url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map((l) => l.height).filter(Boolean);
        const player = new Plyr(videoEl, {
          ...plyrOptions,
          quality: {
            default: availableQualities[availableQualities.length-1] || 720,
            options: availableQualities,
            forced: true,
            onChange: (q) => {
              hls.levels.forEach((level, i) => {
                if (level.height === q) hls.currentLevel = i;
              });
            }
          }
        });
        // Auto play (muted autoplay often required on mobile)
        videoEl.muted = false;
        player.play().catch(()=>{});
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR: hls.startLoad(); break;
            case Hls.ErrorTypes.MEDIA_ERROR: hls.recoverMediaError(); break;
            default: hls.destroy(); break;
          }
        }
      });
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      videoEl.src = url;
      new Plyr(videoEl, plyrOptions);
    } else {
      noStreamEl.style.display = 'flex';
      noStreamEl.textContent = 'HLS is not supported in this browser.';
    }
    return;
  }

  noStreamEl.style.display = 'flex';
}

loadPlayer(match);

// Sidebar live list
const liveList = document.getElementById('live-list');
const liveMatches = MATCHES.filter(m => m.status === 'live');
liveList.innerHTML = liveMatches.map(m => `
  <a class="side-match" href="watch.html?id=${m.id}">
    <span class="sm-teams">${m.homeFlag} ${m.home} - ${m.away} ${m.awayFlag}</span>
    <span class="sm-live">LIVE</span>
  </a>
`).join('') || '<span style="color:#8b9a8b;font-size:13px">No other live matches</span>';
