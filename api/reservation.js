// api/reservation.js
export default async function handler(req, res) {
  // 1. Gestion des CORS (Indispensable pour éviter certaines erreurs 500/Network coté client)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Pour la prod, remplacez '*' par votre domaine si possible
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Répondre OK immédiatement aux requêtes "preflight" (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Vérifier la méthode
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 4. Accès sécurisé à la variable d'environnement
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  
  // Debug (visible dans les logs Vercel "Functions")
  if (!webhookUrl) {
    console.error("ERREUR CRITIQUE : La variable d'environnement N8N_WEBHOOK_URL est indéfinie.");
    return res.status(500).json({ 
      error: 'Configuration serveur manquante', 
      details: 'La clé API vers le webhook est introuvable sur le serveur.' 
    });
  }

  try {
    // 5. Envoi vers N8N
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    // Lecture de la réponse N8N (texte ou json)
    const textRes = await response.text();
    let jsonRes = {};
    try { jsonRes = JSON.parse(textRes); } catch (e) { jsonRes = { raw: textRes }; }

    if (!response.ok) {
      console.error('Erreur retournée par N8N :', response.status, textRes);
      return res.status(502).json({ 
        error: 'Erreur du service tiers (N8N)', 
        status: response.status,
        details: jsonRes 
      });
    }

    return res.status(200).json({ success: true, n8n_response: jsonRes });

  } catch (err) {
    console.error('Exception serveur :', err);
    return res.status(500).json({ 
      error: 'Erreur interne du serveur', 
      message: err.message 
    });
  }
}