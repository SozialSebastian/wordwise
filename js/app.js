/* Wordwise – Englisch lernen. Daten bleiben lokal auf dem Gerät (localStorage). */
'use strict';

/* =========================================================
   Helpers
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const DAY = 86400000;
const startOfDay = (t = Date.now()) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
const endOfToday = () => startOfDay() + DAY - 1;
const dayKey = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ICON = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  vocab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/><path d="M7 10h5M7 14h5"/></svg>',
  grammar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V6a2 2 0 0 1 2-2h12v15H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h12"/><path d="M9 8h5M9 11h5"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

/* =========================================================
   Speicher
   ========================================================= */
const KEY = 'wordwise-v1';
const DEFAULT_SETTINGS = { accent: 'en-GB', len: 12, levels: ['B1', 'B2', 'C1'], email: '' };
let S = load();

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && Array.isArray(d.vocab)) {
      d.settings = { ...DEFAULT_SETTINGS, ...(d.settings || {}) };
      d.gram = d.gram || {};
      d.log = d.log || {};
      return d;
    }
  } catch (e) { /* ignore */ }
  return { vocab: [], gram: {}, log: {}, settings: { ...DEFAULT_SETTINGS }, starterAdded: false };
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('Speichern fehlgeschlagen – Speicher voll?'); }
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

function newVocab(f) {
  return {
    id: uid(), en: f.en.trim(), de: (f.de || '').trim(), pos: f.pos || '', def: f.def || '', ex: f.ex || '',
    phon: f.phon || '', audio: f.audio || '', syn: f.syn || [],
    box: 0, due: 0, seen: 0, c: 0, w: 0, created: Date.now()
  };
}

/* Spaced Repetition (Leitner-System mit Tagesintervallen) */
const INTERVALS = [0, 1, 2, 4, 8, 16, 35, 75];
function gradeVocab(v, ok) {
  v.seen++;
  if (ok) { v.c++; v.box = Math.min(7, v.box + 1); v.due = startOfDay() + INTERVALS[v.box] * DAY; }
  else { v.w++; v.box = Math.max(1, Math.floor(v.box / 2)); v.due = Date.now(); }
}
const dueVocab = () => S.vocab.filter((v) => v.seen > 0 && v.due <= endOfToday()).sort((a, b) => a.due - b.due);
const newVocabList = () => S.vocab.filter((v) => !v.seen).sort((a, b) => a.created - b.created);

function gramRec(topicId) { return (S.gram[topicId] = S.gram[topicId] || { r: {}, last: 0 }); }
function gradeGrammar(topicId, idx, ok) {
  const g = gramRec(topicId);
  const r = g.r[idx] || { c: 0, w: 0, last: null };
  ok ? r.c++ : r.w++;
  r.last = ok ? 1 : 0;
  g.r[idx] = r; g.last = Date.now();
}
function mastery(topic) {
  const g = S.gram[topic.id];
  if (!g) return { pct: 0, ok: 0, done: 0 };
  const ok = topic.items.filter((_, i) => g.r[i] && g.r[i].last === 1).length;
  const done = topic.items.filter((_, i) => g.r[i]).length;
  return { pct: Math.round((ok / topic.items.length) * 100), ok, done };
}
function logAnswer(ok) {
  const k = dayKey();
  const l = S.log[k] || { n: 0, c: 0 };
  l.n++; if (ok) l.c++;
  S.log[k] = l;
}

/* =========================================================
   Antworten prüfen
   ========================================================= */
function norm(s) {
  return String(s).toLowerCase()
    .replace(/[’‘`´]/g, "'").replace(/[“”„"«»]/g, '')
    .replace(/[.,!?;:()]/g, ' ').replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ').trim();
}
function expand(s) {
  return (' ' + s + ' ')
    .replace(/\bwon't\b/g, 'will not').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not')
    .replace(/\bshan't\b/g, 'shall not').replace(/n't\b/g, ' not')
    .replace(/'ll\b/g, ' will').replace(/'ve\b/g, ' have').replace(/'re\b/g, ' are').replace(/\bi'm\b/g, 'i am')
    .replace(/\s+/g, ' ').trim();
}
function variants(s) {
  const e = expand(norm(s));
  const out = new Set([e]);
  const sub = (str, re, rep) => str.replace(re, rep).replace(/\s+/g, ' ').trim();
  if (/'d\b/.test(e)) { out.add(sub(e, /'d\b/g, ' would')); out.add(sub(e, /'d\b/g, ' had')); }
  if (/\b(it|he|she|that|there|what|who|where)'s\b/.test(e)) {
    out.add(sub(e, /\b(it|he|she|that|there|what|who|where)'s\b/g, '$1 is'));
    out.add(sub(e, /\b(it|he|she|that|there|what|who|where)'s\b/g, '$1 has'));
  }
  return [...out];
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
/* Ergebnis: 'ok' | 'typo' | false */
function checkAnswer(input, answers, { tol = 0, stripTo = false } = {}) {
  const prep = (s) => variants(s).map((x) => (stripTo ? x.replace(/^to /, '') : x));
  const iv = prep(input);
  if (!iv[0]) return false;
  let best = Infinity;
  for (const a of answers) {
    const av = prep(a);
    if (iv.some((x) => av.includes(x))) return 'ok';
    for (const x of iv) for (const y of av) best = Math.min(best, lev(x, y));
  }
  return tol && best <= tol ? 'typo' : false;
}
const altList = (s) => String(s).split(/[,;/]/).map((x) => x.trim()).filter(Boolean);

/* Wortform eines Eintrags im Beispielsatz finden (für Lückentexte) */
function findForm(word, sentence) {
  if (!word || !sentence) return null;
  const toks = word.toLowerCase().replace(/^to\s+/, '').split(/\s+/).filter(Boolean);
  const BE = "(?:am|is|are|was|were|be|been|being|'m|'s|'re)";
  const parts = toks.map((t) => {
    if (t === 'be') return '\\b' + BE + '\\b';
    if (t === "one's" || t === 'your' || t === 'sb' || t === 'sth') return "\\b[\\w']+";
    let stem = t.replace(/[^a-z'-]/g, '');
    if (stem.length > 3) stem = stem.replace(/(e|y)$/, '');
    return '\\b' + escRe(stem) + "[\\w'-]*";
  });
  const m = sentence.match(new RegExp(parts.join('\\s+'), 'i'));
  return m ? { text: m[0], index: m.index } : null;
}

/* =========================================================
   Aussprache
   ========================================================= */
let voicesCache = [];
function loadVoices() { if ('speechSynthesis' in window) voicesCache = speechSynthesis.getVoices(); }
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(text, rate = 0.95) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const lang = S.settings.accent;
  u.lang = lang;
  const vs = voicesCache.length ? voicesCache : speechSynthesis.getVoices();
  const v = vs.find((x) => x.lang.replace('_', '-') === lang && /premium|enhanced|natural/i.test(x.name))
    || vs.find((x) => x.lang.replace('_', '-') === lang)
    || vs.find((x) => x.lang.startsWith('en'));
  if (v) u.voice = v;
  u.rate = rate;
  speechSynthesis.speak(u);
}
function playWord(v, rate) {
  if (v.audio && navigator.onLine && !rate) {
    const a = new Audio(v.audio);
    a.play().catch(() => speak(v.en));
  } else speak(v.en.replace(/^to /, ''), rate || 0.9);
}

/* =========================================================
   Automatische Wortsuche
   ========================================================= */
async function fetchJSON(url, ms = 9000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) return { _status: r.status };
    return await r.json();
  } catch (e) { return null; }
  finally { clearTimeout(t); }
}

async function lookupDictionary(word) {
  const key = word.trim().replace(/^to\s+/i, '').toLowerCase();
  const data = await fetchJSON(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
  if (!Array.isArray(data)) return { found: false, offline: data === null };
  let phon = '', audios = [];
  const senses = [], syn = new Set();
  for (const entry of data) {
    if (!phon && entry.phonetic) phon = entry.phonetic;
    for (const p of entry.phonetics || []) {
      if (!phon && p.text) phon = p.text;
      if (p.audio) audios.push(p.audio.startsWith('//') ? 'https:' + p.audio : p.audio);
    }
    for (const m of entry.meanings || []) {
      (m.synonyms || []).forEach((s) => syn.add(s));
      for (const d of m.definitions || []) {
        (d.synonyms || []).forEach((s) => syn.add(s));
        if (senses.length < 8) senses.push({ pos: m.partOfSpeech || '', def: d.definition || '', ex: d.example || '' });
      }
    }
  }
  const gb = /-uk\.mp3|_gb_|-gb\.mp3/i, us = /-us\.mp3|_us_/i;
  const pref = S.settings.accent === 'en-US' ? us : gb;
  const audio = audios.find((a) => pref.test(a)) || audios[0] || '';
  // Bedeutungen mit Beispielsatz nach vorne
  senses.sort((a, b) => (b.ex ? 1 : 0) - (a.ex ? 1 : 0));
  return { found: true, phon, audio, senses: senses.slice(0, 5), syn: [...syn].filter((s) => s.toLowerCase() !== key).slice(0, 8) };
}

async function translate(text, from, to) {
  let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  if (S.settings.email) url += `&de=${encodeURIComponent(S.settings.email)}`;
  const r = await fetchJSON(url);
  if (!r || !r.responseData) return { list: [], offline: r === null };
  const raw = [r.responseData.translatedText, ...((r.matches || []).sort((a, b) => (Number(b.quality) || 0) - (Number(a.quality) || 0)).map((m) => m.translation))];
  const seen = new Set(), list = [];
  for (let t of raw) {
    if (!t || /MYMEMORY|QUERY LENGTH|INVALID/i.test(t)) continue;
    t = String(t).replace(/<[^>]+>/g, '').trim().replace(/[.!]+$/, '');
    const k = t.toLowerCase();
    if (!t || k === text.toLowerCase() || t.length > 60 || seen.has(k)) continue;
    seen.add(k); list.push(t);
    if (list.length >= 6) break;
  }
  const limited = /MYMEMORY WARNING/i.test(r.responseData.translatedText || '') || r.responseStatus === 429;
  return { list, limited };
}

/* Sucht Übersetzung, Bedeutungen, Aussprache. Gibt Felder zurück. */
async function lookupWord({ en, de }) {
  const res = { en: en || '', deCands: [], dict: null, notes: [] };
  if (!res.en && de) {
    const t = await translate(de, 'de', 'en');
    if (t.offline) { res.notes.push('offline'); return res; }
    res.enCands = t.list;
    res.en = (t.list[0] || '').toLowerCase().replace(/^to /, '');
    if (!res.en) return res;
  }
  const [dict, tr] = await Promise.all([lookupDictionary(res.en), translate(res.en.replace(/^to /, ''), 'en', 'de')]);
  res.dict = dict;
  res.deCands = tr.list;
  if (tr.limited) res.notes.push('limit');
  if (dict.offline && tr.offline) res.notes.push('offline');
  return res;
}

/* =========================================================
   UI-Grundgerüst
   ========================================================= */
const UI = { tab: 'home', topic: null, filter: 'all', query: '' };
const app = $('#app');

function toast(msg, ms = 2400) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), ms);
}

function renderTabbar() {
  const tabs = [['home', 'Heute'], ['vocab', 'Vokabeln'], ['grammar', 'Grammatik'], ['settings', 'Mehr']];
  $('#tabbar').innerHTML = `<div class="inner">${tabs.map(([k, l]) =>
    `<button class="tab ${UI.tab === k ? 'active' : ''}" data-tab="${k}" aria-label="${l}">${ICON[k]}<span>${l}</span></button>`).join('')}</div>`;
  $$('#tabbar .tab').forEach((b) => b.onclick = () => { UI.tab = b.dataset.tab; UI.topic = null; render(); window.scrollTo(0, 0); });
}

function render() {
  renderTabbar();
  if (UI.tab === 'home') renderHome();
  else if (UI.tab === 'vocab') renderVocab();
  else if (UI.tab === 'grammar') UI.topic ? renderTopic(UI.topic) : renderGrammar();
  else renderSettings();
}

/* ---------- Heute ---------- */
function renderHome() {
  const due = dueVocab(), fresh = newVocabList();
  const today = S.log[dayKey()] || { n: 0, c: 0 };
  const secure = S.vocab.filter((v) => v.box >= 4).length;
  const next = S.vocab.filter((v) => v.seen).map((v) => v.due).sort((a, b) => a - b)[0];
  const weak = GRAMMAR.filter((t) => S.gram[t.id] && mastery(t).pct < 70 && S.settings.levels.includes(t.level));
  const date = new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

  app.innerHTML = `<div class="screen">
    <p class="sub" style="margin:0">${esc(date)}</p>
    <h1>Englisch</h1>
    <div class="card hero" style="margin-top:16px">
      <div class="row">
        <div class="grow">
          <div class="big-number">${due.length}</div>
          <p>${due.length === 1 ? 'Vokabel' : 'Vokabeln'} zur Wiederholung fällig</p>
        </div>
      </div>
      ${due.length
        ? `<button class="btn block" style="margin-top:16px" id="go-review">Wiederholen</button>`
        : `<p class="tiny" style="margin-top:12px">${S.vocab.length ? (next ? 'Nächste Wiederholung: ' + new Date(next).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'short' }) : 'Lerne zuerst ein paar neue Wörter.') : 'Noch keine Vokabeln angelegt.'}</p>`}
    </div>

    <button class="list-btn" id="go-new" ${fresh.length ? '' : 'disabled style="opacity:.5"'}>
      <div class="grow"><div class="t">Neue Wörter lernen</div><div class="d">${fresh.length ? `${Math.min(5, fresh.length)} von ${fresh.length} neuen Wörtern einführen` : 'Keine neuen Wörter – lege welche an'}</div></div>${ICON.chev}</button>
    <button class="list-btn" id="go-mixed">
      <div class="grow"><div class="t">Gemischte Lektion</div><div class="d">Vokabeln und Grammatik, ${S.settings.len} Aufgaben</div></div>${ICON.chev}</button>
    <button class="list-btn" id="go-gram">
      <div class="grow"><div class="t">Grammatik-Training</div><div class="d">Aufgaben aus allen Themen (${S.settings.levels.join(', ')})</div></div>${ICON.chev}</button>

    <h2 class="section">Überblick</h2>
    <div class="stats">
      <div class="stat"><b>${S.vocab.length}</b><span>Vokabeln</span></div>
      <div class="stat"><b>${secure}</b><span>sicher gelernt</span></div>
      <div class="stat"><b>${today.n ? Math.round((today.c / today.n) * 100) + '%' : '–'}</b><span>${today.n} Antworten heute</span></div>
    </div>
    ${weak.length ? `<h2 class="section">Grammatik wiederholen</h2>${weak.slice(0, 4).map((t) => `
      <button class="list-btn" data-topic="${t.id}"><div class="grow"><div class="t">${esc(t.title)}</div>
      <div class="meter"><i style="width:${mastery(t).pct}%"></i></div></div>${ICON.chev}</button>`).join('')}` : ''}
    ${!S.vocab.length ? `<div class="card" style="margin-top:16px"><h3>Los geht's</h3><p>Lege eigene Vokabeln an – Übersetzung, Bedeutung und Aussprache werden automatisch gesucht. Oder starte mit dem Startpaket (${STARTER.length} nützliche Wörter B2/C1).</p>
      <div class="btn-row"><button class="btn secondary" id="add-starter">Startpaket laden</button><button class="btn" id="add-first">Vokabel anlegen</button></div></div>` : ''}
  </div>`;

  const r = $('#go-review'); if (r) r.onclick = () => startLesson('review');
  $('#go-new').onclick = () => fresh.length && startLesson('new');
  $('#go-mixed').onclick = () => startLesson('mixed');
  $('#go-gram').onclick = () => startLesson('grammar');
  $$('[data-topic]').forEach((b) => b.onclick = () => { UI.tab = 'grammar'; UI.topic = b.dataset.topic; render(); });
  const st = $('#add-starter'); if (st) st.onclick = () => { addStarter(); render(); };
  const af = $('#add-first'); if (af) af.onclick = () => openVocabSheet();
}

function addStarter() {
  const have = new Set(S.vocab.map((v) => v.en.toLowerCase()));
  let n = 0;
  for (const [en, de, pos, ex] of STARTER) {
    if (have.has(en.toLowerCase())) continue;
    S.vocab.push(newVocab({ en, de, pos, ex })); n++;
  }
  S.starterAdded = true; save();
  toast(`${n} Wörter hinzugefügt`);
}

/* ---------- Vokabeln ---------- */
function boxDots(v) { return `<span class="boxdots" title="Stufe ${v.box}/7">${[1, 2, 3, 4, 5, 6, 7].map((i) => `<i class="${v.box >= i ? 'on' : ''}"></i>`).join('')}</span>`; }

function renderVocab() {
  const q = UI.query.toLowerCase();
  const endT = endOfToday();
  let list = S.vocab.filter((v) => !q || v.en.toLowerCase().includes(q) || v.de.toLowerCase().includes(q));
  if (UI.filter === 'due') list = list.filter((v) => v.seen && v.due <= endT);
  if (UI.filter === 'new') list = list.filter((v) => !v.seen);
  if (UI.filter === 'safe') list = list.filter((v) => v.box >= 4);
  list.sort((a, b) => a.en.localeCompare(b.en, 'en'));

  app.innerHTML = `<div class="screen">
    <h1>Vokabeln</h1>
    <p class="sub">${S.vocab.length} Einträge · ${dueVocab().length} fällig · ${newVocabList().length} neu</p>
    <div class="btn-row" style="margin:0 0 16px">
      <button class="btn" id="v-add">+ Neue Vokabel</button>
      <button class="btn secondary" id="v-batch">Liste einfügen</button>
    </div>
    <input class="input search" id="v-search" type="search" placeholder="Suchen …" value="${esc(UI.query)}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    <div class="seg" style="margin-bottom:14px">
      ${[['all', 'Alle'], ['due', 'Fällig'], ['new', 'Neu'], ['safe', 'Sicher']].map(([k, l]) => `<button data-f="${k}" class="${UI.filter === k ? 'on' : ''}">${l}</button>`).join('')}
    </div>
    ${list.length ? `<div class="vlist">${list.map((v) => `
      <button class="vrow" data-id="${v.id}">
        <div class="grow" style="min-width:0"><div class="en">${esc(v.en)}</div><div class="de">${esc(v.de || '—')}</div></div>
        ${!v.seen ? '<span class="badge">neu</span>' : (v.due <= endT ? '<span class="due">fällig</span>' : boxDots(v))}
      </button>`).join('')}</div>`
      : `<div class="empty">${S.vocab.length ? 'Keine Treffer.' : 'Noch keine Vokabeln.'}</div>`}
    ${!S.starterAdded ? `<button class="btn ghost" id="v-starter" style="margin-top:12px">Startpaket hinzufügen (${STARTER.length} Wörter B2/C1)</button>` : ''}
  </div>`;

  $('#v-add').onclick = () => openVocabSheet();
  $('#v-batch').onclick = openBatchSheet;
  const s = $('#v-search');
  s.oninput = () => { UI.query = s.value; const pos = s.selectionStart; renderVocab(); const n = $('#v-search'); n.focus(); n.setSelectionRange(pos, pos); };
  $$('[data-f]').forEach((b) => b.onclick = () => { UI.filter = b.dataset.f; renderVocab(); });
  $$('.vrow').forEach((b) => b.onclick = () => openVocabSheet(S.vocab.find((v) => v.id === b.dataset.id)));
  const st = $('#v-starter'); if (st) st.onclick = () => { addStarter(); renderVocab(); };
}

function sheet(html) {
  const bd = document.createElement('div');
  bd.className = 'sheet-backdrop';
  bd.innerHTML = `<div class="sheet" role="dialog"><div class="grab"></div>${html}</div>`;
  document.body.appendChild(bd);
  const close = () => { bd.remove(); };
  bd.addEventListener('click', (e) => { if (e.target === bd) close(); });
  return { el: $('.sheet', bd), close };
}

function openVocabSheet(v) {
  const isEdit = !!v;
  const f = v ? { ...v, syn: [...(v.syn || [])] } : { en: '', de: '', pos: '', def: '', ex: '', phon: '', audio: '', syn: [] };
  let senses = [], deCands = [], lastLookup = '';
  const { el, close } = sheet(`
    <div class="sheet-head"><h2>${isEdit ? 'Vokabel' : 'Neue Vokabel'}</h2><button class="btn ghost" id="f-cancel">Abbrechen</button></div>
    <div class="field"><label>Englisch</label>
      <div class="row"><input class="input grow" id="f-en" value="${esc(f.en)}" placeholder="z. B. reluctant, carry out" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <button class="speak" id="f-play" aria-label="Anhören">${ICON.speaker}</button></div>
    </div>
    <div class="field"><label>Deutsch</label><input class="input" id="f-de" value="${esc(f.de)}" placeholder="Übersetzung(en), mit Komma getrennt" autocomplete="off"></div>
    <button class="btn secondary block" id="f-lookup">Automatisch suchen</button>
    <div class="lookup-status" id="f-status">${isEdit ? '' : 'Englisch oder Deutsch eingeben – der Rest wird gesucht.'}</div>
    <div id="f-cands"></div>
    <div id="f-senses"></div>
    <div class="field"><label>Beispielsatz <span class="tiny">(für Lückentexte – sollte das Wort enthalten)</span></label><textarea class="input" id="f-ex" rows="2">${esc(f.ex)}</textarea></div>
    <div class="field"><label>Definition (englisch)</label><textarea class="input" id="f-def" rows="2">${esc(f.def)}</textarea></div>
    <div class="row" style="gap:10px">
      <div class="field grow"><label>Wortart</label>
        <select class="input" id="f-pos">${['', 'noun', 'verb', 'adjective', 'adverb', 'phrase', 'preposition', 'conjunction'].map((p) => `<option value="${p}" ${f.pos === p ? 'selected' : ''}>${p || '–'}</option>`).join('')}</select></div>
      <div class="field grow"><label>Lautschrift</label><input class="input" id="f-phon" value="${esc(f.phon)}" placeholder="/…/"></div>
    </div>
    <div id="f-syn"></div>
    ${isEdit ? `<p class="tiny">Stufe ${v.box}/7 · ${v.c} richtig · ${v.w} falsch${v.seen ? ' · nächste Wiederholung ' + new Date(v.due).toLocaleDateString('de-DE') : ''}</p>` : ''}
    <div class="btn-row">
      ${isEdit ? '<button class="btn danger" id="f-del">Löschen</button>' : ''}
      <button class="btn" id="f-save">Speichern</button>
    </div>`);

  const en = $('#f-en', el), de = $('#f-de', el), ex = $('#f-ex', el), def = $('#f-def', el), pos = $('#f-pos', el), phon = $('#f-phon', el);
  const status = (t) => { $('#f-status', el).textContent = t; };

  function drawCands() {
    const cur = altList(de.value).map((x) => x.toLowerCase());
    $('#f-cands', el).innerHTML = deCands.length ? `<div class="field"><label>Übersetzungsvorschläge – antippen zum Übernehmen</label><div class="chips">${deCands.map((c, i) =>
      `<button class="chip ${cur.includes(c.toLowerCase()) ? 'on' : ''}" data-c="${i}">${esc(c)}</button>`).join('')}</div></div>` : '';
    $$('[data-c]', el).forEach((b) => b.onclick = () => {
      const c = deCands[+b.dataset.c];
      let arr = altList(de.value);
      const i = arr.findIndex((x) => x.toLowerCase() === c.toLowerCase());
      i >= 0 ? arr.splice(i, 1) : arr.push(c);
      de.value = arr.join(', ');
      drawCands();
    });
  }
  function drawSenses() {
    $('#f-senses', el).innerHTML = senses.length ? `<div class="field"><label>Bedeutungen – passende antippen</label>${senses.map((s, i) => `
      <button class="sense ${def.value === s.def ? 'on' : ''}" data-s="${i}"><small>${esc(s.pos)}</small><div>${esc(s.def)}</div>${s.ex ? `<div class="exs">„${esc(s.ex)}“</div>` : ''}</button>`).join('')}</div>` : '';
    $$('[data-s]', el).forEach((b) => b.onclick = () => {
      const s = senses[+b.dataset.s];
      def.value = s.def; if (s.ex) ex.value = s.ex;
      if (s.pos) pos.value = s.pos;
      drawSenses();
    });
  }
  function drawSyn() {
    $('#f-syn', el).innerHTML = f.syn.length ? `<div class="field"><label>Synonyme</label><div class="chips">${f.syn.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div></div>` : '';
  }
  drawSyn();

  async function runLookup(auto) {
    const e = en.value.trim(), d = de.value.trim();
    if (!e && !d) { status('Bitte zuerst ein Wort eingeben.'); return; }
    const sig = e + '|' + (e ? '' : d);
    if (auto && sig === lastLookup) return;
    lastLookup = sig;
    status('Suche …');
    const r = await lookupWord({ en: e, de: e ? '' : d });
    if (r.notes.includes('offline')) { status('Keine Verbindung – du kannst die Felder auch selbst ausfüllen.'); return; }
    if (!e && r.en) en.value = r.en;
    deCands = r.deCands;
    if (!de.value.trim() && deCands.length) de.value = deCands.slice(0, 2).join(', ');
    drawCands();
    const dict = r.dict;
    if (dict && dict.found) {
      senses = dict.senses;
      const first = senses[0];
      if (first && !def.value.trim()) def.value = first.def;
      if (first && !ex.value.trim()) { const withEx = senses.find((s) => s.ex); if (withEx) ex.value = withEx.ex; }
      if (first && !pos.value) pos.value = first.pos;
      if (dict.phon && !phon.value) phon.value = dict.phon;
      if (dict.audio) f.audio = dict.audio;
      f.syn = dict.syn; drawSyn();
      drawSenses();
      status(`Gefunden: ${senses.length} ${senses.length === 1 ? 'Bedeutung' : 'Bedeutungen'}${deCands.length ? `, ${deCands.length} Übersetzungen` : ''}.${r.notes.includes('limit') ? ' (Tageslimit der Übersetzung erreicht)' : ''}`);
    } else {
      senses = []; drawSenses();
      status(deCands.length ? 'Übersetzung gefunden, aber kein Wörterbucheintrag (bei Wendungen normal). Beispielsatz gern selbst ergänzen.' : 'Nichts gefunden – bitte Schreibweise prüfen.');
    }
  }

  $('#f-lookup', el).onclick = () => runLookup(false);
  en.addEventListener('blur', () => { if (!isEdit && en.value.trim() && !de.value.trim()) runLookup(true); });
  de.addEventListener('blur', () => { if (!isEdit && de.value.trim() && !en.value.trim()) runLookup(true); });
  en.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); en.blur(); } });
  $('#f-play', el).onclick = () => { const w = en.value.trim(); if (w) playWord({ en: w, audio: w === f.en ? f.audio : '' }); };
  $('#f-cancel', el).onclick = close;
  const del = $('#f-del', el);
  if (del) del.onclick = () => {
    if (!confirm(`„${v.en}“ löschen?`)) return;
    S.vocab = S.vocab.filter((x) => x.id !== v.id); save(); close(); render();
  };
  $('#f-save', el).onclick = () => {
    const word = en.value.trim();
    if (!word) { status('Das englische Wort fehlt.'); return; }
    if (!de.value.trim()) { status('Bitte eine Übersetzung eintragen oder suchen lassen.'); return; }
    const dup = S.vocab.find((x) => x.en.toLowerCase() === word.toLowerCase() && (!v || x.id !== v.id));
    if (dup && !confirm(`„${word}“ gibt es schon. Trotzdem speichern?`)) return;
    const data = { en: word, de: de.value.trim(), ex: ex.value.trim(), def: def.value.trim(), pos: pos.value, phon: phon.value.trim(), audio: word === f.en || !isEdit ? f.audio : '', syn: f.syn };
    if (isEdit) Object.assign(v, data); else S.vocab.push(newVocab(data));
    save(); close(); toast(isEdit ? 'Gespeichert' : `„${word}“ angelegt`); render();
  };
  if (!isEdit) setTimeout(() => en.focus(), 250);
}

function openBatchSheet() {
  const { el, close } = sheet(`
    <div class="sheet-head"><h2>Liste einfügen</h2><button class="btn ghost" id="b-cancel">Schließen</button></div>
    <p class="muted" style="margin-top:0">Ein Wort pro Zeile. Übersetzung optional mit „=“ oder Tab dahinter – sonst wird sie automatisch gesucht.</p>
    <textarea class="input" id="b-text" rows="8" placeholder="reluctant&#10;carry out = durchführen&#10;trade-off"></textarea>
    <button class="btn block" id="b-go" style="margin-top:12px">Hinzufügen &amp; automatisch suchen</button>
    <div class="lookup-status" id="b-status"></div>`);
  $('#b-cancel', el).onclick = () => { close(); render(); };
  $('#b-go', el).onclick = async () => {
    const lines = $('#b-text', el).value.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) return;
    $('#b-go', el).disabled = true;
    const have = new Set(S.vocab.map((v) => v.en.toLowerCase()));
    let added = 0, skipped = 0;
    for (let i = 0; i < lines.length; i++) {
      const [rawEn, rawDe] = lines[i].split(/\s*(?:=|\t|;)\s*/);
      const word = (rawEn || '').trim();
      if (!word || have.has(word.toLowerCase())) { skipped++; continue; }
      $('#b-status', el).textContent = `${i + 1}/${lines.length}: ${word} …`;
      const r = await lookupWord({ en: word });
      const d = r.dict && r.dict.found ? r.dict : null;
      const withEx = d ? d.senses.find((s) => s.ex) : null;
      const first = d ? d.senses[0] : null;
      S.vocab.push(newVocab({
        en: word, de: (rawDe || '').trim() || r.deCands.slice(0, 2).join(', '),
        def: first ? first.def : '', ex: withEx ? withEx.ex : '', pos: first ? first.pos : '',
        phon: d ? d.phon : '', audio: d ? d.audio : '', syn: d ? d.syn : []
      }));
      have.add(word.toLowerCase()); added++; save();
      await new Promise((res) => setTimeout(res, 350));
    }
    const missing = S.vocab.slice(-added).filter((v) => !v.de).length;
    $('#b-status', el).textContent = `${added} hinzugefügt${skipped ? `, ${skipped} übersprungen (doppelt/leer)` : ''}.${missing ? ` ${missing} ohne Übersetzung – bitte nachtragen.` : ''}`;
    $('#b-go', el).disabled = false;
    $('#b-text', el).value = '';
  };
}

/* ---------- Grammatik ---------- */
function renderGrammar() {
  const levels = ['B1', 'B2', 'C1'];
  app.innerHTML = `<div class="screen">
    <h1>Grammatik</h1>
    <p class="sub">${GRAMMAR.length} Themen mit Erklärung und Übungen</p>
    ${levels.map((l) => {
      const ts = GRAMMAR.filter((t) => t.level === l);
      return `<h2 class="section">${l === 'B1' ? 'B1 – Mittelstufe' : l === 'B2' ? 'B2 – Obere Mittelstufe' : 'C1 – Fortgeschritten'}</h2>
      ${ts.map((t) => { const m = mastery(t); return `
        <button class="list-btn" data-topic="${t.id}"><div class="grow">
          <div class="t">${esc(t.title)}</div>
          <div class="d">${m.done ? `${m.ok}/${t.items.length} zuletzt richtig` : `${t.items.length} Aufgaben`}</div>
          ${m.done ? `<div class="meter"><i style="width:${m.pct}%"></i></div>` : ''}
        </div>${ICON.chev}</button>`; }).join('')}`;
    }).join('')}
  </div>`;
  $$('[data-topic]').forEach((b) => b.onclick = () => { UI.topic = b.dataset.topic; render(); window.scrollTo(0, 0); });
}

function renderTopic(id) {
  const t = GRAMMAR.find((x) => x.id === id);
  if (!t) { UI.topic = null; return render(); }
  const m = mastery(t);
  app.innerHTML = `<div class="screen">
    <button class="btn ghost" id="t-back" style="padding-left:0">${ICON.back} Grammatik</button>
    <h1 style="margin-top:4px">${esc(t.title)}</h1>
    <p class="sub"><span class="badge ${t.level}">${t.level}</span> &nbsp;${m.done ? `${m.ok} von ${t.items.length} zuletzt richtig` : `${t.items.length} Aufgaben`}</p>
    <div class="explain">${t.explain}</div>
    <button class="btn block" id="t-go" style="margin-top:16px">Üben</button>
  </div>`;
  $('#t-back').onclick = () => { UI.topic = null; render(); };
  $('#t-go').onclick = () => startLesson('topic', id);
}

/* ---------- Einstellungen ---------- */
function renderSettings() {
  const st = S.settings;
  const bytes = new Blob([localStorage.getItem(KEY) || '']).size;
  app.innerHTML = `<div class="screen">
    <h1>Einstellungen</h1>
    <h2 class="section">Lernen</h2>
    <div class="card">
      <div class="field"><label>Aussprache</label>
        <div class="seg">${[['en-GB', 'Britisch'], ['en-US', 'Amerikanisch']].map(([k, l]) => `<button data-acc="${k}" class="${st.accent === k ? 'on' : ''}">${l}</button>`).join('')}</div>
        <button class="btn ghost small" id="s-test" style="margin-top:6px">${ICON.speaker} Testen</button>
      </div>
      <div class="field"><label>Aufgaben pro Lektion</label>
        <div class="seg">${[8, 12, 16, 20].map((n) => `<button data-len="${n}" class="${st.len === n ? 'on' : ''}">${n}</button>`).join('')}</div></div>
      <div class="field" style="margin:0"><label>Grammatik-Niveaus in gemischten Lektionen</label>
        <div class="chips">${['B1', 'B2', 'C1'].map((l) => `<button class="chip ${st.levels.includes(l) ? 'on' : ''}" data-lvl="${l}">${l}</button>`).join('')}</div></div>
    </div>

    <h2 class="section">Automatische Suche</h2>
    <div class="card">
      <p style="margin-bottom:10px">Bedeutungen &amp; Aussprache kommen vom Free Dictionary, Übersetzungen von MyMemory (ca. 5.000 Zeichen pro Tag frei). Mit einer E-Mail-Adresse steigt das Limit auf 50.000.</p>
      <div class="field" style="margin:0"><label>E-Mail für MyMemory (optional)</label>
        <input class="input" id="s-email" type="email" value="${esc(st.email)}" placeholder="name@beispiel.de" autocomplete="email"></div>
    </div>

    <h2 class="section">Daten</h2>
    <div class="card">
      <p style="margin-bottom:12px">Alles liegt nur auf diesem Gerät (${(bytes / 1024).toFixed(0)} KB). Exportiere ab und zu ein Backup.</p>
      <div class="btn-row" style="margin-top:0">
        <button class="btn secondary" id="s-export">Backup exportieren</button>
        <button class="btn secondary" id="s-import">Importieren</button>
      </div>
      <input type="file" id="s-file" accept="application/json,.json" class="hidden">
      ${!S.starterAdded ? `<button class="btn ghost" id="s-starter" style="margin-top:8px;padding-left:0">Startpaket hinzufügen</button>` : ''}
    </div>
    <button class="btn danger block" id="s-reset" style="margin-top:8px">Alles zurücksetzen</button>
    <p class="tiny" style="text-align:center;margin-top:24px">Wordwise · Version 1.0</p>
  </div>`;

  $$('[data-acc]').forEach((b) => b.onclick = () => { st.accent = b.dataset.acc; save(); renderSettings(); });
  $('#s-test').onclick = () => speak('The weather in Hamburg is rather unpredictable.');
  $$('[data-len]').forEach((b) => b.onclick = () => { st.len = +b.dataset.len; save(); renderSettings(); });
  $$('[data-lvl]').forEach((b) => b.onclick = () => {
    const l = b.dataset.lvl;
    st.levels = st.levels.includes(l) ? st.levels.filter((x) => x !== l) : [...st.levels, l].sort();
    if (!st.levels.length) st.levels = [l];
    save(); renderSettings();
  });
  $('#s-email').onchange = (e) => { st.email = e.target.value.trim(); save(); toast('Gespeichert'); };
  $('#s-export').onclick = exportData;
  $('#s-import').onclick = () => $('#s-file').click();
  $('#s-file').onchange = importData;
  const sst = $('#s-starter'); if (sst) sst.onclick = () => { addStarter(); renderSettings(); };
  $('#s-reset').onclick = () => {
    if (!confirm('Wirklich alle Vokabeln, Fortschritte und Einstellungen löschen?')) return;
    localStorage.removeItem(KEY); S = load(); UI.tab = 'home'; render(); toast('Zurückgesetzt');
  };
}

async function exportData() {
  const json = JSON.stringify({ app: 'wordwise', version: 1, exported: new Date().toISOString(), data: S }, null, 1);
  const name = `wordwise-backup-${dayKey()}.json`;
  const file = new File([json], name, { type: 'application/json' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'Wordwise Backup' }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const obj = JSON.parse(r.result);
      const d = obj.data || obj;
      if (!Array.isArray(d.vocab)) throw new Error('format');
      if (!confirm(`Backup mit ${d.vocab.length} Vokabeln laden? Die aktuellen Daten werden ersetzt.`)) return;
      localStorage.setItem(KEY, JSON.stringify(d)); S = load(); render(); toast('Backup geladen');
    } catch (err) { toast('Datei konnte nicht gelesen werden.'); }
  };
  r.readAsText(file);
  e.target.value = '';
}

/* =========================================================
   Lektionen
   ========================================================= */
let L = null;

function vocabKinds(v) {
  const enough = S.vocab.length >= 4;
  const form = findForm(v.en, v.ex);
  const k = [];
  if (v.box <= 1) {
    if (enough) k.push('v_mc_ende', 'v_mc_deen');
    if (enough && form) k.push('v_cloze_mc');
    if (!k.length) k.push('v_type');
  } else if (v.box <= 3) {
    k.push('v_type', 'v_listen');
    if (form) k.push('v_cloze_type', 'v_cloze_type');
    if (enough && form) k.push('v_cloze_mc');
    if (enough && v.def) k.push('v_def');
    if (enough) k.push('v_mc_deen');
  } else {
    k.push('v_type', 'v_listen');
    if (form) k.push('v_cloze_type', 'v_cloze_type');
    if (v.ex && v.ex.split(' ').length <= 14) k.push('v_dict', 'v_order');
  }
  return k;
}
const vTask = (v, kind) => ({ kind: kind || pick(vocabKinds(v)), v });
const gTask = (topic, idx) => ({ kind: 'g', topic, idx });

function grammarPool(levels) {
  const pool = [];
  for (const t of GRAMMAR) {
    if (!levels.includes(t.level)) continue;
    const g = S.gram[t.id];
    t.items.forEach((_, i) => {
      const r = g && g.r[i];
      // Gewichtung: falsch beantwortet > neu > richtig
      const w = !r ? 2 : r.last === 0 ? 4 : 1;
      pool.push({ t: t.id, i, w });
    });
  }
  return pool;
}
function weightedSample(pool, n) {
  const out = [], p = [...pool];
  while (out.length < n && p.length) {
    const total = p.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total, k = 0;
    while (r > p[k].w) { r -= p[k].w; k++; }
    out.push(p.splice(k, 1)[0]);
  }
  return out;
}
function withMatch(tasks, vs) {
  if (vs.length >= 4 && S.vocab.length >= 4) {
    const pos = Math.min(tasks.length, Math.max(2, Math.floor(tasks.length / 2)));
    tasks.splice(pos, 0, { kind: 'v_match', vs: shuffle(vs).slice(0, 5) });
  }
  return tasks;
}

function startLesson(type, arg) {
  const n = S.settings.len;
  let tasks = [];
  if (type === 'review') {
    const vs = dueVocab().slice(0, n);
    tasks = withMatch(shuffle(vs.map((v) => vTask(v))), vs);
  } else if (type === 'new') {
    const vs = newVocabList().slice(0, 5);
    const enough = S.vocab.length >= 4;
    vs.forEach((v) => { tasks.push({ kind: 'intro', v }); tasks.push(vTask(v, enough ? pick(['v_mc_ende', 'v_mc_deen']) : 'v_type')); });
    const second = shuffle(vs.map((v) => vTask(v, findForm(v.en, v.ex) && enough ? pick(['v_type', 'v_cloze_mc']) : 'v_type')));
    tasks.push(...second);
    if (vs.length >= 4) tasks.push({ kind: 'v_match', vs: shuffle(vs) });
  } else if (type === 'mixed') {
    const nv = S.vocab.length ? Math.ceil(n * 0.6) : 0;
    const due = dueVocab();
    let vs = due.slice(0, nv);
    if (vs.length < nv) {
      const rest = shuffle(S.vocab.filter((v) => v.seen && !vs.includes(v))).sort((a, b) => a.box - b.box);
      vs = vs.concat(rest.slice(0, nv - vs.length));
    }
    // neue Wörter nur mit Einführung
    if (vs.length < nv) newVocabList().slice(0, Math.min(3, nv - vs.length)).forEach((v) => { tasks.push({ kind: 'intro', v }); vs.push(v); });
    const gs = weightedSample(grammarPool(S.settings.levels), n - Math.min(vs.length, nv)).map((x) => gTask(x.t, x.i));
    const intros = tasks;
    tasks = intros.concat(shuffle([...vs.map((v) => vTask(v)), ...gs]));
  } else if (type === 'grammar') {
    tasks = weightedSample(grammarPool(S.settings.levels), n).map((x) => gTask(x.t, x.i));
  } else if (type === 'topic') {
    const t = GRAMMAR.find((x) => x.id === arg);
    tasks = shuffle(t.items.map((_, i) => gTask(t.id, i)));
  }
  if (!tasks.length) { toast('Keine passenden Aufgaben gefunden.'); return; }
  L = { type, arg, tasks, i: 0, graded: new Set(), ok: 0, answered: 0, mistakes: [] };
  document.body.style.overflow = 'hidden';
  const wrap = document.createElement('div');
  wrap.className = 'lesson'; wrap.id = 'lesson';
  wrap.innerHTML = `<div class="lesson-top"><button class="close-x" id="l-close" aria-label="Beenden">${ICON.close}</button><div class="progress"><i id="l-prog"></i></div></div>
    <div class="lesson-body" id="l-body"></div><div class="lesson-foot" id="l-foot"><div class="inner"></div></div>`;
  document.body.appendChild(wrap);
  $('#l-close').onclick = () => { if (L.answered === 0 || confirm('Lektion beenden? Bisherige Antworten bleiben gespeichert.')) endLesson(true); };
  renderTask();
}

function endLesson(quit) {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  $('#lesson') && $('#lesson').remove();
  document.body.style.overflow = '';
  L = null;
  render();
}

const body = () => $('#l-body');
const foot = () => $('#l-foot');

function setProgress() { $('#l-prog').style.width = `${Math.round((L.i / L.tasks.length) * 100)}%`; }

function footButton(label, onClick, disabled) {
  const f = foot(); f.className = 'lesson-foot';
  f.innerHTML = `<div class="inner"><button class="btn block" id="l-btn" ${disabled ? 'disabled' : ''}>${label}</button></div>`;
  $('#l-btn').onclick = onClick;
  return $('#l-btn');
}

function next() { L.i++; renderTask(); }

function renderTask() {
  setProgress();
  if (L.i >= L.tasks.length) return renderSummary();
  const task = L.tasks[L.i];
  body().scrollTop = 0;
  if (task.kind === 'intro') return renderIntro(task.v);
  if (task.kind === 'g') return renderGrammarTask(task);
  if (task.kind === 'v_match') return renderMatch(task);
  return renderVocabTask(task);
}

/* Ergebnis einer Aufgabe verbuchen und Feedback zeigen */
function finish(task, result, { solution = '', why = '', speakText = '' } = {}) {
  const ok = !!result;
  const first = !task.retry;
  if (first) {
    L.answered++; if (ok) L.ok++;
    logAnswer(ok);
    if (task.kind === 'g') gradeGrammar(task.topic, task.idx, ok);
    else if (task.v && !L.graded.has(task.v.id)) { gradeVocab(task.v, ok); L.graded.add(task.v.id); }
    if (!ok) {
      addMistake(mistakeLabel(task), task.v && task.kind !== 'v_dict' ? esc(task.v.en) : solution);
      L.tasks.push({ ...task, retry: true }); // am Ende noch einmal
    }
    save();
  }
  const f = foot();
  f.className = 'lesson-foot ' + (ok ? 'ok' : 'bad');
  const title = result === 'typo' ? 'Fast – kleiner Tippfehler' : ok ? 'Richtig' : 'Nicht ganz';
  f.innerHTML = `<div class="inner">
    <div class="fb-title">${ok ? ICON.check : ICON.x} ${title}</div>
    <div class="fb-text">${(!ok || result === 'typo') && solution ? `<div>Lösung: <span class="sol">${solution}</span></div>` : ''}${why ? `<div class="why">${why}</div>` : ''}
    ${speakText ? `<button class="speak" id="fb-speak" style="margin-top:8px">${ICON.speaker} Anhören</button>` : ''}</div>
    <button class="btn block" id="l-next">Weiter</button></div>`;
  $('#l-next').onclick = next;
  const sp = $('#fb-speak'); if (sp) sp.onclick = () => speak(speakText);
  setTimeout(() => { const b = $('#l-next'); b && b.focus(); }, 50);
}
function addMistake(q, a) {
  if (!L.mistakes.some((m) => m.q === q && m.a === a)) L.mistakes.push({ q, a });
}
function mistakeLabel(task) {
  if (task.kind === 'g') {
    const it = GRAMMAR.find((t) => t.id === task.topic).items[task.idx];
    return esc(it.q && it.t !== 'trans' ? it.q : it.s || it.de || it.q);
  }
  if (task.v) return `${esc(task.v.de)}`;
  return '';
}

/* ---------- gemeinsame Bausteine ---------- */
function renderMC({ kind, prompt, promptClass = '', hint = '', options, correct, task, solution, why, speakText, onAfter }) {
  const order = shuffle(options.map((o, i) => i));
  body().innerHTML = `<div class="kind">${kind}</div><div class="prompt ${promptClass}">${prompt}</div>${hint ? `<p class="hint">${hint}</p>` : ''}
    <div class="options">${order.map((i) => `<button class="opt" data-i="${i}">${esc(options[i])}</button>`).join('')}</div>`;
  foot().className = 'lesson-foot'; foot().innerHTML = '<div class="inner"></div>';
  $$('.opt', body()).forEach((b) => b.onclick = () => {
    const i = +b.dataset.i, ok = i === correct;
    $$('.opt', body()).forEach((x) => { x.disabled = true; if (+x.dataset.i === correct) x.classList.add('ok'); });
    if (!ok) b.classList.add('bad');
    if (onAfter) onAfter(ok);
    finish(task, ok, { solution: solution ?? esc(options[correct]), why, speakText });
  });
}

function renderTyped({ kind, prompt, promptClass = '', hint = '', answers, tol = 0, stripTo = false, multiline = false, task, solution, why, speakText, extraTop = '', placeholder = 'Antwort eingeben' }) {
  body().innerHTML = `<div class="kind">${kind}</div>${extraTop}<div class="prompt ${promptClass}">${prompt}</div>${hint ? `<p class="hint">${hint}</p>` : ''}
    ${multiline ? `<textarea class="answer-input" id="ans" placeholder="${placeholder}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>`
      : `<input class="answer-input" id="ans" placeholder="${placeholder}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done">`}`;
  const inp = $('#ans');
  const btn = footButton('Prüfen', check, true);
  inp.oninput = () => { btn.disabled = !inp.value.trim(); };
  inp.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (inp.value.trim()) check(); } };
  setTimeout(() => inp.focus(), 60);
  let done = false;
  function check() {
    if (done) return; done = true;
    inp.disabled = true; inp.blur();
    const r = checkAnswer(inp.value, answers, { tol, stripTo });
    inp.style.borderColor = r ? 'var(--ok)' : 'var(--bad)';
    finish(task, r, { solution: solution ?? esc(answers[0]), why, speakText });
  }
}

const speakBtn = (id, label = 'Anhören') => `<button class="speak" id="${id}">${ICON.speaker} ${label}</button>`;

/* ---------- Vokabel-Aufgaben ---------- */
function distractors(v, field, n = 3) {
  const val = (x) => (field === 'en' ? x.en : altList(x.de)[0] || x.de);
  const mine = val(v).toLowerCase();
  const others = shuffle(S.vocab.filter((x) => x.id !== v.id && val(x) && val(x).toLowerCase() !== mine));
  others.sort((a, b) => (b.pos === v.pos ? 1 : 0) - (a.pos === v.pos ? 1 : 0));
  const out = [];
  for (const o of others) { const t = val(o); if (!out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t); if (out.length >= n) break; }
  return out;
}

function vocabSolution(v) { return `${esc(v.en)} – ${esc(v.de)}`; }
function vocabWhy(v) { return v.ex ? `<i>„${esc(v.ex)}“</i>` : ''; }

function renderVocabTask(task) {
  const v = task.v;
  const deMain = altList(v.de)[0] || v.de;
  const sol = vocabSolution(v), why = vocabWhy(v);
  const enAnswers = altList(v.en).length ? altList(v.en) : [v.en];
  const tolFor = (s) => (s.replace(/\s/g, '').length >= 5 ? 1 : 0);

  switch (task.kind) {
    case 'v_mc_ende': {
      const opts = [deMain, ...distractors(v, 'de')];
      renderMC({ kind: 'Was bedeutet das?', prompt: `${esc(v.en)} ${speakBtn('p-speak', '')}`, options: opts, correct: 0, task, solution: sol, why, speakText: v.ex });
      $('#p-speak').onclick = () => playWord(v);
      playWord(v);
      break;
    }
    case 'v_mc_deen': {
      const opts = [v.en, ...distractors(v, 'en')];
      renderMC({ kind: 'Wie heißt das auf Englisch?', prompt: esc(v.de), options: opts, correct: 0, task, solution: sol, why, speakText: v.ex || v.en });
      break;
    }
    case 'v_type': {
      renderTyped({ kind: 'Übersetze ins Englische', prompt: esc(v.de), hint: v.pos ? esc(v.pos) : '', answers: enAnswers, tol: tolFor(v.en), stripTo: true, task, solution: sol, why, speakText: v.ex || v.en });
      break;
    }
    case 'v_cloze_mc':
    case 'v_cloze_type': {
      const f = findForm(v.en, v.ex);
      if (!f) { task.kind = 'v_type'; return renderVocabTask(task); }
      const gapped = `${esc(v.ex.slice(0, f.index))}<span class="gap-line">&nbsp;</span>${esc(v.ex.slice(f.index + f.text.length))}`;
      const solution = `${esc(f.text)} <span class="muted">(${esc(v.de)})</span>`;
      if (task.kind === 'v_cloze_mc') {
        const opts = [f.text, ...distractors(v, 'en')];
        renderMC({ kind: 'Welches Wort passt?', prompt: gapped, promptClass: 'small', hint: `Gesucht: ${esc(deMain)}`, options: opts, correct: 0, task, solution, why: '', speakText: v.ex });
      } else {
        renderTyped({ kind: 'Ergänze den Satz', prompt: gapped, promptClass: 'small', hint: `Gesucht: ${esc(deMain)} · Form anpassen`, answers: [f.text], tol: tolFor(f.text), task, solution, why: '', speakText: v.ex });
      }
      break;
    }
    case 'v_def': {
      const opts = [v.en, ...distractors(v, 'en')];
      renderMC({ kind: 'Welches Wort passt zur Definition?', prompt: `„${esc(v.def)}“`, promptClass: 'small', options: opts, correct: 0, task, solution: sol, why, speakText: v.en });
      break;
    }
    case 'v_listen': {
      renderTyped({
        kind: 'Hör zu und schreib', prompt: '', task, answers: enAnswers, tol: tolFor(v.en), stripTo: true, solution: sol, why,
        extraTop: `<button class="speak big" id="p-speak" aria-label="Abspielen">${ICON.speaker}</button><div style="text-align:center"><button class="btn ghost small" id="p-slow">Langsam</button></div>`,
        placeholder: 'Was hörst du?'
      });
      $('#p-speak').onclick = () => playWord(v);
      $('#p-slow').onclick = () => playWord(v, 0.55);
      playWord(v);
      break;
    }
    case 'v_dict': {
      renderTyped({
        kind: 'Diktat', prompt: '', hint: 'Schreib den ganzen Satz.', task, answers: [v.ex], tol: Math.max(2, Math.floor(v.ex.length / 15)), multiline: true,
        solution: esc(v.ex), why: `Wort: <b>${esc(v.en)}</b> – ${esc(v.de)}`,
        extraTop: `<button class="speak big" id="p-speak" aria-label="Abspielen">${ICON.speaker}</button><div style="text-align:center"><button class="btn ghost small" id="p-slow">Langsam</button></div>`,
        placeholder: 'Was hörst du?'
      });
      $('#p-speak').onclick = () => speak(v.ex);
      $('#p-slow').onclick = () => speak(v.ex, 0.6);
      speak(v.ex);
      break;
    }
    case 'v_order': {
      renderOrder({ kind: 'Bilde den Satz', prompt: `Mit <b>${esc(v.en)}</b> (${esc(deMain)})`, sentence: v.ex, task, why: '' });
      break;
    }
    default: task.kind = 'v_type'; renderVocabTask(task);
  }
}

function renderIntro(v) {
  body().innerHTML = `<div class="kind">Neues Wort</div><div class="intro">
    <div class="word">${esc(v.en)}</div>
    ${v.phon ? `<div class="phon">${esc(v.phon)}</div>` : ''}
    ${speakBtn('i-speak')}
    <div class="tr">${esc(v.de)}</div>
    ${v.pos ? `<span class="badge">${esc(v.pos)}</span>` : ''}
    ${v.ex ? `<div class="exs">„${esc(v.ex)}“ <button class="btn ghost small" id="i-ex">${ICON.speaker}</button></div>` : ''}
    ${v.def ? `<div class="def">${esc(v.def)}</div>` : ''}
  </div>`;
  $('#i-speak').onclick = () => playWord(v);
  const ie = $('#i-ex'); if (ie) ie.onclick = () => speak(v.ex);
  playWord(v);
  footButton('Weiter', next);
}

function renderMatch(task) {
  const vs = task.vs;
  const left = shuffle(vs), right = shuffle(vs);
  const errors = new Set();
  let selL = null, selR = null, matched = 0;
  body().innerHTML = `<div class="kind">Paare finden</div><p class="hint">Tippe jeweils ein englisches und das passende deutsche Wort an.</p>
    <div class="match"><div class="col">${left.map((v) => `<button class="opt" data-l="${v.id}">${esc(v.en)}</button>`).join('')}</div>
    <div class="col">${right.map((v) => `<button class="opt" data-r="${v.id}">${esc(altList(v.de)[0] || v.de)}</button>`).join('')}</div></div>`;
  foot().className = 'lesson-foot'; foot().innerHTML = '<div class="inner"></div>';
  const tryPair = () => {
    if (!selL || !selR) return;
    const bl = $(`[data-l="${selL}"]`), br = $(`[data-r="${selR}"]`);
    if (selL === selR) {
      [bl, br].forEach((b) => { b.classList.remove('sel'); b.classList.add('done'); b.disabled = true; });
      const v = vs.find((x) => x.id === selL);
      speak(v.en.replace(/^to /, ''));
      matched++;
    } else {
      errors.add(selL); errors.add(selR);
      [bl, br].forEach((b) => { b.classList.remove('sel'); b.classList.add('flash'); setTimeout(() => b.classList.remove('flash'), 450); });
    }
    selL = selR = null;
    if (matched === vs.length) {
      // jedes Wort einzeln bewerten
      L.answered++; const allOk = errors.size === 0; if (allOk) L.ok++;
      vs.forEach((v) => {
        const ok = !errors.has(v.id);
        logAnswer(ok);
        if (!L.graded.has(v.id)) { gradeVocab(v, ok); L.graded.add(v.id); }
        if (!ok) addMistake(esc(v.de), esc(v.en));
      });
      save();
      const f = foot(); f.className = 'lesson-foot ' + (allOk ? 'ok' : 'bad');
      f.innerHTML = `<div class="inner"><div class="fb-title">${allOk ? ICON.check + ' Alle Paare richtig' : ICON.x + ' Geschafft – mit Fehlern'}</div>
        <button class="btn block" id="l-next" style="margin-top:8px">Weiter</button></div>`;
      $('#l-next').onclick = next;
    }
  };
  $$('[data-l]').forEach((b) => b.onclick = () => { $$('[data-l]').forEach((x) => x.classList.remove('sel')); selL = b.dataset.l; b.classList.add('sel'); tryPair(); });
  $$('[data-r]').forEach((b) => b.onclick = () => { $$('[data-r]').forEach((x) => x.classList.remove('sel')); selR = b.dataset.r; b.classList.add('sel'); tryPair(); });
}

/* ---------- Satz bauen ---------- */
function renderOrder({ kind, prompt, sentence, task, why }) {
  const words = sentence.split(/\s+/).filter(Boolean);
  let order = shuffle(words.map((w, i) => i));
  for (let k = 0; k < 5 && order.every((x, i) => x === i) && words.length > 1; k++) order = shuffle(order);
  const chosen = [];
  body().innerHTML = `<div class="kind">${kind}</div><div class="prompt small">${prompt}</div>
    <div class="bank-answer" id="ans-line"></div><div class="bank" id="bank">${order.map((i) => `<button class="tok" data-i="${i}">${esc(words[i])}</button>`).join('')}</div>`;
  const btn = footButton('Prüfen', check, true);
  const draw = () => {
    $('#ans-line').innerHTML = chosen.map((i, k) => `<button class="tok" data-k="${k}">${esc(words[i])}</button>`).join('');
    $$('#bank .tok').forEach((b) => b.classList.toggle('used', chosen.includes(+b.dataset.i)));
    $$('#ans-line .tok').forEach((b) => b.onclick = () => { if (done) return; chosen.splice(+b.dataset.k, 1); draw(); });
    btn.disabled = chosen.length !== words.length;
  };
  $$('#bank .tok').forEach((b) => b.onclick = () => { if (done || chosen.includes(+b.dataset.i)) return; chosen.push(+b.dataset.i); draw(); });
  let done = false;
  function check() {
    if (done) return; done = true;
    const built = chosen.map((i) => words[i]).join(' ');
    const ok = norm(built) === norm(sentence);
    $$('#ans-line .tok').forEach((b) => b.classList.add(ok ? 'ok' : 'bad'));
    finish(task, ok, { solution: esc(sentence), why, speakText: sentence });
  }
}

/* ---------- Grammatik-Aufgaben ---------- */
function renderGrammarTask(task) {
  const topic = GRAMMAR.find((t) => t.id === task.topic);
  const it = topic.items[task.idx];
  const tag = `<span class="badge ${topic.level}">${topic.level}</span> ${esc(topic.title)}`;
  const why = it.ex ? esc(it.ex) : '';

  if (it.t === 'gap') {
    const html = esc(it.q).replace('___', '<span class="gap-line">&nbsp;</span>');
    const plain = /→|„/.test(it.q) ? '' : it.q.replace('___', it.a[0]).replace(/\s*\([^)]*\)/g, '');
    renderTyped({ kind: tag, prompt: html, promptClass: 'small', hint: 'Fülle die Lücke.', answers: it.a, task, why, speakText: plain });
  } else if (it.t === 'mc') {
    const html = esc(it.q).replace('___', '<span class="gap-line">&nbsp;</span>');
    renderMC({ kind: tag, prompt: html, promptClass: 'small', options: it.o, correct: it.a, task, why });
  } else if (it.t === 'order') {
    renderOrder({ kind: tag, prompt: esc(it.de), sentence: it.s, task, why });
  } else if (it.t === 'trans') {
    renderTyped({ kind: tag, prompt: esc(it.s), promptClass: 'small', hint: `${esc(it.q)}${it.hint ? ` <b>${esc(it.hint)}</b>` : ''}`, answers: it.a, multiline: true, task, why, speakText: it.a[0] });
  } else if (it.t === 'err') {
    renderErr(task, it, tag, why);
  }
}

function renderErr(task, it, tag, why) {
  // Satz in Wörter zerlegen, [ ] markiert den Fehler
  const toks = [];
  it.s.split(/(\[[^\]]+\])/).forEach((part) => {
    if (!part) return;
    const wrong = part.startsWith('[');
    part.replace(/[[\]]/g, '').split(/\s+/).filter(Boolean).forEach((w) => toks.push({ w, wrong }));
  });
  const wrongText = it.s.match(/\[([^\]]+)\]/)[1];
  const fixed = it.s.replace(/\[[^\]]+\]/, `<b>${esc(it.fix[0])}</b>`);
  const fixedPlain = it.s.replace(/\[[^\]]+\]/, it.fix[0]);
  body().innerHTML = `<div class="kind">${tag}</div><div class="prompt small">Finde den Fehler</div><p class="hint">Tippe auf das falsche Wort.</p>
    <div class="sentence-tokens">${toks.map((t, i) => `<button class="tok" data-i="${i}">${esc(t.w)}</button>`).join('')}</div><div id="err-step2"></div>`;
  foot().className = 'lesson-foot'; foot().innerHTML = '<div class="inner"></div>';
  let locked = false;
  $$('.sentence-tokens .tok').forEach((b) => b.onclick = () => {
    if (locked) return; locked = true;
    const t = toks[+b.dataset.i];
    $$('.sentence-tokens .tok').forEach((x) => { if (toks[+x.dataset.i].wrong) x.classList.add(t.wrong ? 'ok' : 'sel'); });
    if (!t.wrong) {
      b.classList.add('bad');
      finish(task, false, { solution: fixed, why: `Falsch war: „${esc(wrongText)}“. ${why}`, speakText: fixedPlain });
      return;
    }
    $('#err-step2').innerHTML = `<p class="hint" style="margin:14px 0 0">Richtig erkannt! Wie heißt es korrekt statt <b>„${esc(wrongText)}“</b>?</p>
      <input class="answer-input" id="ans" placeholder="Korrektur" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done">`;
    const inp = $('#ans');
    const btn = footButton('Prüfen', check, true);
    inp.oninput = () => { btn.disabled = !inp.value.trim(); };
    inp.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); if (inp.value.trim()) check(); } };
    setTimeout(() => inp.focus(), 60);
    let done = false;
    function check() {
      if (done) return; done = true;
      inp.disabled = true;
      const r = checkAnswer(inp.value, it.fix);
      inp.style.borderColor = r ? 'var(--ok)' : 'var(--bad)';
      finish(task, r, { solution: fixed, why, speakText: fixedPlain });
    }
  });
}

/* ---------- Abschluss ---------- */
function renderSummary() {
  $('#l-prog').style.width = '100%';
  const pct = L.answered ? Math.round((L.ok / L.answered) * 100) : 0;
  const due = dueVocab().length;
  body().innerHTML = `<div class="summary">
    <div class="big-number">${pct}%</div>
    <h2>Lektion abgeschlossen</h2>
    <p class="muted">${L.ok} von ${L.answered} Aufgaben beim ersten Versuch richtig.</p>
    ${L.mistakes.length ? `<div class="mistakes"><h2 class="section" style="margin-left:0">Zum Merken</h2>${L.mistakes.map((m) => `<div class="mistake"><div class="q">${m.q}</div><div class="a">${m.a}</div></div>`).join('')}</div>` : ''}
  </div>`;
  const f = foot(); f.className = 'lesson-foot';
  const again = L.type === 'review' ? due > 0 : L.type === 'new' ? newVocabList().length > 0 : true;
  f.innerHTML = `<div class="inner"><div class="btn-row" style="margin-top:0">
    ${again ? `<button class="btn secondary" id="l-again">${L.type === 'review' ? `Weiter wiederholen (${due})` : L.type === 'new' ? 'Weitere neue Wörter' : 'Noch eine Runde'}</button>` : ''}
    <button class="btn" id="l-done">Fertig</button></div></div>`;
  $('#l-done').onclick = () => endLesson();
  const a = $('#l-again');
  if (a) a.onclick = () => { const { type, arg } = L; endLesson(); startLesson(type, arg); };
}

/* =========================================================
   Start
   ========================================================= */
render();
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
// für Tests
window.__ww = { checkAnswer, findForm, variants, S: () => S, startLesson };
