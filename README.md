# Swift Tech – landing and payment page

Express app serving a static landing page with a Paystack payment form (GHS).

## 1. Push to GitHub
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/swift-tech.git
git push -u origin main
```

## 2. Deploy on Railway
1. railway.app > New Project > Deploy from GitHub repo > pick this repo.
2. Open the service > Variables, add:
   - `PAYSTACK_PUBLIC_KEY` = your `pk_test_...` (later `pk_live_...`)
   - `PAYSTACK_SECRET_KEY` = your `sk_test_...` (later `sk_live_...`)
3. Settings > Networking > Generate Domain.
4. Put that URL as your website in Paystack (Settings > Business profile / Compliance).

## 3. Before submitting to Paystack
Edit `public/index.html`: replace the email, phone and address placeholders in the Contact section and footer with real details.

## Local run
```
npm install
PAYSTACK_PUBLIC_KEY=pk_test_xxx PAYSTACK_SECRET_KEY=sk_test_xxx npm start
```
