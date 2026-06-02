const levelSelect = document.getElementById("levelSelect");
const sortSelect = document.getElementById("sortSelect");
const sortOrderBtn = document.getElementById("sortOrderBtn");
const statsBody = document.getElementById("statsBody");
const summaryText = document.getElementById("summaryText");
const tableHeaders = document.querySelectorAll("#statsTable th[data-key]");

let currentLevel = 5;
let sortKey = "activity";
let sortDesc = true;

function initLevelSelect() {
  for (let level = 5; level >= 1; level -= 1) {
    const option = document.createElement("option");
    option.value = String(level);
    option.textContent = `等级 ${level}`;
    levelSelect.appendChild(option);
  }
  levelSelect.value = "5";
}

function formatValue(key, value) {
  if (key === "name") return value;
  if (PERCENT_KEYS.has(key)) return `${value.toFixed(2)}%`;
  return String(value);
}

function getRowsForLevel(level) {
  return CREATURES.map((creature) => ({
    id: creature.id,
    name: creature.name,
    color: creature.color,
    ...creature.levels[level],
  }));
}

function compareRows(a, b, key, desc) {
  if (key === "name") {
    const result = a.name.localeCompare(b.name, "zh-CN");
    return desc ? -result : result;
  }

  const diff = a[key] - b[key];
  return desc ? -diff : diff;
}

function updateSortIndicators() {
  tableHeaders.forEach((th) => {
    const key = th.dataset.key;
    th.classList.toggle("sorted", key === sortKey);
    th.dataset.order = key === sortKey ? (sortDesc ? "↓" : "↑") : "";
  });

  sortSelect.value = sortKey;
  sortOrderBtn.textContent = sortDesc ? "降序 ↓" : "升序 ↑";
}

function renderTable() {
  const rows = getRowsForLevel(currentLevel).sort((a, b) =>
    compareRows(a, b, sortKey, sortDesc)
  );

  statsBody.innerHTML = rows
    .map(
      (row, index) => `
      <tr>
        <td class="name-cell">
          <span class="rank">${index + 1}</span>
          <span class="creature-name" style="--creature-color: ${row.color}">${row.name}</span>
        </td>
        <td>${formatValue("activity", row.activity)}</td>
        <td>${formatValue("speed", row.speed)}</td>
        <td>${formatValue("support", row.support)}</td>
        <td>${formatValue("damage", row.damage)}</td>
        <td>${formatValue("recovery", row.recovery)}</td>
        <td>${formatValue("drop", row.drop)}</td>
        <td>${formatValue("dropResist", row.dropResist)}</td>
        <td>${formatValue("negativeAgility", row.negativeAgility)}</td>
      </tr>
    `
    )
    .join("");

  const top = rows[0];
  summaryText.textContent = `当前：等级 ${currentLevel} · 按「${COLUMN_LABELS[sortKey]}」${sortDesc ? "降序" : "升序"}排列 · 最高：${top.name}（${formatValue(sortKey, sortKey === "name" ? top.name : top[sortKey])}）`;
  updateSortIndicators();
}

function setSort(key, desc = sortDesc) {
  sortKey = key;
  sortDesc = desc;
  renderTable();
}

levelSelect.addEventListener("change", (event) => {
  currentLevel = Number(event.target.value);
  renderTable();
});

sortSelect.addEventListener("change", (event) => {
  setSort(event.target.value, sortDesc);
});

sortOrderBtn.addEventListener("click", () => {
  sortDesc = !sortDesc;
  renderTable();
});

tableHeaders.forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (key === sortKey) {
      sortDesc = !sortDesc;
    } else {
      sortKey = key;
      sortDesc = key === "name" ? false : true;
    }
    renderTable();
  });
});

initLevelSelect();
renderTable();
