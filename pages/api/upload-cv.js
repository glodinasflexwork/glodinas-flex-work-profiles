import { google } from 'googleapis';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // allow for CV uploads
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, fileName, contentType } = req.body;
    if (!file || !fileName) {
      return res.status(400).json({ error: 'Missing file or filename' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const buffer = Buffer.from(file, 'base64');

    const uploadRes = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: contentType,
        parents: ['1XNi54FMuTOsVYL_MqsOIy90frNB2H1yW'], // your shared Drive folder ID
      },
      media: {
        mimeType: contentType,
        body: Buffer.from(buffer),
      },
    });

    // Make the file publicly viewable
    await drive.permissions.create({
      fileId: uploadRes.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const fileUrl = `https://drive.google.com/file/d/${uploadRes.data.id}/view`;

    return res.status(200).json({ url: fileUrl });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Failed to upload CV to Drive' });
  }
}