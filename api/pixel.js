module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, event_id, event_source_url, fbp, fbc } = req.body;

    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.headers['x-real-ip'] || '';
    const userAgent = req.headers['user-agent'] || '';

    const payload = {
      data: [{
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        action_source: 'website',
        event_source_url,
        user_data: {
          client_ip_address: ip,
          client_user_agent: userAgent,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
      }],
      access_token: 'EAAOzPZC8tBRoBSD0RvjyryVLxkPN2oFYA7qbZCwwuj0ySTPEJhAvvlgF5FaVLcws1tPBJZATAoouG0giPXe6Nc5Im4Oc8RMzeblLUD2TDbUrAKrptrAMNYTh5GJZAwTvk8AzAv80RbCFe0aCV2So8hDQt6mkBQBKVZAx7HqqcZB7eZBMQtDx1o0n49ZBulkB8wZDZD',
    };

    const https = require('https');
    const data = JSON.stringify(payload);

    await new Promise((resolve, reject) => {
      const r = https.request({
        hostname: 'graph.facebook.com',
        path: '/v21.0/1724586772328240/events',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
      }, response => {
        let body = '';
        response.on('data', c => body += c);
        response.on('end', () => resolve(body));
      });
      r.on('error', reject);
      r.write(data);
      r.end();
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};
