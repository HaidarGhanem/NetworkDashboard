const fs = require('fs');

function extractData(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const Data = JSON.parse(data);

    return Data;
  } catch (err) {
    console.error('Error reading or parsing the JSON file:', err);
    return null;
  }
}

module.exports = extractData