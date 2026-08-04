function renderFieldNote(note, escapeHtml) {
  const related = note.relatedProjectSlug
    ? `<a class="text-link" href="/expeditions/${note.relatedProjectSlug}/">${escapeHtml(
        note.relatedExpedition
      )}</a>`
    : `<span>${escapeHtml(note.relatedExpedition)}</span>`;

  return `<article class="field-note-card">
    <div class="meta-row">
      <span>${escapeHtml(note.date)}</span>
      <span>${escapeHtml(note.topic)}</span>
    </div>
    <h2>${escapeHtml(note.title)}</h2>
    <dl class="note-fields">
      <div>
        <dt>Context</dt>
        <dd>${escapeHtml(note.context)}</dd>
      </div>
      <div>
        <dt>Observation</dt>
        <dd>${escapeHtml(note.observation)}</dd>
      </div>
      <div>
        <dt>Interpretation</dt>
        <dd>${escapeHtml(note.interpretation)}</dd>
      </div>
      <div>
        <dt>Related expedition</dt>
        <dd>${related}</dd>
      </div>
    </dl>
    <div class="open-questions">
      <p class="eyebrow">Open Questions</p>
      <ul class="question-list">
        ${note.openQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
      </ul>
    </div>
  </article>`;
}

function renderFieldNoteTemplate(escapeHtml) {
  const fields = [
    "Title",
    "Date",
    "Inquiry or topic",
    "Context",
    "Observation",
    "Interpretation",
    "Open questions",
    "Related expedition"
  ];

  return `<article class="template-panel">
    <p class="eyebrow">Reusable Template</p>
    <h2>Field Note</h2>
    <p>${escapeHtml(
      "Use this structure for research observations, process reflections, experiments, accessibility notes, or questions being investigated."
    )}</p>
    <ul class="template-list">
      ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join("")}
    </ul>
  </article>`;
}

module.exports = {
  renderFieldNote,
  renderFieldNoteTemplate
};
