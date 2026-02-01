/**
 * Giant Hoodies — AJAX Collection Filter Buttons
 * Intercepts filter button clicks and swaps the product grid + header
 * via Shopify's Section Rendering API (no full page reload).
 */
(function () {
  var filterNav = document.querySelector('.filter-buttons');
  if (!filterNav) return;

  // Find Shopify section IDs from the DOM wrapper elements
  var headerWrapper = document.querySelector('.collection-header-full-section[id^="shopify-section-"]');
  var gridWrapper = document.querySelector('results-list[section-id]');
  if (!headerWrapper || !gridWrapper) return;

  var headerSectionId = headerWrapper.id.replace('shopify-section-', '');
  var gridSectionId = gridWrapper.getAttribute('section-id');

  var isLoading = false;

  function fetchAndSwap(url, pushState) {
    if (isLoading) return;
    isLoading = true;

    // Visual loading feedback — fade the grid
    var gridEl = gridWrapper.closest('[id^="shopify-section-"]');
    if (gridEl) gridEl.style.opacity = '0.4';
    if (gridEl) gridEl.style.transition = 'opacity 150ms ease';

    // Build the sections request URL
    var separator = url.indexOf('?') !== -1 ? '&' : '?';
    var fetchUrl = url + separator + 'sections=' + headerSectionId + ',' + gridSectionId;

    fetch(fetchUrl, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(function (res) { return res.json(); })
      .then(function (sections) {
        // Update the header section (active button + collection title)
        if (sections[headerSectionId]) {
          var parser = new DOMParser();
          var headerDoc = parser.parseFromString(sections[headerSectionId], 'text/html');
          var newHeaderContent = headerDoc.querySelector('.collection-header-full');
          var currentHeaderContent = headerWrapper.querySelector('.collection-header-full');
          if (newHeaderContent && currentHeaderContent) {
            // Only swap filter buttons + title, keep the hero banner intact
            var newButtons = newHeaderContent.querySelector('.filter-buttons');
            var currentButtons = currentHeaderContent.querySelector('.filter-buttons');
            if (newButtons && currentButtons) {
              currentButtons.innerHTML = newButtons.innerHTML;
            }

            var newTitle = newHeaderContent.querySelector('.collection-section-header');
            var currentTitle = currentHeaderContent.querySelector('.collection-section-header');
            if (newTitle && currentTitle) {
              currentTitle.innerHTML = newTitle.innerHTML;
            }
          }
        }

        // Update the product grid section
        if (sections[gridSectionId] && gridEl) {
          var gridParser = new DOMParser();
          var gridDoc = gridParser.parseFromString(sections[gridSectionId], 'text/html');
          var newContent = gridDoc.body.children;
          gridEl.replaceChildren.apply(gridEl, Array.from(newContent));
          requestAnimationFrame(function () {
            gridEl.style.opacity = '';
            gridEl.style.transition = '';
          });
        }

        // Update browser URL
        if (pushState) {
          history.pushState({ ghFilterUrl: url }, '', url);
        }

        // Scroll to top of grid
        var scrollTarget = headerWrapper.querySelector('.filter-buttons') || headerWrapper;
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });

        isLoading = false;
      })
      .catch(function () {
        // On error, fall back to normal navigation
        if (gridEl) {
          gridEl.style.opacity = '';
          gridEl.style.transition = '';
        }
        isLoading = false;
        window.location.href = url;
      });
  }

  // Intercept filter button clicks (event delegation)
  filterNav.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-buttons__btn');
    if (!btn) return;
    e.preventDefault();
    fetchAndSwap(btn.href, true);
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.ghFilterUrl) {
      fetchAndSwap(e.state.ghFilterUrl, false);
    } else {
      // No state — user navigated back to original page, reload to be safe
      location.reload();
    }
  });

  // Store initial state so back button works from the first filter click
  history.replaceState({ ghFilterUrl: window.location.href }, '', window.location.href);
})();
