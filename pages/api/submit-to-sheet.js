import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      nationality,
      location,
      languages,
      sector,
      additional,
      cvUrl
    } = req.body;

    // Debug logs (visible in Vercel's function logs)
    console.log('📥 Incoming data:', req.body);
    console.log('📄 Sheet ID:', process.env.GOOGLE_SHEET_ID);
    console.log('🔐 Credentials loaded:', !!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          fullName,
          email,
          phone,
          nationality,
          location,
          languages,
          sector,
          additional,
          cvUrl || ''
        ]],
      },
    });

    res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error('❌ Error submitting to sheet:', error.message);
    res.status(500).json({ error: 'Failed to append to sheet', details: error.message });
  }
}