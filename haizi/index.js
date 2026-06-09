const ageListEl = document.getElementById("ageList");

function stageUrl(id) {
  return `stage.html?id=${encodeURIComponent(id)}`;
}

function getOpsBrief(stage) {
  if (stage.stageKind === "requirements" || stage.stageKind === "adulthood") {
    return "说明";
  }
  if (stage.id === "0-6") {
    return "12 次引导";
  }
  if (stage.yearSpan && stage.opsTotal != null) {
    return `${stage.opsTotal} 次 / 五年`;
  }
  if (stage.opsPerYear != null) {
    return `${stage.opsPerYear} 次 / 年`;
  }
  return "";
}

AGE_STAGES.forEach((stage) => {
  const link = document.createElement("a");
  link.className = "age-card";
  if (stage.stageKind) {
    link.classList.add(`age-card-${stage.stageKind}`);
  }
  link.href = stageUrl(stage.id);

  const tag = getOpsBrief(stage);
  link.innerHTML = `
    <h3 class="age-card-title">${stage.label}</h3>
    <p class="age-card-desc">${stage.goal}</p>
    ${tag ? `<span class="age-card-tag">${tag}</span>` : ""}
  `;
  ageListEl.appendChild(link);
});
