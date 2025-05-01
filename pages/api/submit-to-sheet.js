export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const gsScriptUrl = 'https://script.google.com/macros/s/AKfycbwUi7ysbqdmO0Ib3T77991UoZVrX160VaDCA2vx0xjkIMKRI9AgJnqx3gwGzhDIj5gf/exec';

    const response = await fetch(gsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}