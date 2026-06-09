const summaryText = document.getElementById("summaryText");
const goalText = document.getElementById("goalText");
const sourceText = document.getElementById("sourceText");
const startAttrsEl = document.getElementById("startAttrs");
const endAttrsEl = document.getElementById("endAttrs");
const careerEvalEl = document.getElementById("careerEval");
const actionsBody = document.getElementById("actionsBody");
const actionsCards = document.getElementById("actionsCards");
const infoPanel = document.getElementById("infoPanel");
const attrsSection = document.getElementById("attrsSection");
const startAttrsPanel = document.getElementById("startAttrsPanel");
const endAttrsPanel = document.getElementById("endAttrsPanel");
const actionsDetailWrap = document.getElementById("actionsDetail");
const stageTitleEl = document.getElementById("stageTitle");
const stageSubtitleEl = document.getElementById("stageSubtitle");
const stageNavEl = document.getElementById("stageNav");

const mobileMedia = window.matchMedia("(max-width: 768px)");

function stageUrl(id) {
  return `stage.html?id=${encodeURIComponent(id)}`;
}

function getStageIdFromUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

const currentAgeId = getStageIdFromUrl();
const currentStage = AGE_STAGES.find((s) => s.id === currentAgeId);

if (currentAgeId === "18") {
  window.location.replace("stage.html?id=requirements");
  throw new Error("redirect");
}

if (!currentStage) {
  window.location.replace("index.html");
  throw new Error("invalid stage");
}

function isMobileView() {
  return mobileMedia.matches;
}

function isInfoStage(stage) {
  return stage?.stageKind === "requirements" || stage?.stageKind === "adulthood";
}

function getCumulativeBefore(ageId) {
  const totals = {};
  for (const stage of AGE_STAGES) {
    if (stage.id === ageId) break;
    if (isInfoStage(stage)) continue;
    stage.actions.forEach((action) => {
      totals[action.id] = (totals[action.id] || 0) + action.count;
    });
  }
  return totals;
}

function renderRequirementsPanel() {
  const rows = SHENJIJU_REQUIREMENTS.map(
    (row) => `
    <tr>
      <td>${row.label}</td>
      <td class="num">${row.min != null ? `≥ ${row.min}` : "—"}</td>
      <td>${row.recommend}</td>
    </tr>
  `
  ).join("");

  const cards = SHENJIJU_REQUIREMENTS.map(
    (row) => `
    <article class="req-card">
      <div class="req-card-head">
        <span class="req-card-label">${row.label}</span>
        <span class="req-card-min">${row.min != null ? `≥ ${row.min}` : "—"}</span>
      </div>
      <p class="req-card-note">${row.recommend}</p>
    </article>
  `
  ).join("");

  return `
    <h2>18 岁成年判定门槛</h2>
    <div class="desktop-only">
      <p class="scroll-hint" aria-hidden="true">左右滑动查看全部列</p>
      <div class="table-wrap">
        <table class="requirements-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>最低</th>
              <th>寒冰路线建议</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
    <div class="mobile-only requirements-cards" aria-label="神结局要求列表">${cards}</div>
  `;
}

function renderAdulthoodPanel(stage) {
  const blocks = (stage.infoSections || [])
    .map(
      (section) => `
      <article class="info-block">
        <h3>${section.title}</h3>
        <ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `
    )
    .join("");

  return `<h2>成年后说明</h2>${blocks}`;
}

function formatChangeValue(val) {
  if (Array.isArray(val)) {
    const [min, max] = val;
    if (min === max) {
      const sign = min > 0 ? "+" : "";
      return `${sign}${min}`;
    }
    const signMin = min > 0 ? "+" : "";
    const signMax = max > 0 ? "+" : "";
    return `${signMin}${min}～${signMax}${max}`;
  }
  const sign = val > 0 ? "+" : "";
  return `${sign}${val}`;
}

function formatEffect(effectKey) {
  const effect = ACTION_EFFECTS[effectKey];
  if (!effect) return "—";

  const parts = Object.entries(effect.changes).map(([key, val]) => {
    return `${ATTR_LABELS[key]}${formatChangeValue(val)}`;
  });

  if (effect.cost) {
    parts.push(`消耗${effect.cost}`);
  }

  const suffix = effect.floating ? "（浮动）" : "";
  return `${parts.join("，")}${suffix}`;
}

function formatState(state, approximateKeys = []) {
  if (!state) return "—";
  return ATTR_KEYS.map((key) => {
    const val = state[key];
    const approx = approximateKeys.includes(key);
    const prefix = approx ? "≈" : "";
    return `
      <div class="attr-item">
        <span class="attr-label">${ATTR_LABELS[key]}</span>
        <span class="attr-value">${prefix}${val}</span>
      </div>
    `;
  }).join("");
}

function getApproximateKeys(ageId, which) {
  const snapshot = AGE_SNAPSHOTS[ageId];
  if (which === "end" && snapshot?.approxEnd) {
    return snapshot.approxEnd;
  }
  return [];
}

function formatCareerEval(snapshot) {
  if (!snapshot?.careerEval) return "";
  const ce = snapshot.careerEval;
  if (typeof ce === "number") {
    return `职业评价：${ce}`;
  }
  const parts = [];
  if (ce.start) parts.push(`进入 ${ce.start}`);
  if (ce.end) parts.push(`下岁 ${ce.end}`);
  return parts.length ? `职业评价 ${parts.join(" → ")}` : "";
}

function getAdjacentStages(ageId) {
  const idx = AGE_STAGES.findIndex((s) => s.id === ageId);
  return {
    prev: idx > 0 ? AGE_STAGES[idx - 1] : null,
    next: idx >= 0 && idx < AGE_STAGES.length - 1 ? AGE_STAGES[idx + 1] : null,
  };
}

function renderStageNav() {
  const { prev, next } = getAdjacentStages(currentAgeId);

  stageNavEl.innerHTML = `
    ${
      prev
        ? `<a class="stage-nav-link stage-nav-prev" href="${stageUrl(prev.id)}">← ${prev.label}</a>`
        : '<span class="stage-nav-link stage-nav-disabled stage-nav-prev" aria-hidden="true">←</span>'
    }
    <a class="stage-nav-link stage-nav-home" href="index.html">目录</a>
    ${
      next
        ? `<a class="stage-nav-link stage-nav-next" href="${stageUrl(next.id)}">${next.label} →</a>`
        : '<span class="stage-nav-link stage-nav-disabled stage-nav-next" aria-hidden="true">→</span>'
    }
  `;
}

function render() {
  const stage = currentStage;
  if (!stage) return;

  document.title = `${stage.label} · 孩子养育`;

  if (stageTitleEl) stageTitleEl.textContent = stage.label;
  if (stageSubtitleEl) stageSubtitleEl.textContent = stage.goal;

  renderStageNav();

  const infoOnly = isInfoStage(stage);
  const hasActions = stage.actions.length > 0;
  const snapshot = AGE_SNAPSHOTS[currentAgeId];

  if (infoPanel) {
    if (stage.stageKind === "requirements") {
      infoPanel.innerHTML = renderRequirementsPanel();
      infoPanel.hidden = false;
    } else if (stage.stageKind === "adulthood") {
      infoPanel.innerHTML = renderAdulthoodPanel(stage);
      infoPanel.hidden = false;
    } else {
      infoPanel.hidden = true;
      infoPanel.innerHTML = "";
    }
  }

  const showAttrs = hasActions && !infoOnly && snapshot;
  const startHtml = showAttrs && snapshot.start ? formatState(snapshot.start) : "";
  const endHtml =
    showAttrs && snapshot.end ? formatState(snapshot.end, getApproximateKeys(currentAgeId, "end")) : "";

  if (attrsSection) attrsSection.hidden = !(startHtml || endHtml);
  if (startAttrsPanel) startAttrsPanel.hidden = !startHtml;
  if (endAttrsPanel) endAttrsPanel.hidden = !endHtml;
  if (actionsDetailWrap) actionsDetailWrap.hidden = !hasActions;

  startAttrsEl.innerHTML = startHtml;
  endAttrsEl.innerHTML = endHtml;

  const cumulativeBefore = getCumulativeBefore(currentAgeId);

  if (showAttrs) {
    const evalText = formatCareerEval(snapshot);
    careerEvalEl.textContent = evalText;
    careerEvalEl.hidden = !evalText;

    sourceText.textContent = snapshot.source ? `数据来源：${snapshot.source}` : "";
  } else {
    careerEvalEl.hidden = true;
    if (infoOnly) {
      sourceText.textContent =
        stage.stageKind === "requirements"
          ? "数据来源：寒冰 5010 攻略原文"
          : "数据来源：寒冰 5010 攻略原文（18 岁后延伸）";
    } else {
      sourceText.textContent = "";
    }
  }

  const countLabel = stage.yearSpan ? "本阶段" : stage.opsPerYear != null ? "本岁" : "引导期";
  const countUnit = stage.yearSpan ? "次/阶段" : "次/年";
  const beforeLabel = countLabel === "本阶段" ? "阶段前累计" : "本岁前累计";
  const afterLabel = countLabel === "本阶段" ? "阶段后累计" : "本岁后累计";

  const rows = stage.actions.map((action) => {
    const before = cumulativeBefore[action.id] || 0;
    const total = before + action.count;
    return {
      ...action,
      countThisYear: action.count,
      countBefore: before,
      countTotal: total,
      effectText: formatEffect(action.effectKey),
      typeLabel: ACTION_TYPES[action.type] || action.type,
    };
  });

  actionsBody.innerHTML = rows.length
    ? rows
        .map(
          (row) => `
      <tr>
        <td>
          <span class="action-name">${row.name}</span>
          <span class="action-scene">${row.scene}</span>
        </td>
        <td><span class="type-badge type-${row.type}">${row.typeLabel}</span></td>
        <td class="num">${row.countThisYear}</td>
        <td class="num">${row.countBefore}</td>
        <td class="num highlight">${row.countTotal}</td>
        <td class="effect-cell">${row.effectText}</td>
        <td class="note-cell">${row.note || "—"}</td>
      </tr>
    `
        )
        .join("")
    : "";

  if (isMobileView()) {
    actionsCards.innerHTML = rows.length
      ? rows
          .map(
            (row) => `
        <article class="action-card">
          <div class="action-card-header">
            <div>
              <span class="action-name">${row.name}</span>
              <span class="action-scene">${row.scene} · ${row.typeLabel}</span>
            </div>
            <span class="type-badge type-${row.type}">${row.countThisYear}${countUnit}</span>
          </div>
          <div class="action-card-grid">
            <div class="action-stat">
              <span class="action-stat-label">${beforeLabel}</span>
              <span class="action-stat-value">${row.countBefore}</span>
            </div>
            <div class="action-stat">
              <span class="action-stat-label">${afterLabel}</span>
              <span class="action-stat-value highlight">${row.countTotal}</span>
            </div>
          </div>
          <p class="action-effect">${row.effectText}</p>
          ${row.note ? `<p class="action-note">${row.note}</p>` : ""}
        </article>
      `
          )
          .join("")
      : "";
  } else {
    actionsCards.innerHTML = "";
  }

  let opsText = "说明页";
  if (hasActions) {
    opsText = "引导期共 12 次";
    if (stage.yearSpan && stage.opsTotal != null) {
      opsText = `${stage.yearSpan} 共 ${stage.opsTotal} 次操作`;
    } else if (stage.opsPerYear != null) {
      opsText = `本年操作 ${stage.opsPerYear} 次`;
    }
  }

  const { next } = getAdjacentStages(currentAgeId);
  const hintsHtml = stage.hints?.length
    ? `<ul class="goal-hints">${stage.hints.map((h) => `<li>${h}</li>`).join("")}</ul>`
    : "";
  goalText.innerHTML = `<strong>${stage.goal}</strong>${hintsHtml}`;
  summaryText.textContent = hasActions
    ? `${stage.label} · ${opsText}${next ? ` · 下一阶段：${next.label}` : ""}`
    : `${stage.label} · 说明`;

  const countHeader = document.getElementById("countHeader");
  const startAttrsTitle = document.getElementById("startAttrsTitle");
  const endAttrsTitle = document.getElementById("endAttrsTitle");
  const actionsSectionTitle = document.getElementById("actionsSectionTitle");

  if (countHeader) countHeader.textContent = `${countLabel}次数`;
  if (startAttrsTitle) {
    startAttrsTitle.textContent =
      countLabel === "本阶段"
        ? "进入本阶段时属性（攻略截图）"
        : countLabel === "引导期"
          ? "引导前属性"
          : "进入本岁时属性（攻略截图）";
  }
  if (endAttrsTitle) {
    endAttrsTitle.textContent =
      countLabel === "本阶段"
        ? "离开本阶段时属性（攻略截图）"
        : countLabel === "引导期"
          ? "6 岁初属性（攻略截图）"
          : "离开本岁时属性（攻略截图）";
  }
  if (actionsSectionTitle) {
    actionsSectionTitle.textContent =
      stage.actions.length > 0 ? `${countLabel}行为安排` : "行为安排";
  }
  const actionsSectionTitleEl = document.getElementById("actionsSectionTitle");
  if (actionsSectionTitleEl) actionsSectionTitleEl.hidden = !hasActions;
}

if (typeof mobileMedia.addEventListener === "function") {
  mobileMedia.addEventListener("change", render);
} else {
  mobileMedia.addListener(render);
}

render();
