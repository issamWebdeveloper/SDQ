// Run from any directory with: node scripts/build-figures.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { diagrams, options } from './figures-data.mjs';

const output = new URL('../dist/', import.meta.url);
const figures = new URL('figures/', output);
const bookFile = new URL('book-data.js', output);
const readerFile = new URL('traduction-fr.html', output);
const bookPrefix = 'window.SYSTEM_DESIGN_BOOK = ';
const book = JSON.parse((await readFile(bookFile, 'utf8')).trim().slice(bookPrefix.length, -1));
const width = 1120;
const margin = 38;
const contentWidth = width - 2 * margin;
const nodeHeight = 96;
const rowGap = 16;
const font = 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
const languages = ['en', 'fr'];
const letters = 'ABCD';
const htmlEscape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const localized = value => {
  const [en, fr = en] = value.split('|');
  return { en, fr };
};
const rounded = value => Math.round(value * 10) / 10;

const palette = {
  client: ['#edf6ff', '#568eb6', '#236b9b'],
  phone: ['#edf6ff', '#568eb6', '#236b9b'],
  service: ['#e9f5f1', '#75a696', '#23745f'],
  gateway: ['#e9f3fa', '#6299aa', '#24677c'],
  database: ['#e7f1fc', '#7398bb', '#345c85'],
  bucket: ['#fbf2d9', '#b49752', '#8b6426'],
  queue: ['#f0edfa', '#9a86bd', '#67509d'],
  agent: ['#f2ecf8', '#a286bb', '#785297'],
  cloud: ['#e7f4f6', '#79a5b5', '#317484'],
  event: ['#f8f0dc', '#b59a5b', '#86601c'],
  document: ['#eef1f7', '#879bb7', '#526e96'],
  warn: ['#fbebea', '#c58a86', '#9e4a43'],
  hexgrid: ['#e9f5f1', '#75a696', '#23745f'],
  squaregrid: ['#e9f5f1', '#75a696', '#23745f'],
  quadtree: ['#f0edfa', '#9a86bd', '#67509d'],
};

// Icons use a common 28×28 grid. Each is built from SVG primitives.
const icons = {
  client: '<rect x="2" y="4" width="24" height="16" rx="2"/><path d="M14 20v4m-6 0h12"/>',
  phone: '<rect x="7" y="2" width="14" height="24" rx="3"/><path d="M12 5h4m-3 18h2"/>',
  service: '<rect x="4" y="5" width="20" height="18" rx="3"/><path d="M10 10l-4 4 4 4m8-8 4 4-4 4m-3-9-2 10"/>',
  gateway: '<path d="M14 2l12 12-12 12L2 14Z M7 14h13m-4-4 4 4-4 4"/>',
  database: '<ellipse cx="14" cy="6" rx="10" ry="4"/><path d="M4 6v16c0 5 20 5 20 0V6M4 14c0 5 20 5 20 0"/>',
  bucket: '<ellipse cx="14" cy="6" rx="10" ry="4"/><path d="M4 6l3 15c1 5 13 5 14 0l3-15M10 16h8"/>',
  queue: '<rect x="2" y="7" width="6" height="14" rx="1"/><rect x="11" y="7" width="6" height="14" rx="1"/><rect x="20" y="7" width="6" height="14" rx="1"/>',
  agent: '<rect x="4" y="8" width="20" height="15" rx="4"/><path d="M14 8V3m-4 12h1m6 0h1m-8 4h8"/><circle cx="14" cy="3" r="1"/>',
  cloud: '<path d="M7 22a5 5 0 0 1-1-10 8 8 0 0 1 15-2 6 6 0 0 1 0 12Z"/>',
  event: '<path d="M15 2 5 16h8l-1 10 11-15h-8Z"/>',
  document: '<path d="M6 2h11l5 5v19H6ZM17 2v6h5M10 13h8m-8 5h8"/>',
  warn: '<path d="M14 3 26 25H2Z M14 11v6m0 4v.3"/>',
  hexgrid: '<path d="M14 2l6 3v6l-6 3-6-3V5ZM8 11l6 3v6l-6 3-6-3v-6Zm12 0 6 3v6l-6 3-6-3v-6Z"/>',
  squaregrid: '<rect x="3" y="3" width="22" height="22" rx="1"/><path d="M3 14h22M14 3v22"/><circle cx="19.5" cy="8.5" r="2" fill="currentColor" stroke="none"/>',
  quadtree: '<rect x="3" y="3" width="22" height="22" rx="1"/><path d="M3 14h22M14 3v22M14 8.5h11M19.5 3v11"/>',
};

function lengthInPixels(label, fontSize) {
  // A conservative estimate of advance widths for a sans-serif system font.
  return [...label].reduce((length, character) => {
    if (/[ ilI1.,:;'’!|]/.test(character)) return length + .32;
    if (/[MWmw@%±]/.test(character)) return length + .92;
    if (/\p{Lu}/u.test(character)) return length + .69;
    return length + .60;
  }, 0) * fontSize;
}

function wrap(label, availableWidth, size) {
  const lines = [];
  let line = '';
  for (const word of label.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && lengthInPixels(next, size) > availableWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function labelLayout(label, availableWidth, maxLines, fontSize) {
  let size = fontSize;
  let lines;
  while (size >= 10) {
    lines = Object.fromEntries(languages.map(lang => [lang, wrap(label[lang], availableWidth, size)]));
    if (languages.every(lang => lines[lang].length <= maxLines &&
        lines[lang].every(line => lengthInPixels(line, size) <= availableWidth))) {
      return { size, lines, lineHeight: rounded(size * 1.25),
        count: Math.max(lines.en.length, lines.fr.length) };
    }
    size -= .5;
  }
  throw new Error(`Cannot fit diagram label: ${label.en}`);
}

function text(layout, lang, { x, y, color = '#193245', weight = 600, center = false }) {
  const lines = layout.lines[lang];
  const content = Array.from({ length: layout.count }, (_, index) =>
    `<tspan x="${x}" y="${rounded(y + index * layout.lineHeight)}">${htmlEscape(lines[index] ?? '')}</tspan>`).join('');
  return `<text fill="${color}" font-size="${layout.size}" font-weight="${weight}"${center ? ' text-anchor="middle"' : ''}>${content}</text>`;
}

function rectangle(x, y, w, h, fill, stroke = 'none', radius = 10) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
}

function parseNode(definition) {
  const separator = definition.indexOf(':');
  const type = definition.slice(0, separator);
  if (!icons[type]) throw new Error(`Unknown diagram shape: ${type}`);
  return { type, label: localized(definition.slice(separator + 1)) };
}

function inferredLinks(columns) {
  const result = [];
  for (let col = 0; col < columns.length - 1; col++) {
    const current = columns[col];
    const next = columns[col + 1];
    if (current.length === next.length) {
      for (let row = 0; row < current.length; row++) result.push([col, row, col + 1, row]);
    } else if (current.length === 1 || next.length === 1) {
      for (let row = 0; row < Math.max(current.length, next.length); row++) {
        result.push([col, Math.min(row, current.length - 1), col + 1, Math.min(row, next.length - 1)]);
      }
    } else {
      throw new Error('Uneven columns with more than one node require explicit links.');
    }
  }
  return result;
}

function flowLayout(flow, top, links, group, returnLinks = []) {
  const columns = flow.map(column => (Array.isArray(column) ? column : [column]).map(parseNode));
  const rowCount = Math.max(...columns.map(column => column.length));
  const gap = columns.length >= 6 ? 29 : 42;
  const nodeWidth = Math.min(222, Math.floor((contentWidth - gap * (columns.length - 1)) / columns.length));
  const bodyHeight = rowCount * nodeHeight + (rowCount - 1) * rowGap;
  const xStart = rounded((width - (columns.length * nodeWidth + (columns.length - 1) * gap)) / 2);
  const yStart = group ? top + 32 : top;
  const nodes = columns.map((column, col) => column.map((node, row) => ({
    ...node,
    x: rounded(xStart + col * (nodeWidth + gap)),
    y: rounded(yStart + (rowCount - column.length) * (nodeHeight + rowGap) / 2 + row * (nodeHeight + rowGap)),
    w: nodeWidth,
    h: nodeHeight,
    label: labelLayout(node.label, nodeWidth - 20, 3, nodeWidth < 155 ? 15 : 16),
  })));
  const enclosure = group ? { nodes: nodes[group[0]], label: labelLayout(localized(group[1]), nodeWidth + 14, 1, 14) } : null;
  const bottom = yStart + bodyHeight + (group ? 9 : 0);
  return { nodes, links: links ?? inferredLinks(columns), enclosure, returnLinks,
    returnY: bottom + 19, bottom: bottom + (returnLinks.length ? 25 : 0) };
}

function drawLink(start, end) {
  const sy = rounded(start.y + start.h / 2);
  const ey = rounded(end.y + end.h / 2);
  if (start.x === end.x) {
    const x = rounded(start.x + start.w / 2);
    const forward = start.y < end.y;
    return `<path d="M${x} ${forward ? start.y + start.h : start.y}V${forward ? end.y - 5 : end.y + end.h + 5}"/>`;
  }
  const x1 = start.x + start.w;
  const x2 = end.x - 5;
  const mid = rounded((x1 + x2) / 2);
  return `<path d="M${x1} ${sy}C${mid} ${sy} ${mid} ${ey} ${x2} ${ey}"/>`;
}

function drawNode(node, lang) {
  const { x, y, w, h, type, label } = node;
  const [fill, stroke, accent] = palette[type];
  const midpoint = rounded(x + w / 2);
  return [
    rectangle(x, y, w, h, fill, stroke, 12),
    `<g transform="translate(${midpoint - 14} ${y + 10})" fill="none" stroke="${accent}" color="${accent}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${icons[type]}</g>`,
    text(label, lang, { x: midpoint, y: rounded(y + 68 - (label.count - 1) * label.lineHeight / 2), center: true }),
  ].join('\n');
}

function drawFlow(flow, lang) {
  const { nodes, links, enclosure, returnLinks, returnY } = flow;
  const arrows = links.map(([col, row, nextCol, nextRow]) => drawLink(nodes[col][row], nodes[nextCol][nextRow])).join('\n');
  const returns = returnLinks.map(([col, row, nextCol, nextRow]) => {
    const source = nodes[col][row];
    const target = nodes[nextCol][nextRow];
    const x1 = rounded(source.x + source.w / 2), x2 = rounded(target.x + target.w / 2);
    return `<path d="M${x1} ${source.y + source.h}V${returnY}H${x2}V${target.y + target.h + 5}"/>`;
  }).join('\n');
  const group = enclosure ? [
    rectangle(enclosure.nodes[0].x - 9, enclosure.nodes[0].y - 29, enclosure.nodes[0].w + 18,
      enclosure.nodes.at(-1).y + nodeHeight - enclosure.nodes[0].y + 38, '#e6f0f4', '#9cb6c5', 13),
    text(enclosure.label, lang, { x: rounded(enclosure.nodes[0].x + enclosure.nodes[0].w / 2),
      y: enclosure.nodes[0].y - 9, center: true, color: '#376076' }),
  ].join('\n') : '';
  return [
    group,
    `<g fill="none" stroke="#5c7e93" stroke-linecap="round" stroke-width="2" marker-end="url(#arrow)">${arrows}</g>`,
    returns && `<g fill="none" stroke="#5c7e93" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#arrow)">${returns}</g>`,
    nodes.flat().map(node => drawNode(node, lang)).join('\n'),
  ].join('\n');
}

function makeDiagram(question, spec, isQuestion) {
  const optionLabels = options[question.day - 1].map(localized);
  const selected = spec.answer ?? question.correct;
  const alternative = !isQuestion && selected !== question.correct;
  const theme = isQuestion ? ['#75e1f7', '#236c84'] : alternative ? ['#ffd492', '#8b6224'] : ['#8defc9', '#226e57'];
  const heading = isQuestion ? question.title : {
    en: `${selected} · ${optionLabels[letters.indexOf(selected)].en}`,
    fr: `${selected} · ${optionLabels[letters.indexOf(selected)].fr}`,
  };
  const day = String(question.day).padStart(2, '0');
  const kicker = localized(isQuestion ? `DAY ${day} · SCENARIO|JOUR ${day} · SCÉNARIO` :
    alternative ? `DAY ${day} · ALTERNATIVE|JOUR ${day} · AUTRE OPTION` : `DAY ${day} · ANSWER|JOUR ${day} · CORRIGÉ`);
  const titleLayout = labelLayout(heading, contentWidth, 2, 37);
  const headerHeight = 101 + (titleLayout.count - 1) * titleLayout.lineHeight;
  let top = headerHeight + 30;
  let context;
  if (spec.context) {
    context = labelLayout(localized(spec.context), contentWidth - 30, 2, 17);
    top += context.count * context.lineHeight + 24;
  }
  const lanes = spec.lanes ? spec.lanes.map(([lane, nodes]) => {
    const label = labelLayout(localized(lane), contentWidth, 1, 16);
    const titleY = top + 11;
    const graph = flowLayout(nodes, top + 25);
    top = graph.bottom + 28;
    return { label, titleY, graph };
  }) : [];
  const graph = spec.flow ? flowLayout(spec.flow, top, spec.links, spec.group, spec.returnLinks) : null;
  if (graph) top = graph.bottom + 28;

  const stripLabels = isQuestion ? optionLabels : (spec.notes ?? []).map(localized);
  const boxWidth = stripLabels.length === 1 ? contentWidth : (contentWidth - 14) / 2;
  const strips = stripLabels.map((label, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const badge = isQuestion ? letters[index] : null;
    const stack = labelLayout(label, boxWidth - (badge ? 71 : 44), 3, isQuestion ? 17 : 16);
    return { label, stack, x: margin + column * (boxWidth + 14), y: top + row * 69, badge };
  });
  const height = rounded(top + Math.ceil(strips.length / 2) * 69 + (strips.length ? 18 : 0));

  const svg = {};
  for (const lang of languages) {
    const allLabels = graph ? graph.nodes.flat().map(node => node.label.lines[lang].join(' ')) :
      lanes.flatMap(lane => [lane.label.lines[lang].join(' '), ...lane.graph.nodes.flat().map(node => node.label.lines[lang].join(' '))]);
    const description = [
      spec.context && localized(spec.context)[lang],
      graph?.enclosure?.label.lines[lang].join(' '),
      ...allLabels,
      ...strips.map(strip => strip.badge ? `${strip.badge}. ${strip.label[lang]}` : strip.label[lang]),
    ].filter(Boolean).join('. ');
    const title = `${lang === 'fr' ? 'Jour' : 'Day'} ${day} · ${heading[lang]}`;
    const contextCopy = context ?
      text(context, lang, { x: margin + 4, y: headerHeight + 33, color: '#38576b', weight: 520 }) : '';
    const panels = strips.map(strip => {
      const { x, y, badge, stack } = strip;
      const ornament = badge ?
        rectangle(x + 13, y + 16, 30, 30, theme[1], 'none', 6) +
          text(labelLayout(localized(badge), 19, 1, 16), lang, {x: x + 28, y: y + 37, color: '#ffffff', center: true, weight: 750}) :
        `<circle cx="${x + 16}" cy="${y + 31}" r="4" fill="${theme[1]}"/>`;
      return [
        rectangle(x, y, boxWidth, 62, '#ffffff', '#c2d2dd', 9),
        ornament,
        text(stack, lang, { x: x + (badge ? 56 : 29), y: rounded(y + 36 - (stack.count - 1) * stack.lineHeight / 2) }),
      ].join('\n');
    }).join('\n');
    svg[lang] = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xml:lang="${lang}" role="img" aria-labelledby="title description">`,
      `<title id="title">${htmlEscape(title)}</title>`,
      `<desc id="description">${htmlEscape(description)}</desc>`,
      '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10 3.5 5Z" fill="#5c7e93"/></marker></defs>',
      rectangle(0, 0, width, height, '#f2f7fa', 'none', 0),
      rectangle(0, 0, width, headerHeight, '#102637', 'none', 0),
      `<g font-family="${font}">`,
      text(labelLayout(kicker, contentWidth, 1, 14), lang, { x: margin, y: 29, color: theme[0], weight: 750 }),
      text(titleLayout, lang, { x: margin, y: 76, color: '#f4fafc', weight: 730 }),
      contextCopy,
      graph ? drawFlow(graph, lang) : lanes.map(lane => [
        text(lane.label, lang, { x: margin, y: lane.titleY, color: theme[1], weight: 720 }),
        drawFlow(lane.graph, lang),
      ].join('\n')).join('\n'),
      panels,
      '</g>',
      '</svg>',
      '',
    ].filter(Boolean).join('\n');
  }
  return { svg, width, height, alt: {
    en: `Day ${day} · ${heading.en}`, fr: `Jour ${day} · ${heading.fr}`,
  } };
}

const blocksById = new Map();
for (const question of book.questions) {
  for (const block of [...question.scenario, ...question.explanations.flat()]) {
    if (block.kind !== 'figure') continue;
    if (blocksById.has(block.id) || !diagrams[block.id]) throw new Error(`Unexpected figure ${block.id}`);
    blocksById.set(block.id, { question, block, spec: diagrams[block.id], isQuestion: question.scenario.includes(block) });
  }
}
if (blocksById.size !== 120 || blocksById.size !== Object.keys(diagrams).length ||
    options.length !== book.questions.length) throw new Error('Figure and option definitions must match the book.');

const rendered = new Map();
for (const [id, info] of blocksById) {
  const { question, block, spec, isQuestion } = info;
  try {
    const { svg, ...metadata } = makeDiagram(question, spec, isQuestion);
    delete block.transcript;
    Object.assign(block, metadata);
    rendered.set(id, svg);
  } catch (error) {
    throw new Error(`Figure ${id}: ${error.message}`, { cause: error });
  }
}

let reader = await readFile(readerFile, 'utf8');
const readerIds = new Set();
reader = reader.replace(/<details class="book-figure"[^>]*>[\s\S]*?<\/details>/g, current => {
  const id = current.match(/figures\/(\d{3}-\d{2})(?:\.(?:en|fr))?\.(?:svg|webp)/)?.[1];
  const block = blocksById.get(id)?.block;
  if (!block || readerIds.has(id)) throw new Error(`Unexpected figure in the French reader: ${id}`);
  readerIds.add(id);
  const { fr } = block.alt;
  const label = htmlEscape(fr);
  return `<details class="book-figure"><summary>${label} · p. ${block.page}</summary><div class="diagram-frame"><div class="book-figure-viewport" tabindex="0" role="region" aria-label="${label}"><img loading="lazy" src="figures/${id}.fr.svg" width="${block.width}" height="${block.height}" alt="${label}"></div><button type="button" class="diagram-zoom-button" data-enlarge-diagram aria-haspopup="dialog" aria-controls="diagram-zoom" aria-label="Agrandir le schéma" title="Agrandir le schéma"></button></div></details>`;
});
if (readerIds.size !== blocksById.size) throw new Error('The French reader must include all the figures.');
if (!reader.includes('href="diagram-zoom.css"')) {
  reader = reader.replace('</head>', '<link rel="stylesheet" href="diagram-zoom.css">\n<script src="diagram-zoom.js" defer></script>\n</head>');
}
reader = reader.replace('Les schémas originaux sont accompagnés de légendes issues d’une transcription automatique et peuvent comporter des erreurs de reconnaissance.',
  'Les schémas ont été simplifiés et redessinés en SVG avec des libellés en français.');

await mkdir(figures, { recursive: true });
for (const [id, svg] of rendered) {
  for (const lang of languages) await writeFile(new URL(`${id}.${lang}.svg`, figures), svg[lang]);
}
await writeFile(bookFile, `${bookPrefix}${JSON.stringify(book)};\n`);
await writeFile(readerFile, reader);
console.log(`Generated ${rendered.size} bilingual pairs in dist/figures.`);
