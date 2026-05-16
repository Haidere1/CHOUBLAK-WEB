# PROJECT_CONTEXT.md — Choublak Restaurant

## What It Is
React 18 + Firebase restaurant web app for **Choublak**, a Haitian restaurant. Customers browse menu, add to cart, place orders with OTP verification. Admin panel manages products and orders.

---

## Tech Stack
- React 18.3.1, React Router v6
- Firebase 10.12.5 (Firestore, Auth, Storage)
- Bootstrap 5 + React Bootstrap 2.10.2
- Styled Components 6.1.12
- React Icons 5.2.1
- react-phone-number-input 3.4.5
- AOS (Animate On Scroll) via CDN in `public/index.html`

---

## Routes
| Path | Component | Auth |
|---|---|---|
| `/` `/home` | `Home` | public |
| `/menu` | `BasicExample` (MenuPage.js) | public |
| `/aboutus` | `AboutUs` | public |
| `/cart` | `Cart` (cart2.js) | public |
| `/admin/login` | `Login` | public |
| `/orders` | `Protected(OrderPage)` | admin |
| `/addproduct` | `Protected(AddProduct)` | admin |
| `/update` | `Protected(AdminPanelPage)` | admin |

Admin check: hardcoded email `syedfaizanhaider.fh@gmail.com` in `src/Components/Admin/protected.js` and `src/Components/Admin/login.js`.

---

## Key File Map
```
src/
├── App.js                          — router
├── index.js                        — root mount, BrowserRouter
├── background/                     — all image assets
│   ├── haitibg.webp                — main hero image
│   ├── no1haiti.jpeg               — story section image
│   ├── haitifood1.jpeg             — promo banner image
│   ├── midfood.jpg / bestseller.jpg / secfood.jpg / bgmain.jpg
│   └── logo.png
├── CSS/
│   ├── home.css                    — ALL home page section styles
│   ├── navstyle.css                — customer navbar styles
│   ├── footer.css                  — beach footer styles
│   ├── menupage.css                — legacy (mostly unused now)
│   └── Home/about.css              — "Taste the Caribbean" section
├── Components/
│   ├── Home/
│   │   ├── home.js                 — home page layout
│   │   ├── tabbar.js               — customer navbar (scroll-aware, fixed)
│   │   ├── footer.js               — beach footer (FaIcons, no cdbreact)
│   │   ├── about.js                — "Taste the Caribbean" section
│   │   ├── carousel.js             — used on menu page hero (removed from home)
│   │   ├── MenuPage.js             — full menu page (Firestore)
│   │   └── icons/                  — drinks.png, main.png, sides.png (unused now)
│   ├── menu/
│   │   ├── menu.js                 — static MenuSection component (home favorites)
│   │   └── menu.css                — menu section styles
│   ├── Cart/
│   │   ├── cart2.js                — cart logic + Bootstrap modal checkout
│   │   └── cart2.css               — beach cart styles
│   ├── Products/
│   │   └── viewproduct.js          — ProductModal (styled-components)
│   ├── AboutUs/
│   │   ├── aboutus.js              — About Us page
│   │   ├── aboutus.css             — beach about us styles
│   │   ├── choublakabout.jpg       — hero image
│   │   └── haitittttii.jpg         — story image
│   └── Admin/
│       ├── login.js                — video bg login
│       ├── protected.js            — HOC auth guard
│       └── login.css
├── Backend/
│   ├── Firebase/config.js          — exports: auth, db, storage
│   └── CRUD/
│       ├── addproduct.js           — add product form (Storage upload → Firestore)
│       ├── udpanel.js              — update/delete products
│       ├── order.js                — orders panel with status control
│       └── navbar.js               — admin navbar (signOut)
```

---

## Design System

### Color Palette (defined as CSS vars in `home.css`)
```css
--ocean-deep:  #023047   /* dark sections bg, story, about, footer */
--ocean-mid:   #0096c7   /* buttons, active states */
--ocean-light: #48cae4   /* teal accent, eyebrows, icons */
--sky:         #f0f8ff   /* page background, light sections */
--sky-mid:     #e0f2fa   /* subtle borders on sky bg */
--coral:       #f4845f   /* prices, CTA buttons, accents */
--coral-dark:  #e76f51   /* hover state for coral */
--white:       #ffffff   /* cards, modal bg */
```

### Typography rules
- Headings: `font-weight: 900`, `font-style: italic` on hero/feature titles
- Eyebrows: `0.68–0.72rem`, `letter-spacing: 6–8px`, `text-transform: uppercase`
- Body on dark sections: `rgba(189,246,254,0.55)` (light teal opacity)

### Button classes (in `home.css`)
| Class | Use |
|---|---|
| `.btn-primary-beach` | coral filled, white text, rounded (50px) |
| `.btn-outline-beach` | white outline, for use on dark overlays |
| `.btn-coral-outline` | coral outline, for use on ocean-dark sections |
| `.btn-ocean-outline` | ocean navy outline, for use on light/sky sections |

---

## Home Page Section Order & Backgrounds
1. **Hero** — `haitibg.webp`, ocean gradient overlay, fixed parallax
2. **Features** — `#f0f8ff` sky, 3 white cards
3. **Who We Are** — `#023047` ocean dark, full-bleed image left, text right
   - → wave flows into promo (3-layer SVG)
4. **Promo** — `haitifood1.jpeg`, `linear-gradient(135deg, ocean 0.85)` overlay
   - → 3-layer white wave flows into featured
5. **Our Favorites** — `#f0f8ff` sky, fine-dining printed-menu layout
   - → 3-layer ocean wave flows into about section
6. **Taste the Caribbean** — `#023047` ocean dark, wave top baked into component
7. **Footer** — `#023047` ocean dark

### Wave pattern (reused throughout)
All section transitions use SVG waves with `position: absolute; bottom: -2px` inside `position: relative` sections. Class: `.flow-wave`. The wave SVG paths have 3 layers of increasing opacity ending in the target section's solid color.

---

## Menu Page (MenuPage.js)
- All styled-components (no external CSS except `menupage.css` which is mostly empty/legacy)
- Background: `#f0f8ff` sky
- Hero: `haitibg.webp`, 48vh, dark ocean overlay, coral `HeroRule`
- Category nav: pill buttons (teal active, white inactive), NOT sticky
- Cards: white, `border-radius: 20px`, soft teal shadow, hover lifts + teal border
- Price: coral `#f4845f`, Add button: coral filled circle
- Data: Firestore `collection('Products')`, split by `Category === 'Mains'` | `'Sides'`

---

## Firestore Schema
**`Products` collection:**
```
ProductName: string (unique)
ProductDescription: string
ProductPrice: number
ProductImg: string (Storage URL)
Category: "Mains" | "Sides"
Options: string[] (Mains only)
```

**`orders` collection:**
```
items: [{name, img, description, price, option, quantity}]
total: string
userDetails: {name, address, phone (E.164), email, otp}
timestamp: Timestamp
status: "OrderPlaced"|"InProgress"|"OutForDelivery"|"Delivered"
```

---

## Cart Logic
- Storage: `localStorage['cart']` as JSON array
- Cross-component sync: `window.dispatchEvent(new Event('cartUpdated'))`
- OTP: hardcoded check `otp === "1234"` (no real service)
- Checkout writes to Firestore `orders` collection

---

## Known Issues / Not Yet Done
- OTP is fake (hardcoded "1234") — no real SMS service
- Firebase config is hardcoded in `config.js` (no env vars)
- Admin email is hardcoded in two places
- Cart quantity can go to 0 without auto-removing item
- No loading spinners on Firestore fetches
- `aboutus.js` still has lorem ipsum in description (partially fixed — replaced with Haitian restaurant copy but verify)
- `cart2.js` uses Bootstrap grid classes (`col-lg-8`, `col-lg-4`) — works but not fully custom styled

---

## How to Run
```bash
npm install
npm start        # dev server on localhost:3000
npm run build    # production build
```
Firebase project ID: `infinityx-ca220`
