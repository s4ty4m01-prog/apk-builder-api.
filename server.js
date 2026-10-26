const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

app.post('/build', (req, res) => {
  const { appName } = req.body;
  const fileName = (appName ? appName.replace(/\s+/g, '_') : 'app') + '.apk';

  // Base binary buffer for direct download trigger
  const dummyApk = Buffer.from('APK_BINARY_DATA_PLACEHOLDER');

  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(dummyApk);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
