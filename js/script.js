document.addEventListener('DOMContentLoaded', function () {
  // Insert current year into footer spans
  const year = new Date().getFullYear();
  ['year', 'year-case', 'year-privacy'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });
});
