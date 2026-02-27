const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Taux de change fixes
const EXCHANGE_RATES = {
  EUR: { USD: 1.08, GBP: 0.86, CHF: 0.94 },
  USD: { EUR: 0.93, GBP: 0.80, CHF: 0.87 },
  GBP: { EUR: 1.16, USD: 1.25, CHF: 1.09 },
  CHF: { EUR: 1.06, USD: 1.15, GBP: 0.92 }
};

// 🧪 ENDPOINT PRINCIPAL
app.get('/convert', async (req, res) => {
  try {
    const { amount, from: fromRaw, to: toRaw } = req.query;

    // Validation
    if (!amount || !fromRaw || !toRaw) {
      return res.status(400).json({
        error: 'Paramètres manquants',
        required: 'amount, from, to'
      });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    const from = fromRaw.toUpperCase();  // ✅ RENVOMMÉE
    const to = toRaw.toUpperCase();      // ✅ RENVOMMÉE

    // Vérification devises
    if (!EXCHANGE_RATES[from] || !EXCHANGE_RATES[from][to]) {
      return res.status(400).json({
        error: 'Paire de devises non supportée',
        supported: Object.keys(EXCHANGE_RATES)
      });
    }

    // Conversion
    const rate = EXCHANGE_RATES[from][to];
    const converted = amountNum * rate;

    res.json({
      success: true,
      from,
      to,
      amount: amountNum,
      rate,
      converted: Math.round(converted * 100) / 100,
      date: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur conversion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Currency Converter sur http://localhost:${PORT}`);
  console.log('📱 Interface: http://localhost:8080');
  console.log('🔧 API: http://localhost:8080/convert?amount=100&from=EUR&to=USD');
});
