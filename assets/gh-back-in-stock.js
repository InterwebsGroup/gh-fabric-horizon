/**
 * Giant Hoodies - Back in Stock form handler
 * Captures email signups for sold-out variants.
 * Ready for Klaviyo integration — replace the console.log with an API call.
 */
(function () {
  if (window.__ghBackInStockInit) return;
  window.__ghBackInStockInit = true;

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches('[data-back-in-stock-form]')) return;
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
        // Show success, hide form
        var wrapper = form.closest('.gh-back-in-stock__form-wrapper');
        if (wrapper) {
          var successEl = wrapper.querySelector('.gh-back-in-stock__success');
          if (successEl) successEl.style.display = 'block';
          form.style.display = 'none';
        }
      })
      .catch(function (err) {
        console.error('[GH] Back in stock error:', err);
      });
  });
})();
