# WC LIVE – FIFA World Cup Streaming

Simple, clean, fast live sports streaming website.
Created by Mahdi

Pure HTML/CSS/JS. No framework. Works 100% on GitHub Pages.

Live demo: open `index.html`

---

### Files
```
index.html      - Homepage / Live matches
watch.html      - Watch player page
schedule.html   - Match schedule - Bangladesh Time
style.css       - Dark black + green theme
player.js       - HLS.js + Plyr.js player
matches.js      - ALL YOUR MATCHES & STREAM LINKS HERE
README.md       - This file
```

### How to change stream links

All matches are in **`matches.js`**.

Edit the `MATCHES` array:

```js
{
  id: "live1",
  home: "Brazil",
  away: "Argentina",
  homeFlag: "🇧🇷",
  awayFlag: "🇦🇷",
  time: "2026-06-20T23:00:00+06:00", // Bangladesh Time
  status: "live", // 'live' or 'upcoming'
  competition: "FIFA World Cup",
  stream: {
    type: "hls",     // 'hls' | 'youtube' | 'iframe'
    url: "https://your-stream.m3u8"
  }
}
```

**3 Stream types supported:**

1. **HLS / m3u8**
```js
stream: { type: 'hls', url: 'https://your-cdn.com/live/stream.m3u8' }
```
Smooth playback with HLS.js, auto quality.

2. **YouTube Live**
```js
stream: { type: 'youtube', url: 'dQw4w9WgXcQ' }
```
Just the Video ID, not the full URL.

3. **Iframe Embed**
```js
stream: { type: 'iframe', url: 'https://your-embed.com/player' }
```
For any embeddable player.

---
### Using the links you provided

You gave me these 3 links:
- https://8.kooralive360.com/albaplayer/bein-sports-hd-1
- https://cswc6.blogspot.com/p/match1.html
- https://8.kooralive360.com/albaplayer/bein-sports-hd-1/?serv=10

To use them, in `matches.js` set:
```js
stream: { type: 'iframe', url: 'https://8.kooralive360.com/albaplayer/bein-sports-hd-1' }
```
Do this for any match you want. Just change `type` to `iframe` and paste the URL.

**IMPORTANT: Only use streams you own or have legal broadcast rights to. I ship the site with public test HLS streams so it works out of the box.**

---
### Features

- Dark black + green theme
- Mobile responsive, fast
- HLS.js for no-buffer playback
- Plyr.js for beautiful UI
- Auto quality selection
- Fullscreen button
- Bangladesh Time (BST / UTC+6) everywhere
- Click match → watch instantly

### Deploy to GitHub Pages

1. Create a new GitHub repo, e.g. `wc-live`
2. Upload all 7 files to the root
3. Repo Settings → Pages → Deploy from branch → `main` / `/root`
4. Done. Your site will be live at `https://yourusername.github.io/wc-live/`

No build step. No server. 100% static.

---
**Created by Mahdi**
