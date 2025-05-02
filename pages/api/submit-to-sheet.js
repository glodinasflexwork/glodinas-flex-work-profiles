import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, nationality, location, languages, sector, additional, cvUrl } = req.body;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  try {
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
    console.error('Google Sheets Error:', error);
    res.status(500).json({ error: 'Failed to append to sheet' });
  }
}