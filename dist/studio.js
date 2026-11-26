'use strict';

const { questions, topics } = window.SYSTEM_DESIGN_BOOK;
const glossary = window.SYSTEM_DESIGN_GLOSSARY;
const copy = {
  fr: {
    questions: 'Questions', results: 'Résultats', glossary: 'Glossaire', navigation: 'Navigation principale',
    index: 'Index des questions', search: 'Chercher une question', topicFilter: 'Filtrer par thème',
    allTopics: 'Tous les thèmes', noQuestions: 'Aucune question ne correspond à cette recherche.',
    progress: 'Progression', score: 'Score cumulé', points: '1 point par bonne réponse au premier essai',
    attempted: 'Questions traitées', right: 'Bonnes réponses', wrong: 'Réponses incorrectes',
    pending: 'À traiter', accuracy: 'Taux de réussite', perAttempt: 'Sur les questions traitées',
    day: 'Jour', pages: 'PDF p.', choose: 'Quelle option choisissez-vous ?', submit: 'Valider ma réponse',
    reveal: 'Afficher la réponse', hide: 'Masquer la réponse', correction: 'Correction',
    authorChoice: 'Réponse indiquée par l’auteur', answer: 'Explication', good: 'Bonne réponse · +1 point',
    bad: 'Réponse incorrecte · 0 point', prior: 'Votre réponse enregistrée', previous: 'Question précédente',
    next: 'Question suivante', diagram: 'Voir le schéma du livre', diagramText: 'Lire la traduction du schéma',
    ocrNote: 'Transcription automatique des légendes.',
    close: 'Fermer la définition', wiki: 'Lire sur Wikipédia', wikiEn: 'Lire sur Wikipédia (anglais)',
    resultsTitle: 'Vos résultats', resultsByTopic: 'Résultats par thème', resultsByDay: 'Résultats par question',
    glossaryTitle: 'Glossaire technique', glossarySearch: 'Rechercher un terme ou un sigle',
    noTerms: 'Aucun terme ne correspond à cette recherche.', terms: 'termes',
    skip: 'Aller au contenu', translation: 'Lire la traduction intégrale', source: 'D’après le livre de Joud Awad',
    detail52: 'Le livre signale D comme bonne réponse dans le corrigé. Il présente aussi A comme choix pragmatique en production.',
  },
  en: {
    questions: 'Questions', results: 'Results', glossary: 'Glossary', navigation: 'Main navigation',
    index: 'Question index', search: 'Search questions', topicFilter: 'Filter by topic',
    allTopics: 'All topics', noQuestions: 'No questions match your search.',
    progress: 'Progress', score: 'Overall score', points: '1 point per correct first answer',
    attempted: 'Questions answered', right: 'Correct answers', wrong: 'Incorrect answers',
    pending: 'Unanswered', accuracy: 'Accuracy', perAttempt: 'Of questions answered',
    day: 'Day', pages: 'PDF p.', choose: 'Which option would you choose?', submit: 'Submit answer',
    reveal: 'Show answer', hide: 'Hide answer', correction: 'Answer and explanations',
    authorChoice: 'Answer marked by the author', answer: 'Explanation', good: 'Correct · +1 point',
    bad: 'Incorrect · 0 points', prior: 'Your recorded answer', previous: 'Previous question',
    next: 'Next question', diagram: 'View the book’s diagram', diagramText: 'Read the diagram transcript',
    ocrNote: 'Automatically transcribed labels.',
    close: 'Close definition', wiki: 'Read on Wikipedia', wikiEn: 'Read on Wikipedia',
    resultsTitle: 'Your results', resultsByTopic: 'Results by topic', resultsByDay: 'Results by question',
    glossaryTitle: 'Technical glossary', glossarySearch: 'Search for a term or acronym',
    noTerms: 'No terms match your search.', terms: 'terms',
    skip: 'Skip to content', translation: 'Read the French translation', source: 'Based on the book by Joud Awad',
    detail52: 'The book marks D as correct in the answer key. It also describes A as the pragmatic production default.',
  }
};
const storageKey = 'system-design-studio-v1';
const $ = selector => document.querySelector(selector);
const main = $('#main');
const popup = $('#term-popup');
const index = $('#question-index');
const search = $('#question-search');
const filter = $('#topic-filter');

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)) ?? {};
    const answers = {};
    for (const question of questions) {
      const picked = saved.answers?.[question.day];
      if (typeof picked === 'string' && /^[A-D]$/.test(picked)) answers[question.day] = picked;
    }
    return { language: saved.language === 'en' ? 'en' : 'fr', answers };
  } catch {
    return { language: 'fr', answers: {} };
  }
}

const preferences = readProgress();
let language = preferences.language;
let selectedDay = 1;
let activeView = 'questions';
let revealed = false;
let draft;
let tooltipAnchor;
let tooltipPinned = false;
let tooltipTimer;
const t = name => copy[language][name];
const local = entry => entry[language];
const two = number => String(number).padStart(2, '0');
const href = day => `#jour-${two(day)}`;
const safeChars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => safeChars[c]);
const simplify = value => String(value).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[’‘]/g, "'");

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ language, answers: preferences.answers }));
  } catch {
    // The current session remains usable if the browser disables local storage.
  }
}

const termLookup = new Map();
function termKey(value) {
  return value.toLowerCase().replace(/[’‘]/g, "'").replace(/[‐‑–—]/g, '-');
}

glossary.forEach((term, position) => {
  for (const alias of [...term.en, ...term.fr]) {
    const key = termKey(alias);
    if (!termLookup.has(key)) termLookup.set(key, position);
  }
});
const termPattern = new RegExp(
  '(?<![\\p{L}\\p{N}_./])(?:' + [...termLookup.keys()].sort((a, b) => b.length - a.length)
    .map(alias => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['’‘]").replace(/-/g, '[-‐‑–—]'))
    .join('|') + ')(?![\\p{L}\\p{N}_]|\\.\\p{L})',
  'giu'
);

function annotate(value) {
  const text = String(value ?? '');
  let html = '';
  let end = 0;
  for (const match of text.matchAll(termPattern)) {
    const offset = match.index;
    const id = termLookup.get(termKey(match[0]));
    html += esc(text.slice(end, offset));
    html += `<button type="button" class="term" data-term="${id}" aria-controls="term-popup" aria-expanded="false">${esc(match[0])}</button>`;
    end = offset + match[0].length;
  }
  return html + esc(text.slice(end));
}

function wikiLink(term) {
  const url = term.wiki[language] ?? term.wiki.en;
  if (!url) return '';
  const label = language === 'fr' && !term.wiki.fr ? t('wikiEn') : t('wiki');
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function positionTooltip() {
  if (!tooltipAnchor?.isConnected) return closeTooltip();
  const rect = tooltipAnchor.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) return closeTooltip();
  const width = popup.offsetWidth;
  const maxLeft = window.innerWidth - width - 12;
  const left = Math.max(12, Math.min(rect.left, maxLeft));
  const preferredTop = rect.bottom + 7;
  const height = popup.offsetHeight;
  const above = rect.top - height - 7;
  popup.style.left = `${left}px`;
  popup.style.top = `${preferredTop + height > innerHeight - 12 && above >= 12 ? above : Math.max(12, Math.min(preferredTop, innerHeight - height - 12))}px`;
}

function openTooltip(anchor, pin = false) {
  clearTimeout(tooltipTimer);
  if (tooltipAnchor === anchor && !popup.hidden) {
    tooltipPinned ||= pin;
    return;
  }
  tooltipAnchor?.setAttribute('aria-expanded', 'false');
  tooltipAnchor = anchor;
  tooltipPinned = pin;
  const term = glossary[Number(anchor.dataset.term)];
  anchor.setAttribute('aria-expanded', 'true');
  popup.setAttribute('aria-label', local(term)[0]);
  popup.innerHTML = `<button type="button" class="popup-close" aria-label="${t('close')}">×</button><h3>${esc(local(term)[0])}</h3>
    <p>${esc(local(term.definition))}</p>${wikiLink(term)}`;
  popup.hidden = false;
  positionTooltip();
}

function closeTooltip(returnFocus = false) {
  clearTimeout(tooltipTimer);
  const anchor = tooltipAnchor;
  tooltipAnchor = undefined;
  tooltipPinned = false;
  popup.hidden = true;
  anchor?.setAttribute('aria-expanded', 'false');
  if (returnFocus && anchor?.isConnected) {
    anchor.dataset.noPopup = 'true';
    anchor.focus();
    delete anchor.dataset.noPopup;
  }
}

function deferTooltipClose() {
  clearTimeout(tooltipTimer);
  if (tooltipPinned) return;
  tooltipTimer = setTimeout(() => {
    if (!popup.matches(':hover') && !popup.contains(document.activeElement) && !tooltipAnchor?.matches(':hover, :focus-visible')) closeTooltip();
  }, 165);
}

document.addEventListener('pointerover', event => {
  const anchor = event.target.closest('.term');
  if (anchor && event.pointerType !== 'touch') openTooltip(anchor);
  if (popup.contains(event.target)) clearTimeout(tooltipTimer);
});
document.addEventListener('pointerout', event => {
  if (event.target.closest('.term') || popup.contains(event.target)) deferTooltipClose();
});
document.addEventListener('focusin', event => {
  const anchor = event.target.closest('.term');
  if (anchor && anchor.dataset.noPopup !== 'true' && anchor.matches(':focus-visible')) openTooltip(anchor);
  if (event.target !== tooltipAnchor && !popup.contains(event.target) && !anchor) deferTooltipClose();
});
document.addEventListener('focusout', event => {
  if (event.target.closest('.term') || popup.contains(event.target)) deferTooltipClose();
});
document.addEventListener('click', event => {
  const anchor = event.target.closest('.term');
  if (anchor) {
    if (tooltipPinned && tooltipAnchor === anchor) closeTooltip();
    else {
      openTooltip(anchor, true);
      if (event.detail === 0) popup.querySelector('a, button')?.focus();
    }
  } else if (event.target.closest('.popup-close')) {
    closeTooltip(true);
  } else if (!popup.contains(event.target)) {
    closeTooltip();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !popup.hidden) {
    event.preventDefault();
    closeTooltip(popup.contains(document.activeElement));
  }
  if (event.key === 'Tab' && tooltipAnchor === document.activeElement && !event.shiftKey && !popup.hidden) {
    event.preventDefault();
    popup.querySelector('button')?.focus();
  }
  if (event.key === 'Tab' && popup.contains(document.activeElement) && event.shiftKey &&
      document.activeElement === popup.querySelector('button')) {
    event.preventDefault();
    closeTooltip(true);
  }
  if (event.key === 'Tab' && !event.shiftKey &&
      document.activeElement === (popup.querySelector('a') ?? popup.querySelector('button'))) {
    closeTooltip(true);
  }
});
window.addEventListener('resize', positionTooltip);
window.addEventListener('scroll', () => { if (!popup.hidden) positionTooltip(); }, { passive: true, capture: true });

function scoreFor(entries) {
  let attempted = 0;
  let correct = 0;
  for (const question of entries) {
    const picked = preferences.answers[question.day];
    attempted += Number(Boolean(picked));
    correct += Number(picked === question.correct);
  }
  return { attempted, correct, wrong: attempted - correct, total: entries.length };
}

function percentage(number) {
  return new Intl.NumberFormat(language, { style: 'percent', maximumFractionDigits: 0 }).format(number);
}

function statusFor(question) {
  const picked = preferences.answers[question.day];
  if (!picked) return { css: '', label: t('pending') };
  return picked === question.correct ? { css: 'good', label: t('right') } : { css: 'bad', label: t('wrong') };
}

function renderProgress() {
  const { attempted, correct, total } = scoreFor(questions);
  const topScore = `Score ${correct}/${total}`;
  const top = $('#top-score');
  if (top.textContent !== topScore) top.textContent = topScore;
  $('#progress').setAttribute('aria-label', t('progress'));
  $('#progress').innerHTML = `<div class="metric-grid">
    <div class="metric"><span class="metric-label">${t('score')}</span><strong>${correct}<em>/ ${total}</em></strong>
      <span class="metric-detail">${t('points')}</span></div>
    <div class="metric"><span class="metric-label">${t('attempted')}</span><strong>${attempted}<em>/ ${total}</em></strong>
      <span class="metric-detail">${total - attempted} ${t('pending').toLowerCase()}</span></div>
    <div class="metric"><span class="metric-label">${t('accuracy')}</span>
      <strong>${attempted ? percentage(correct / attempted) : '—'}</strong>
      <span class="metric-detail">${t('perAttempt')}</span></div>
    <div class="metric"><span class="metric-label">${t('progress')}</span>
      <strong>${percentage(attempted / total)}</strong>
      <span class="track" aria-hidden="true"><i style="width:${attempted / total * 100}%"></i></span></div>
    </div>`;
}

const questionSearch = new Map(questions.map(question => [question.day, simplify([
  two(question.day), question.day, ...Object.values(question.title), ...Object.values(topics[question.topic]),
  ...[...question.scenario, ...question.postScenario].flatMap(block => Object.values(block.text ?? {})),
  ...question.choices.flatMap(choice => choice.blocks.flatMap(block => Object.values(block.text ?? {}))),
].join(' '))]));

function renderIndex() {
  const tokens = simplify(search.value).trim().split(/\s+/).filter(Boolean);
  const topic = filter.value;
  const visible = questions.filter(question =>
    (!topic || question.topic === topic) && tokens.every(token => questionSearch.get(question.day).includes(token))
  );
  const priorScroll = index.scrollTop;
  $('#index-count').textContent = `${visible.length}/${questions.length}`;
  index.innerHTML = visible.length ? visible.map(question => {
    const status = statusFor(question);
    const title = local(question.title);
    return `<a class="index-link" href="${href(question.day)}"${question.day === selectedDay ? ' aria-current="page"' : ''}
      aria-label="${esc(`${t('day')} ${two(question.day)}. ${title}. ${status.label}.`)}">
      <span class="index-number">${two(question.day)}</span><span class="index-name">${esc(title)}</span>
      <span class="status ${status.css}" aria-hidden="true"></span></a>`;
  }).join('') : `<p class="index-empty">${t('noQuestions')}</p>`;
  index.scrollTop = priorScroll;
}

function figure(block) {
  const transcript = block.transcript[language];
  const transcriptMarkup = transcript.length ? `<details class="figure-text"><summary>${t('diagramText')}</summary>
    <div class="prose"><p class="note">${t('ocrNote')}</p>${transcript.map(line => `<p class="list-line">${annotate(line)}</p>`).join('')}</div></details>` : '';
  return `<details class="figure"><summary>${t('diagram')} · ${t('pages')} ${block.page}</summary><img loading="lazy" decoding="async"
    src="figures/${esc(block.id)}.webp" width="${block.width}" height="${block.height}" alt="${esc(local(block.alt))}">
    ${transcriptMarkup}</details>`;
}

function blockHtml(block) {
  if (block.kind === 'figure') return figure(block);
  if (block.kind === 'list') {
    return `<ol>${local(block.items).map(item => `<li>${annotate(item.replace(/^\d+\.\s*/, ''))}</li>`).join('')}</ol>`;
  }
  if (block.kind === 'code') return `<pre><code>${esc(local(block.text))}</code></pre>`;
  const text = local(block.text);
  return `<p${/^[•→]/.test(text) ? ' class="list-line"' : ''}>${annotate(text)}</p>`;
}

function renderExercise(question) {
  const picked = preferences.answers[question.day];
  const related = Object.values(question.choices).map(choice => {
    const optionId = `option-${choice.letter}`;
    const chosen = (draft ?? picked) === choice.letter;
    const grade = revealed && question.correct === choice.letter ? 'good' :
      revealed && picked === choice.letter ? 'bad' : '';
    return `<div class="option" data-letter="${choice.letter}" data-grade="${grade}">
      <input type="radio" id="${optionId}" name="answer" value="${choice.letter}" required
        aria-labelledby="${optionId}-letter ${optionId}-copy"${chosen ? ' checked' : ''}${picked ? ' disabled' : ''}>
      <label id="${optionId}-letter" for="${optionId}">${choice.letter}</label>
      <div class="option-copy" id="${optionId}-copy">${choice.blocks.map(blockHtml).join('')}</div>
    </div>`;
  }).join('');
  const status = picked ? `<p class="answer-result ${picked === question.correct ? 'good' : 'bad'}" role="status">
    ${revealed ? t(picked === question.correct ? 'good' : 'bad') : `${t('prior')} ${picked}`}</p>` : '';
  return `<form class="exercise" id="exercise">
    <fieldset><legend>${t('choose')}</legend><div class="choices">${related}</div></fieldset>
    ${question.postScenario.length ? `<div class="prose option-context">${question.postScenario.map(blockHtml).join('')}</div>` : ''}
    <div class="actions">${picked ? '' : `<button type="submit" class="button primary">${t('submit')}</button>`}
      <button id="reveal" type="button" class="button" aria-expanded="${revealed}" aria-controls="correction">${t(revealed ? 'hide' : 'reveal')}</button>
      ${status}
    </div>
  </form>`;
}

function renderCorrection(question) {
  if (!revealed) return '<section id="correction" class="correction" hidden></section>';
  const details = question.explanations.map((explanation, i) => `<section class="explanation${i === 0 ? ' correct' : ''}">
    <h3>${t('answer')} ${i + 1}</h3><div class="prose">${explanation.map(blockHtml).join('')}</div></section>`).join('');
  return `<section id="correction" class="correction" tabindex="-1">
    <h2>${t('correction')}</h2>
    <p class="answer-result good">${t('authorChoice')} ${question.correct}</p>
    ${question.day === 52 ? `<p class="note">${t('detail52')}</p>` : ''}
    <div class="prose">${question.answerIntro.map(blockHtml).join('')}</div>
    ${details}
  </section>`;
}

function renderQuestion(question) {
  main.innerHTML = `<article class="card" id="question" aria-labelledby="question-title">
    <header class="question-head">
      <div class="question-meta"><span class="eyebrow">${t('day')} ${two(question.day)} / ${two(questions.length)} · ${esc(local(topics[question.topic]))}</span>
        <span class="source">${t('pages')} ${question.pages[0]}–${question.pages[1]}</span></div>
      <h1 id="question-title">${annotate(local(question.title))}</h1>
    </header>
    <div class="question-body">
      <div class="prose">${question.scenario.map(blockHtml).join('')}</div>
      ${renderExercise(question)}
      ${renderCorrection(question)}
    </div>
  </article>
  <nav class="pager" aria-label="${t('questions')}">
    ${question.day > 1 ? `<a class="button" href="${href(question.day - 1)}">${t('previous')}</a>` : '<span></span>'}
    ${question.day < questions.length ? `<a class="button" href="${href(question.day + 1)}">${t('next')}</a>` : '<span></span>'}
  </nav>`;
  const form = $('#exercise');
  form.addEventListener('change', event => { draft = event.target.value; });
  form.addEventListener('click', event => {
    const option = event.target.closest('.option');
    if (option && !event.target.closest('button, a, input, label') && !preferences.answers[question.day]) {
      option.querySelector('input').click();
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const picked = new FormData(form).get('answer');
    if (!picked || preferences.answers[question.day]) return;
    preferences.answers[question.day] = picked;
    saveProgress();
    setRevealed(question, true);
    renderProgress();
    renderIndex();
  });
  $('#reveal').addEventListener('click', () => setRevealed(question, !revealed));
}

function setRevealed(question, open) {
  revealed = open;
  closeTooltip();
  const scrollY = window.scrollY;
  renderQuestion(question);
  window.scrollTo(0, scrollY);
  if (open) {
    const correction = $('#correction');
    correction.focus({ preventScroll: true });
    correction.scrollIntoView({ block: 'nearest' });
  } else {
    $('#reveal').focus({ preventScroll: true });
  }
}

function renderResults() {
  const rows = Object.entries(topics).map(([id, title]) => {
    const { correct, wrong, attempted, total } = scoreFor(questions.filter(q => q.topic === id));
    return `<div class="chart-row"><div class="chart-label"><span>${esc(local(title))}</span>
      <span aria-label="${correct} ${t('right')}, ${attempted} ${t('attempted')}, ${total} ${t('questions')}">${correct} / ${total}</span></div>
      <span class="track" aria-hidden="true"><i class="good" style="width:${correct / total * 100}%"></i>
      <i class="bad" style="width:${wrong / total * 100}%"></i></span></div>`;
  }).join('');
  const days = questions.map(question => {
    const status = statusFor(question);
    const description = `${t('day')} ${question.day}. ${local(question.title)}. ${status.label}.`;
    return `<a href="${href(question.day)}" class="${status.css}" title="${esc(description)}" aria-label="${esc(description)}">${two(question.day)}</a>`;
  }).join('');
  const legend = [['good', 'right'], ['bad', 'wrong'], ['', 'pending']]
    .map(([css, label]) => `<span><i class="status ${css}" aria-hidden="true"></i>${t(label)}</span>`).join('');
  main.innerHTML = `<header class="overview-head"><h1>${t('resultsTitle')}</h1></header>
    <div class="dashboard-grid">
      <section class="card"><h2>${t('resultsByTopic')}</h2><div class="chart">${rows}</div></section>
      <section class="card"><h2>${t('resultsByDay')}</h2><div class="grid-days">${days}</div><div class="legend">${legend}</div></section>
    </div>`;
}

function renderGlossary(query = '') {
  main.innerHTML = `<header class="overview-head"><h1>${t('glossaryTitle')}</h1>
    <label class="search"><span aria-hidden="true"></span><input id="glossary-search" type="search" autocomplete="off"
      aria-label="${t('glossarySearch')}" placeholder="${t('glossarySearch')}" value="${esc(query)}"></label>
    <p id="glossary-count" role="status"></p>
    </header><div class="glossary-list" id="glossary-list"></div>`;
  const input = $('#glossary-search');
  const ordered = [...glossary].sort((a, b) => local(a)[0].localeCompare(local(b)[0], language));
  const renderMatches = () => {
    const tokens = simplify(input.value).trim().split(/\s+/).filter(Boolean);
    const found = ordered.filter(term => {
      const value = simplify([...term.en, ...term.fr, ...Object.values(term.definition)].join(' '));
      return tokens.every(token => value.includes(token));
    });
    $('#glossary-count').textContent = `${found.length} ${t('terms')}`;
    $('#glossary-list').innerHTML = found.length ? found.map(term => {
      const alt = local(term).slice(1).filter(name => name !== local(term)[0]).join(' · ');
      return `<article class="card"><h2>${esc(local(term)[0])}</h2>
        ${alt ? `<p class="alias">${esc(alt)}</p>` : ''}
        <p>${esc(local(term.definition))}</p>${wikiLink(term)}</article>`;
    }).join('') : `<p>${t('noTerms')}</p>`;
  };
  input.addEventListener('input', renderMatches);
  renderMatches();
}

function renderBase() {
  document.documentElement.lang = language;
  $('#skip').textContent = t('skip');
  $('.top-nav').setAttribute('aria-label', t('navigation'));
  $('#nav-questions').textContent = t('questions');
  $('#nav-results').textContent = t('results');
  $('#nav-glossary').textContent = t('glossary');
  $('#index-title').textContent = t('index');
  index.setAttribute('aria-label', t('index'));
  search.placeholder = t('search');
  search.setAttribute('aria-label', t('search'));
  const previousTopic = filter.value;
  filter.setAttribute('aria-label', t('topicFilter'));
  filter.innerHTML = `<option value="">${t('allTopics')}</option>` + Object.entries(topics)
    .map(([id, name]) => `<option value="${id}">${esc(local(name))}</option>`).join('');
  filter.value = previousTopic;
  document.querySelectorAll('[data-language]').forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.language === language))
  );
  $('#footer').innerHTML = `<span>${t('source')} · <cite>60 Days of System Design Questions</cite></span>
    <a href="traduction-fr.html" target="_blank" rel="noopener">${t('translation')}</a>`;
}

function showView({ jump = false, glossaryQuery = '' } = {}) {
  closeTooltip();
  $('#layout').classList.toggle('wide', activeView !== 'questions');
  $('#sidebar').hidden = activeView !== 'questions';
  const routes = [['questions', '#nav-questions'], ['results', '#nav-results'], ['glossary', '#nav-glossary']];
  for (const [view, selector] of routes) {
    if (view === activeView) $(selector).setAttribute('aria-current', 'page');
    else $(selector).removeAttribute('aria-current');
  }
  if (activeView === 'questions') {
    renderIndex();
    renderQuestion(questions[selectedDay - 1]);
  } else if (activeView === 'results') {
    renderResults();
  } else {
    renderGlossary(glossaryQuery);
  }
  if (jump) {
    if (activeView === 'questions') {
      const active = index.querySelector('[aria-current]');
      if (active) {
        const top = active.getBoundingClientRect().top - index.getBoundingClientRect().top;
        if (top < 0 || top + active.offsetHeight > index.clientHeight) index.scrollTop += top;
      }
    }
    main.focus({ preventScroll: true });
    if (activeView === 'questions' && matchMedia('(max-width: 760px)').matches) main.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }
}

function route(jump = false) {
  const hash = location.hash;
  const previousView = activeView;
  const day = Number(hash.match(/^#jour-(\d{1,2})$/)?.[1]);
  activeView = hash === '#resultats' ? 'results' : hash === '#glossaire' ? 'glossary' : 'questions';
  if (activeView === 'questions' && (previousView !== activeView || (day >= 1 && day <= questions.length && day !== selectedDay))) {
    draft = undefined;
    revealed = false;
  }
  if (day >= 1 && day <= questions.length) selectedDay = day;
  showView({ jump });
}

window.addEventListener('hashchange', () => route(true));
search.addEventListener('input', renderIndex);
filter.addEventListener('change', renderIndex);
$('#skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView({ block: 'start' });
});
$('.language').addEventListener('click', event => {
  const button = event.target.closest('[data-language]');
  if (!button || button.dataset.language === language) return;
  const glossaryQuery = $('#glossary-search')?.value ?? '';
  language = button.dataset.language;
  saveProgress();
  renderBase();
  renderProgress();
  showView({ glossaryQuery });
});

renderBase();
renderProgress();
route();
