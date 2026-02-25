/**
 * Giant Hoodies — Product Page
 * Handles variant image display, color swatches,
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

    // 5a: Cache DOM references at init time
    var els = {
      priceEl: section.querySelector('[data-product-price]'),
      compareEl: section.querySelector('[data-compare-price]'),
      savingsEl: section.querySelector('[data-savings-badge]'),
      cartPriceEl: section.querySelector('[data-cart-price]'),
      stickyPriceEl: section.querySelector('[data-sticky-price]'),
      stickySavingsEl: section.querySelector('[data-sticky-savings]'),
      atcBtn: section.querySelector('[data-add-to-cart]'),
      stickyBtn: section.querySelector('[data-sticky-atc-btn]'),
      stickyBar: section.querySelector('[data-sticky-atc]'),
      variantIdInput: section.querySelector('[data-variant-id-input]'),
      selectedColorLabel: section.querySelector('[data-selected-color]'),
      productImage: section.querySelector('[data-product-image]')
    };

    initSwatches(section, variants, els, moneyFormat);
    initOptionButtons(section, variants, els, moneyFormat);
    initStickyATC(els);
    initAddToCart(section, variants, els, moneyFormat);
    initBackInStock(section);
  });

  /* =========================================
     Helpers
     ========================================= */
  function formatMoney(cents, format) {
    var amount = (cents / 100).toFixed(2);
    var amountNoDecimals = Math.round(cents / 100);
    var amountWithComma = amount.replace('.', ',');
    var f = format.replace(/\{\{\s*(\w+)\s*\}\}/g, '{{$1}}');
    return f
      .replace('{{amount_with_comma_separator}}', amountWithComma)
      .replace('{{amount_no_decimals}}', amountNoDecimals)
      .replace('{{amount_no_decimals_with_comma_separator}}', amountNoDecimals)
      .replace('{{amount}}', amount);
  }

  /* =========================================
     Update Product Image — called on variant change
     ========================================= */
  function updateProductImage(productImage, src, alt) {
    if (!src || !productImage) return;

    // Build sized URLs from base src
    var baseSrc = src.replace(/[?&]width=\d+/g, '');
    var sep = baseSrc.indexOf('?') !== -1 ? '&' : '?';
    var heroSrc = baseSrc + sep + 'width=900';
    var srcset = [400, 600, 900, 1200].map(function (w) {
      return baseSrc + sep + 'width=' + w + ' ' + w + 'w';
    }).join(', ');

    productImage.src = heroSrc;
    productImage.srcset = srcset;
    productImage.alt = alt || '';
  }

  /* =========================================
     Color Swatches
     ========================================= */
  var preloaded = {};
  function preloadVariantImage(src) {
    if (!src) return;
    var base = src.replace(/[?&]width=\d+/g, '');
    if (preloaded[base]) return;
    preloaded[base] = true;
    var s = base.indexOf('?') !== -1 ? '&' : '?';
    new Image().src = base + s + 'width=900';
    new Image().src = base + s + 'width=1200';
  }

  function initSwatches(section, variants, els, moneyFormat) {
    var swatches = section.querySelectorAll('[data-swatch]');
    if (swatches.length === 0) return;

    swatches.forEach(function (swatch) {
      // Preload variant image on hover so the click is instant
      swatch.addEventListener('pointerenter', function () {
        var colorName = this.dataset.color;
        for (var i = 0; i < variants.length; i++) {
          var v = variants[i];
          if (v.featured_image && v.featured_image.src) {
            var colorOptionIndex = parseInt(this.dataset.optionIndex, 10);
            var colorKey = 'option' + (colorOptionIndex + 1);
            if (v[colorKey] === colorName) {
              preloadVariantImage(v.featured_image.src);
              break;
            }
          }
        }
      }, { once: true });

      swatch.addEventListener('click', function () {
        var colorName = this.dataset.color;
        var optionIndex = parseInt(this.dataset.optionIndex, 10);

        // IMMEDIATE: visual swatch feedback
        swatches.forEach(function (s) {
          s.classList.remove('product__swatch--active');
          s.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('product__swatch--active');
        this.setAttribute('aria-pressed', 'true');

        // IMMEDIATE: Update label
        if (els.selectedColorLabel) {
          els.selectedColorLabel.textContent = colorName;
        }

        // Find matching variant based on all selected options
        var matchedVariant = findVariantByAllOptions(section, variants);
        if (!matchedVariant) return;

        // IMMEDIATE: Update form hidden input
        if (els.variantIdInput) {
          els.variantIdInput.value = matchedVariant.id;
        }

        // DEFERRED: heavy DOM updates
        requestAnimationFrame(function () {
          updatePriceDisplay(els, matchedVariant, moneyFormat);
          updateATCState(els, matchedVariant, moneyFormat);
          if (matchedVariant.featured_image) {
            updateProductImage(els.productImage, matchedVariant.featured_image.src, matchedVariant.featured_image.alt);
          }
          updateOptionAvailability(section, variants, optionIndex, colorName);
        });

        // LOWEST PRIORITY: URL update
        setTimeout(function () {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', matchedVariant.id);
          history.replaceState({}, '', url.toString());
        }, 0);
      });
    });
  }

  function updateOptionAvailability(section, variants, colorOptionIndex, selectedColor) {
    var optionLabels = section.querySelectorAll('[data-option-value]');
    optionLabels.forEach(function (label) {
      var input = document.getElementById(label.getAttribute('for'));
      if (!input) return;

      var optionPosition = parseInt(input.dataset.optionPosition, 10);
      var optionValue = label.dataset.optionValue;

      // Check if any variant with this option value + selected color is available
      var isAvailable = false;
      for (var i = 0; i < variants.length; i++) {
        var v = variants[i];
        var optionKey = 'option' + optionPosition;
        var colorKey = 'option' + (colorOptionIndex + 1);

        if (v[optionKey] === optionValue && v[colorKey] === selectedColor && v.available) {
          isAvailable = true;
          break;
        }
      }

      if (isAvailable) {
        label.classList.remove('product__option-btn--unavailable');
      } else {
        label.classList.add('product__option-btn--unavailable');
      }
    });
  }

  /* =========================================
     Option Buttons (Size, etc.)
     ========================================= */
  function initOptionButtons(section, variants, els, moneyFormat) {
    var optionInputs = section.querySelectorAll('[data-option-input]');
    if (optionInputs.length === 0) return;

    optionInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        // Find matching variant based on all selected options
        var matchedVariant = findVariantByAllOptions(section, variants);
        if (!matchedVariant) return;

        // IMMEDIATE: Update form hidden input
        if (els.variantIdInput) {
          els.variantIdInput.value = matchedVariant.id;
        }

        // DEFERRED: heavy DOM updates
        requestAnimationFrame(function () {
          updatePriceDisplay(els, matchedVariant, moneyFormat);
          updateATCState(els, matchedVariant, moneyFormat);
          if (matchedVariant.featured_image) {
            updateProductImage(els.productImage, matchedVariant.featured_image.src, matchedVariant.featured_image.alt);
          }
        });

        // LOWEST PRIORITY: URL update
        setTimeout(function () {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', matchedVariant.id);
          history.replaceState({}, '', url.toString());
        }, 0);
      });
    });
  }

  function findVariantByAllOptions(section, variants) {
    // Gather all selected option values
    var selectedOptions = {};

    // Get selected color from swatches
    var activeSwatch = section.querySelector('[data-swatch].product__swatch--active');
    if (activeSwatch) {
      var colorIndex = parseInt(activeSwatch.dataset.optionIndex, 10);
      selectedOptions[colorIndex] = activeSwatch.dataset.color;
    }

    // Get selected values from option radio buttons
    var checkedInputs = section.querySelectorAll('[data-option-input]:checked');
    checkedInputs.forEach(function (input) {
      var position = parseInt(input.dataset.optionPosition, 10);
      selectedOptions[position - 1] = input.value;
    });

    // Find variant that matches all selected options
    var available = null;
    var any = null;

    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      var matches = true;

      for (var optIdx in selectedOptions) {
        var optionKey = 'option' + (parseInt(optIdx, 10) + 1);
        if (v[optionKey] !== selectedOptions[optIdx]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        if (!any) any = v;
        if (v.available && !available) available = v;
      }
    }

    return available || any;
  }

  // 5b: Use class toggles instead of style.display
  function updatePriceDisplay(els, variant, moneyFormat) {
    var compareAt = variant.compare_at_price;
    var savings = compareAt && compareAt > variant.price ? compareAt - variant.price : 0;

    if (els.priceEl) {
      els.priceEl.textContent = formatMoney(variant.price, moneyFormat);
    }

    if (savings > 0) {
      if (els.compareEl) {
        els.compareEl.textContent = formatMoney(compareAt, moneyFormat);
        els.compareEl.classList.remove('hidden');
      }
      if (els.savingsEl) {
        els.savingsEl.textContent = 'Save ' + formatMoney(savings, moneyFormat);
        els.savingsEl.classList.remove('hidden');
      }
      if (els.stickySavingsEl) {
        els.stickySavingsEl.textContent = 'Save ' + formatMoney(savings, moneyFormat);
        els.stickySavingsEl.classList.remove('hidden');
      }
    } else {
      if (els.compareEl) els.compareEl.classList.add('hidden');
      if (els.savingsEl) els.savingsEl.classList.add('hidden');
      if (els.stickySavingsEl) els.stickySavingsEl.classList.add('hidden');
    }

    if (els.cartPriceEl) {
      els.cartPriceEl.textContent = formatMoney(variant.price, moneyFormat);
    }

    if (els.stickyPriceEl) {
      els.stickyPriceEl.textContent = formatMoney(variant.price, moneyFormat);
    }
  }

  // 5d: Fast-path price span update instead of recreating button DOM
  function updateATCState(els, variant, moneyFormat) {
    if (els.atcBtn) {
      if (variant.available) {
        els.atcBtn.disabled = false;
        var priceSpan = els.atcBtn.querySelector('[data-cart-price]');
        if (priceSpan) {
          // Fast path: just update the price text
          priceSpan.textContent = formatMoney(variant.price, moneyFormat);
        } else {
          // Rebuild after sold-out state wiped the span
          els.atcBtn.textContent = 'Add to Cart \u2014 ';
          var span = document.createElement('span');
          span.setAttribute('data-cart-price', '');
          span.textContent = formatMoney(variant.price, moneyFormat);
          els.atcBtn.appendChild(span);
        }
      } else {
        els.atcBtn.disabled = true;
        els.atcBtn.textContent = 'Sold Out';
      }
    }

    if (els.stickyBtn) {
      if (variant.available) {
        els.stickyBtn.disabled = false;
        els.stickyBtn.textContent = 'Add to Cart';
      } else {
        els.stickyBtn.disabled = true;
        els.stickyBtn.textContent = 'Sold Out';
      }
    }
  }

  /* =========================================
     Sticky Add to Cart (Mobile)
     ========================================= */
  function initStickyATC(els) {
    if (!els.atcBtn || !els.stickyBar) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            els.stickyBar.classList.remove('product__sticky-atc--visible');
          } else {
            els.stickyBar.classList.add('product__sticky-atc--visible');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(els.atcBtn);

    if (els.stickyBtn) {
      els.stickyBtn.addEventListener('click', function () {
        if (els.atcBtn && !els.atcBtn.disabled) {
          els.atcBtn.click();
        }
      });
    }
  }

  /* =========================================
     AJAX Add to Cart
     ========================================= */
  function initAddToCart(section, variants, els, moneyFormat) {
    var form = section.querySelector('[data-product-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var variantId = els.variantIdInput ? els.variantIdInput.value : '';
      var qtyInput = form.querySelector('[data-quantity-input]');
      var quantity = qtyInput ? qtyInput.value : '1';

      if (els.atcBtn) {
        els.atcBtn.disabled = true;
        var priceSpan = els.atcBtn.querySelector('[data-cart-price]');
        if (priceSpan) els.atcBtn.dataset.originalPrice = priceSpan.textContent;
        els.atcBtn.textContent = 'Adding...';
      }
      if (els.stickyBtn) {
        els.stickyBtn.disabled = true;
      }

      var formData = new FormData();
      formData.set('id', variantId);
      formData.set('quantity', quantity);

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
            var msg = data.description || data.message || 'Could not add to cart';
            showATCError(section, msg);
            restoreATCButton(els, variants, moneyFormat);
            return;
          }

          // 5f: Show "Added!" FIRST for instant visual feedback
          if (els.atcBtn) els.atcBtn.textContent = 'Added!';
          if (els.stickyBtn) els.stickyBtn.textContent = 'Added!';

          // Then dispatch cart:update in the next frame
          requestAnimationFrame(function () {
            document.dispatchEvent(new CustomEvent('cart:update', {
              bubbles: true,
              detail: {
                resource: data,
                sourceId: 'product-main',
                data: {
                  source: 'product-main',
                  itemCount: parseInt(quantity, 10),
                  productId: section.dataset.productId,
                  sections: data.sections || {}
                }
              }
            }));
          });

          setTimeout(function () {
            restoreATCButton(els, variants, moneyFormat);
          }, 1500);
        })
        .catch(function (err) {
          console.error('[GH] Add to cart error:', err);
          showATCError(section, 'Something went wrong. Please try again.');
          restoreATCButton(els, variants, moneyFormat);
        });
    });
  }

  // 5e: Use variants from closure instead of re-parsing JSON
  function restoreATCButton(els, variants, moneyFormat) {
    var currentId = els.variantIdInput ? els.variantIdInput.value : null;
    var currentVariant = null;
    for (var i = 0; i < variants.length; i++) {
      if (String(variants[i].id) === String(currentId)) {
        currentVariant = variants[i];
        break;
      }
    }

    if (els.atcBtn) {
      if (currentVariant && !currentVariant.available) {
        els.atcBtn.disabled = true;
        els.atcBtn.textContent = 'Sold Out';
      } else {
        els.atcBtn.disabled = false;
        var price = currentVariant
          ? formatMoney(currentVariant.price, moneyFormat)
          : els.atcBtn.dataset.originalPrice || '';
        els.atcBtn.textContent = 'Add to Cart \u2014 ';
        var span = document.createElement('span');
        span.setAttribute('data-cart-price', '');
        span.textContent = price;
        els.atcBtn.appendChild(span);
      }
      delete els.atcBtn.dataset.originalPrice;
    }
    if (els.stickyBtn) {
      els.stickyBtn.disabled = false;
      els.stickyBtn.textContent = 'Add to Cart';
    }
  }

  function showATCError(section, message) {
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

  /* =========================================
     Back in Stock Form
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

      fetch('https://a.klaviyo.com/client/back-in-stock-subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'revision': '2024-10-15',
          'X-Klaviyo-Company': 'PwepKm'
        },
        body: JSON.stringify({
          data: {
            type: 'back-in-stock-subscription',
            attributes: {
              channels: ['EMAIL'],
              profile: {
                data: {
                  type: 'profile',
                  attributes: { email: data.email }
                }
              }
            },
            relationships: {
              variant: {
                data: {
                  type: 'catalog-variant',
                  id: '$shopify:::$default:::' + data.variant_id
                }
              }
            }
          }
        })
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Subscription request failed');
          var wrapper = form.closest('.product__back-in-stock-wrapper');
          if (wrapper) {
            var successEl = wrapper.querySelector('.product__back-in-stock-success');
            if (successEl) successEl.style.display = 'block';
            form.style.display = 'none';
          }
        })
        .catch(function (err) {
          console.error('[GH] Back in stock error:', err);
        });
    });
  }
})();
