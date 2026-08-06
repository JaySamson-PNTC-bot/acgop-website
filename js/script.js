document.addEventListener('DOMContentLoaded', function () {
  var pc = document.querySelector('.promo-close');
  if (pc) pc.addEventListener('click', function () {
    this.closest('.promo-bar').style.display = 'none';
  });

  // testimonial arrows are decorative placeholders (single testimonial in design)
  document.querySelectorAll('.testi-arrow').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
});
