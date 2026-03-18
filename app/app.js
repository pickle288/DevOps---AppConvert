const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

const EXCHANGE_RATES = {
  EUR: { USD: 1.08, GBP: 0.86, CHF: 0.94 },
  USD: { EUR: 0.93, GBP: 0.80, CHF: 0.87 },
  GBP: { EUR: 1.16, USD: 1.25, CHF: 1.09 },
  CHF: { EUR: 1.06, USD: 1.15, GBP: 0.92 },
};

app.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return res.status(400).json({ error: 'Montant invalide' });
  }

  const fromU = from.toUpperCase();
  const toU = to.toUpperCase();

  if (!EXCHANGE_RATES[fromU] || !EXCHANGE_RATES[fromU][toU]) {
    return res.status(400).json({ error: 'Paire de devises non supportée' });
  }

  const rate = EXCHANGE_RATES[fromU][toU];
  const converted = Math.round(amountNum * rate * 100) / 100;

  res.json({
    success: true,
    converted,
  });
});

// 👉 indispensable pour Jest
module.exports = app;
