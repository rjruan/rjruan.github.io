function renderMediumProjectTemplate(escapeHtml) {
  const fields = [
    "Overview",
    "Problem",
    "Role",
    "Selected process",
    "Outcome",
    "Learning"
  ];

  return `<article class="template-panel">
    <p class="eyebrow">Reusable Template</p>
    <h2>Medium Project</h2>
    <p>${escapeHtml(
      "Use this structure when a project is meaningful but does not need the full deep case-study treatment."
    )}</p>
    <ul class="template-list">
      ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join("")}
    </ul>
  </article>`;
}

module.exports = {
  renderMediumProjectTemplate
};
