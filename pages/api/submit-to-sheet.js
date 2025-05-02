import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    fullName,
    email,
    phone,
    nationality,
    location,
    languages,
    sector,
    additional,
    cvUrl,
    fullBodyUrl,
    idCopyUrl,
  } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.append({
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
          fullBodyUrl || '',
          idCopyUrl || '',
          cvUrl || '',
        ]],
      },
    });

    console.log('✅ Google Sheets append response:', response.data);
    res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error('❌ Google Sheets API Error:', error.message);
    res.status(500).json({ error: 'Failed to append to sheet', details: error.message });
  }
}