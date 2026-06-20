// matches.js - Edit your matches and stream links here
// Created by Mahdi
//
// === HOW TO ADD A STREAM ===
// 1. Add a new object to the MATCHES array below
// 2. Set stream.type to one of: 'hls', 'youtube', 'iframe'
// 3. Set stream.url to YOUR LEGAL stream URL
//
// stream.type examples:
//   hls:     { type: 'hls', url: 'https://your-cdn.com/live/stream.m3u8' }
//   youtube: { type: 'youtube', url: 'dQw4w9WgXcQ' }  // Just the VIDEO ID
//   iframe:  { type: 'iframe', url: 'https://your-embed-provider.com/embed/123' }
//
// IMPORTANT: Only use streams you own or have rights to broadcast.
//
// === YOUR PROVIDED LINKS ===
// You gave me these 3 links. They are iframe embeds.
// To use them, set type: 'iframe':
//   stream: { type: 'iframe', url: 'https://8.kooralive360.com/albaplayer/bein-sports-hd-1' }
//   stream: { type: 'iframe', url: 'https://cswc6.blogspot.com/p/match1.html' }
//   stream: { type: 'iframe', url: 'https://8.kooralive360.com/albaplayer/bein-sports-hd-1/?serv=10' }
// 
// WARNING: Make sure you have legal broadcast rights for any stream you embed.
// The default config below uses public test HLS streams so the player works out of the box.

const MATCHES = [
  {
    id: "live1",
    home: "Brazil",
    away: "Argentina",
    homeFlag: "🇧🇷",
    awayFlag: "🇦🇷",
    time: "2026-06-20T23:00:00+06:00", // Bangladesh Time (UTC+6)
    status: "live",
    competition: "FIFA World Cup",
    stream: {
      type: "hls",
      // REPLACE WITH YOUR LEGAL HLS STREAM
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    }
  },
  {
    id: "live2",
    home: "France",
    away: "Germany",
    homeFlag: "🇫🇷",
    awayFlag: "🇩🇪",
    time: "2026-06-21T01:00:00+06:00",
    status: "live",
    competition: "FIFA World Cup",
    stream: {
      type: "hls",
      // REPLACE WITH YOUR LEGAL HLS STREAM
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    }
  },
  {
    id: "up1",
    home: "Spain",
    away: "Portugal",
    homeFlag: "🇪🇸",
    awayFlag: "🇵🇹",
    time: "2026-06-22T00:00:00+06:00",
    status: "upcoming",
    competition: "FIFA World Cup",
    stream: {
      type: "hls",
      url: ""
    }
  },
  {
    id: "up2",
    home: "England",
    away: "Italy",
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    awayFlag: "🇮🇹",
    time: "2026-06-22T03:00:00+06:00",
    status: "upcoming",
    competition: "FIFA World Cup",
    stream: {
      type: "hls",
      url: ""
    }
  },
  {
    id: "up3",
    home: "Japan",
    away: "South Korea",
    homeFlag: "🇯🇵",
    awayFlag: "🇰🇷",
    time: "2026-06-23T21:00:00+06:00",
    status: "upcoming",
    competition: "FIFA World Cup",
    stream: {
      type: "hls",
      url: ""
    }
  }
];

// Helper: get match by id from URL
function getMatchById(id) {
  return MATCHES.find(m => m.id === id);
}
