function renderGalleryTemplate(item, escapeHtml) {
  const detailPath =
    typeof item.detailPath === "string" ? item.detailPath.trim() : "";
  const detailLink =
    detailPath && detailPath !== "#"
      ? `<p class="card-action"><a class="text-link" href="${escapeHtml(
          detailPath
        )}">View ${escapeHtml(item.title)} details</a></p>`
      : "";
  const visual = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}">`
    : `<div class="gallery-placeholder" role="img" aria-label="${escapeHtml(
        item.alt
      )}"><span>Image TBD</span></div>`;

  return `<article class="gallery-item">
    ${visual}
    <div class="gallery-copy">
      <div class="meta-row">
        <span>${escapeHtml(item.category)}</span>
        <span>${escapeHtml(item.year)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.caption)}</p>
      <p class="meta-text">Role: ${escapeHtml(item.role)}</p>
      ${detailLink}</div>
  </article>`;
}

module.exports = {
  renderGalleryTemplate
};
