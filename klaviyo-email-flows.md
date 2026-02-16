# Klaviyo Email Flows — Giant Hoodies

Reference doc for building abandon cart and abandon checkout flows in Klaviyo.
Klaviyo dynamic variables are shown in `{{ double_braces }}`.

---

## Flow 1: Abandoned Cart

**Trigger:** Added to Cart metric
**CTA link for all emails:** `{{ event.CheckoutURL }}`
(This lands them on the homepage with cart drawer open)

**Exit conditions:**
- Placed Order
- Started Checkout (moves them to the checkout flow instead)

---

### Email 1 — The Gentle Nudge
**Send:** 1 hour after trigger
**Subject:** You left something cozy behind
**Preview:** Your Giant Hoodie is waiting for you

**Body:**

Hey{{ person.first_name|default:'' }}{% if person.first_name %},{% endif %}

You were *this close* to the comfiest hoodie you'll ever own.

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]

**{{ item.ProductName }}**
${{ item.ItemPrice }}

{% endfor %}

225,000+ people already know what it feels like. It's like wearing a hug.

[BUTTON] **Grab Your Hoodie** → `{{ event.CheckoutURL }}`

Free shipping on orders $75+ | 30-Day Guarantee | Made in USA

---

### Email 2 — The Social Proof Push
**Send:** 24 hours after trigger
**Subject:** 225,000 people can't be wrong
**Preview:** Here's what the Hoodie Fam says about theirs

**Body:**

Still thinking about it?

We get it. Here's what people say after they actually try one:

> "It's like wearing a hug." — Grace

> "I wear mine EVERYWHERE — the gym, the gas station, the laundromat, on a plane, and I get so many compliments!" — Andrea

> "This is my third Giant Hoodie and I couldn't be more in love." — Grace

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]
**{{ item.ProductName }}** — ${{ item.ItemPrice }}
{% endfor %}

Our return rate is less than 1%. The average apparel brand? 21%. We'll let that speak for itself.

And if you're not completely in love, our **30-Day "Best Hoodie Ever" Guarantee** has you covered. No risk.

[BUTTON] **Get Your Hoodie** → `{{ event.CheckoutURL }}`

---

### Email 3 — The Volume Pricing Angle
**Send:** 48 hours after trigger
**Subject:** Quick math: more hoodies = more savings
**Preview:** Buy 2 save $60. Buy 3+ save $108+.

**Body:**

Your hoodie is still in your cart — but here's something you might not know.

**Buy 2 hoodies → save $60 total**
**Buy 3+ hoodies → save $108+**

Mix and match any designs and colors. Every hoodie is printed by hand at our shop in Arkansas, and we include a handwritten thank-you card in every order.

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]
**{{ item.ProductName }}** — ${{ item.ItemPrice }}
{% endfor %}

Most customers come back for a second one within 30 days. Just saying.

[BUTTON] **Complete Your Order** → `{{ event.CheckoutURL }}`

Free shipping on orders $75+

---
---

## Flow 2: Abandoned Checkout

**Trigger:** Started Checkout metric (Shopify server-side)
**CTA link for all emails:** `{{ event.extra.abandoned_checkout_url }}`
(This takes them directly back to their Shopify checkout session)

**Exit conditions:**
- Placed Order

---

### Email 1 — Your Checkout Is Waiting
**Send:** 1 hour after trigger
**Subject:** Your order is almost done
**Preview:** We saved your checkout — pick up right where you left off

**Body:**

Hey{{ person.first_name|default:'' }}{% if person.first_name %},{% endif %}

You were almost there! Your checkout is saved and ready to go.

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]

**{{ item.ProductName }}**
${{ item.ItemPrice }} x {{ item.Quantity }}

{% endfor %}

**Cart total: ${{ event.$value }}**

Just click below to pick up right where you left off. Your shipping info is still there.

[BUTTON] **Complete Checkout** → `{{ event.extra.abandoned_checkout_url }}`

---

### Email 2 — We've Got You Covered
**Send:** 24 hours after trigger
**Subject:** Still on the fence? You're covered.
**Preview:** 30-day guarantee, free shipping $75+, and made in the USA

**Body:**

We know buying online can feel uncertain. So here's everything we do to make sure you love your Giant Hoodie:

**30-Day "Best Hoodie Ever" Guarantee**
Not happy? We'll make it right. No hoops.

**Made in the USA**
Every hoodie is printed and packed by hand at our shop in Arkansas. We even include a handwritten thank-you card.

**Crazy-Fast Shipping**
Most orders ship same or next business day. Free on orders $75+.

**Less than 1% of orders are returned.** The industry average is 21%. Our customers just really, really love these hoodies.

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]
**{{ item.ProductName }}** — ${{ item.ItemPrice }}
{% endfor %}

Your checkout is still saved.

[BUTTON] **Finish Your Order** → `{{ event.extra.abandoned_checkout_url }}`

---

### Email 3 — Last Nudge
**Send:** 48 hours after trigger
**Subject:** Your hoodie is getting lonely
**Preview:** Your saved checkout won't last forever

**Body:**

Hey{{ person.first_name|default:'' }}{% if person.first_name %},{% endif %}

Your checkout is still saved, but it won't be around forever.

{% for item in event.Items %}
[PRODUCT IMAGE: {{ item.ImageURL }}]
**{{ item.ProductName }}** — ${{ item.ItemPrice }}
{% endfor %}

We've shipped to 225,000+ happy customers since 2020. Every hoodie is made by hand in the USA. And if you don't absolutely love it, our 30-day guarantee means zero risk.

One click and it's on its way to you.

[BUTTON] **Complete Checkout** → `{{ event.extra.abandoned_checkout_url }}`

---
---

## Building These in Klaviyo

### Layout Tips
- **Keep it simple.** One column, centered. No complex multi-column layouts.
- **Product image block** should be 300-400px wide, centered.
- **Button** should be full-width or at least 250px, using your brand colors (Espresso #3d3028 background, white text, or Terracotta #c4704b background, white text).
- **Font:** Use DM Sans (or fallback to Arial/Helvetica) for body. 16px body, 14px footer.
- **Background:** Cream #faf7f4 for email body, white #ffffff for content area.

### Dynamic Product Block
In Klaviyo's email builder, use a **"Dynamic Table"** or **"Product Block"** fed by `{{ event.Items }}` to automatically show the customer's cart items with images, names, and prices. This replaces the `{% for item %}` loops above.

### Footer for All Emails
Giant Hoodies
Your New Favorite Oversized Hoodie
Printed by hand in Arkansas, USA

[Unsubscribe] | [Manage Preferences]

### Klaviyo Variable Reference

| Variable | What It Is | Used In |
|----------|-----------|---------|
| `{{ person.first_name }}` | Customer's first name | Greeting |
| `{{ event.Items }}` | Array of cart/checkout items | Product blocks |
| `{{ event.Items.0.ProductName }}` | First item's name | Subject lines |
| `{{ event.Items.0.ImageURL }}` | First item's image | Product blocks |
| `{{ event.Items.0.ItemPrice }}` | First item's price | Product blocks |
| `{{ event.Items.0.ProductURL }}` | First item's URL | Product links |
| `{{ event.$value }}` | Total cart value | Cart total display |
| `{{ event.CheckoutURL }}` | Cart recovery URL (drawer) | Abandon Cart CTA |
| `{{ event.extra.abandoned_checkout_url }}` | Shopify checkout recovery | Abandon Checkout CTA |
