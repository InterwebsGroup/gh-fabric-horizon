/**
 * Giant Hoodies — Product Page
 * Handles image gallery, color swatches,
 * sticky ATC bar, and AJAX add-to-cart with cart drawer integration.
 */
(function () {
  if (window.__ghProductPageInit) return;
  window.__ghProductPageInit = true;

  document.addEventListener('DOMContentLoaded', function () {
    var section = document.querySelector('[data-product-main]');
    if (!section) return;

    var variants = [];
    var variantsEl = section.querySelector('[data-product-variants]');
    if (variantsEl) {
      try {
        variants = JSON.parse(variantsEl.textContent);
      } catch (e) {
        console.warn('[GH] Could not parse variant data');
      }
    }

    var moneyFormat = section.dataset.moneyFormat || '${{amount}}';

    initGallery(section);
    initSwatches(section, variants);
    initStickyATC(section);
    initAddToCart(section, variants);
    initBackInStock(section);
  });

  /* =========================================
     Helpers
     ========================================= */
  function formatMoney(cents, format) {
    var amount = (cents / 100).toFixed(2);
    var amountNoDecimals = Math.round(cents / 100);
    var amountWithComma = amount.replace('.', ',');
    return format
      .replace('{{amount_with_comma_separator}}', amountWithComma)
      .replace('{{amount_no_decimals}}', amountNoDecimals)
      .replace('{{amount_no_decimals_with_comma_separator}}', amountNoDecimals)
      .replace('{{amount}}', amount);
  }

  /* =========================================
     1. Image Gallery
     ========================================= */
  function initGallery(section) {
    var slidesContainer = section.querySelector('[data-gallery-slides]');
    if (!slidesContainer) return;

    var slides = slidesContainer.querySelectorAll('[data-gallery-slide]');
    var dots = section.querySelectorAll('[data-gallery-dot]');
    var thumbs = section.querySelectorAll('[data-gallery-thumb]');

    if (slides.length <= 1) return;

    // Desktop: click thumbnail to scroll to image
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var index = parseInt(this.dataset.index, 10);
        scrollToSlide(index);
        setActiveThumb(index);
      });
    });

    // Mobile: click dot to scroll
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.dataset.index, 10);
        scrollToSlide(index);
      });
    });

    // Track scroll position for dot/thumb updates
    var scrollTimeout;
    slidesContainer.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var scrollLeft = slidesContainer.scrollLeft;
        var slideWidth = slidesContainer.offsetWidth;
        var currentIndex = Math.round(scrollLeft / slideWidth);
        setActiveDot(currentIndex);
        setActiveThumb(currentIndex);
      }, 50);
    });

    function scrollToSlide(index) {
      var slideWidth = slidesContainer.offsetWidth;
      slidesContainer.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('product-gallery__dot--active', i === index);
      });
    }

    function setActiveThumb(index) {
      thumbs.forEach(function (thumb, i) {
        thumb.classList.toggle('product-gallery__thumb--active', i === index);
      });
    }

    // Expose scrollToMedia for swatch integration
    section.__ghGalleryScrollToMedia = function (mediaId) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].dataset.mediaId === String(mediaId)) {
          scrollToSlide(i);
          setActiveThumb(i);
          setActiveDot(i);
          return;
        }
      }
    };
  }

  /* =========================================
     2. Color Swatches
     ========================================= */
  function initSwatches(section, variants) {
    var swatches = section.querySelectorAll('[data-swatch]');
    if (swatches.length === 0) return;

    var variantIdInput = section.querySelector('[data-variant-id-input]');
    var selectedColorLabel = section.querySelector('[data-selected-color]');
    var moneyFormat = section.dataset.moneyFormat || '${{amount}}';

    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        var colorName = this.dataset.color;
        var optionIndex = parseInt(this.dataset.optionIndex, 10);

        // Update active state
        swatches.forEach(function (s) {
          s.classList.remove('product__swatch--active');
          s.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('product__swatch--active');
        this.setAttribute('aria-pressed', 'true');

        // Update label
        if (selectedColorLabel) {
          selectedColorLabel.textContent = colorName;
        }

        // Find matching variant
        var matchedVariant = findVariantByOption(variants, optionIndex, colorName);
        if (!matchedVariant) return;

        // Update form
        if (variantIdInput) {
          variantIdInput.value = matchedVariant.id;
        }

        // Update URL
        var url = new URL(window.location.href);
        url.searchParams.set('variant', matchedVariant.id);
        history.replaceState({}, '', url.toString());

        // Update price display
        updatePriceDisplay(section, matchedVariant, moneyFormat);

        // Update ATC button state
        updateATCState(section, matchedVariant, moneyFormat);

        // Scroll gallery to variant's featured media
        if (matchedVariant.featured_media && section.__ghGalleryScrollToMedia) {
          section.__ghGalleryScrollToMedia(matchedVariant.featured_media.id);
        }
      });
    });
  }

  function findVariantByOption(variants, optionIndex, optionValue) {
    // Find first available variant matching the selected option
    var available = null;
    var any = null;
    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      var optionKey = 'option' + (optionIndex + 1);
      if (v[optionKey] === optionValue) {
        if (!any) any = v;
        if (v.available && !available) available = v;
      }
    }
    return available || any;
  }

  function updatePriceDisplay(section, variant, moneyFormat) {
    var priceEl = section.querySelector('[data-product-price]');
    var compareEl = section.querySelector('[data-compare-price]');
    var savingsEl = section.querySelector('[data-savings-badge]');
    var cartPriceEl = section.querySelector('[data-cart-price]');
    var stickyPriceEl = section.querySelector('[data-sticky-price]');
    var stickySavingsEl = section.querySelector('[data-sticky-savings]');

    // Compare-at price with +$20 fallback for testing display
    var compareAt = variant.compare_at_price;
    if (!compareAt || compareAt <= variant.price) {
      compareAt = variant.price + 2000;
    }
    var savings = compareAt - variant.price;

    if (priceEl) {
      priceEl.textContent = formatMoney(variant.price, moneyFormat);
    }

    if (savings > 0) {
      if (compareEl) {
        compareEl.textContent = formatMoney(compareAt, moneyFormat);
        compareEl.style.display = '';
      }
      if (savingsEl) {
        savingsEl.textContent = 'Save ' + formatMoney(savings, moneyFormat);
        savingsEl.style.display = '';
      }
      if (stickySavingsEl) {
        stickySavingsEl.textContent = 'Save ' + formatMoney(savings, moneyFormat);
        stickySavingsEl.style.display = '';
      }
    } else {
      if (compareEl) compareEl.style.display = 'none';
      if (savingsEl) savingsEl.style.display = 'none';
      if (stickySavingsEl) stickySavingsEl.style.display = 'none';
    }

    if (cartPriceEl) {
      cartPriceEl.textContent = formatMoney(variant.price, moneyFormat);
    }

    if (stickyPriceEl) {
      stickyPriceEl.textContent = formatMoney(variant.price, moneyFormat);
    }
  }

  function updateATCState(section, variant, moneyFormat) {
    var atcBtn = section.querySelector('[data-add-to-cart]');
    var stickyBtn = section.querySelector('[data-sticky-atc-btn]');

    if (atcBtn) {
      if (variant.available) {
        atcBtn.disabled = false;
        var cartPriceSpan = atcBtn.querySelector('[data-cart-price]');
        if (cartPriceSpan) {
          atcBtn.innerHTML = 'Add to Cart &mdash; <span data-cart-price>' + formatMoney(variant.price, moneyFormat) + '</span>';
        } else {
          atcBtn.textContent = 'Add to Cart';
        }
      } else {
        atcBtn.disabled = true;
        atcBtn.textContent = 'Sold Out';
      }
    }

    if (stickyBtn) {
      if (variant.available) {
        stickyBtn.disabled = false;
        stickyBtn.textContent = 'Add to Cart';
      } else {
        stickyBtn.disabled = true;
        stickyBtn.textContent = 'Sold Out';
      }
    }
  }

  /* =========================================
     3. Sticky Add to Cart (Mobile)
     ========================================= */
  function initStickyATC(section) {
    var mainATC = section.querySelector('[data-add-to-cart]');
    var stickyBar = section.querySelector('[data-sticky-atc]');

    if (!mainATC || !stickyBar) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyBar.classList.remove('product__sticky-atc--visible');
          } else {
            stickyBar.classList.add('product__sticky-atc--visible');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(mainATC);

    // Sticky button clicks the main ATC button to trigger form submission
    var stickyBtn = stickyBar.querySelector('[data-sticky-atc-btn]');
    if (stickyBtn) {
      stickyBtn.addEventListener('click', function () {
        var submitBtn = section.querySelector('[data-add-to-cart]');
        if (submitBtn && !submitBtn.disabled) {
          submitBtn.click();
        }
      });
    }
  }

  /* =========================================
     4. AJAX Add to Cart
     ========================================= */
  function initAddToCart(section, variants) {
    var form = section.querySelector('[data-product-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var atcBtn = section.querySelector('[data-add-to-cart]');
      var stickyBtn = section.querySelector('[data-sticky-atc-btn]');
      var variantId = form.querySelector('[data-variant-id-input]').value;
      var qtyInput = form.querySelector('[data-quantity-input]');
      var quantity = qtyInput ? qtyInput.value : '1';

      // Disable buttons during request
      if (atcBtn) {
        atcBtn.disabled = true;
        atcBtn.dataset.originalText = atcBtn.innerHTML;
        atcBtn.textContent = 'Adding...';
      }
      if (stickyBtn) {
        stickyBtn.disabled = true;
      }

      var formData = new FormData();
      formData.set('id', variantId);
      formData.set('quantity', quantity);

      // Include cart section IDs for live updating
      var cartSectionIds = [];
      document.querySelectorAll('cart-items-component').forEach(function (el) {
        if (el.dataset.sectionId) {
          cartSectionIds.push(el.dataset.sectionId);
        }
      });
      if (cartSectionIds.length > 0) {
        formData.set('sections', cartSectionIds.join(','));
      }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.status) {
            // Error from Shopify
            var msg = data.description || data.message || 'Could not add to cart';
            showATCError(section, msg);
            restoreATCButton(section, atcBtn, stickyBtn);
            return;
          }

          // Success: update cart count
          updateCartCount();

          // Dispatch event to open cart drawer
          var event = new Event('cart:update', { bubbles: true });
          event.detail = {
            resource: data,
            sourceId: 'product-main',
            data: {
              source: 'product-main',
              itemCount: parseInt(quantity, 10),
              productId: section.dataset.productId,
              sections: data.sections || {}
            }
          };
          document.dispatchEvent(event);

          // Restore button after brief delay
          setTimeout(function () {
            restoreATCButton(section, atcBtn, stickyBtn);
          }, 1000);
        })
        .catch(function (err) {
          console.error('[GH] Add to cart error:', err);
          showATCError(section, 'Something went wrong. Please try again.');
          restoreATCButton(section, atcBtn, stickyBtn);
        });
    });
  }

  function restoreATCButton(section, atcBtn, stickyBtn) {
    if (atcBtn && atcBtn.dataset.originalText) {
      atcBtn.innerHTML = atcBtn.dataset.originalText;
      atcBtn.disabled = false;
      delete atcBtn.dataset.originalText;
    }
    if (stickyBtn) {
      stickyBtn.disabled = false;
    }
  }

  function showATCError(section, message) {
    // Remove existing error
    var existing = section.querySelector('.product__atc-error');
    if (existing) existing.remove();

    var errorEl = document.createElement('p');
    errorEl.className = 'product__atc-error';
    errorEl.textContent = message;
    errorEl.style.cssText =
      'color: #c0392b; font-size: 0.85rem; margin: 8px 0 0; font-weight: 500;';

    var atcBtn = section.querySelector('[data-add-to-cart]');
    if (atcBtn && atcBtn.parentNode) {
      atcBtn.parentNode.insertBefore(errorEl, atcBtn.nextSibling);
    }

    setTimeout(function () {
      if (errorEl.parentNode) errorEl.remove();
    }, 5000);
  }

  function updateCartCount() {
    fetch('/cart.js', {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (cart) {
        // Update any cart count badges in the header
        document.querySelectorAll('[data-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
        });
        // Also try the Fabric-specific cart count element
        document
          .querySelectorAll('.cart-count, .header__cart-count, [data-header-cart-count]')
          .forEach(function (el) {
            el.textContent = cart.item_count;
            if (cart.item_count > 0) {
              el.style.display = '';
            }
          });
      })
      .catch(function () {
        // Non-critical — cart drawer will show correct count
      });
  }

  /* =========================================
     5. Back in Stock Form
     ========================================= */
  function initBackInStock(section) {
    var form = section.querySelector('[data-back-in-stock-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = form.querySelector('input[name="email"]').value;
      var productId = form.querySelector('input[name="product_id"]').value;
      var variantId = form.querySelector('input[name="variant_id"]').value;

      var data = {
        email: email,
        product_id: productId,
        variant_id: variantId,
        timestamp: new Date().toISOString()
      };

      // TODO: Replace with Klaviyo API call when ready
      console.log('[GH Back in Stock] Signup:', data);

      // Show success, hide form
      var wrapper = form.closest('.product__back-in-stock-wrapper');
      if (wrapper) {
        var successEl = wrapper.querySelector('.product__back-in-stock-success');
        if (successEl) successEl.style.display = 'block';
        form.style.display = 'none';
      }
    });
  }
})();
