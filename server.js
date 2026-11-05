const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Public key is safe to expose to the browser. Never expose the secret key.
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.PAYSTACK_PUBLIC_KEY=${JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY || '')};`);
});

// Server-side check that a payment really succeeded
app.get('/api/verify/:reference', async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return res.status(500).json({ ok: false, error: 'Secret key not set' });
  try {
    const r = await fetch(
      'https://api.paystack.co/transaction/verify/' + encodeURIComponent(req.params.reference),
      { headers: { Authorization: 'Bearer ' + secret } }
    );
    const d = await r.json();
    res.json({ ok: d.status && d.data && d.data.status === 'success', status: d.data && d.data.status });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'Could not reach Paystack' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Swift Tech running on port ' + PORT));
