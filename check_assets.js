const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Mock the window object
const window = {
  noname_asset_list: []
};

// Load the assets.js file into the mocked window object
const assetsCode = fs.readFileSync('./game/asset.js', 'utf-8');
const assetsScript = new vm.Script(assetsCode);
const assetsContext = new vm.createContext({ window });
assetsScript.runInContext(assetsContext);

const noname_asset_list = window.noname_asset_list;

function checkAssetExistence(assetPath) {
  return new Promise((resolve, reject) => {
    fs.access(assetPath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false); // File does not exist
      } else {
        resolve(true); // File exists
      }
    });
  });
}

async function checkAssets() {
  const nonExistentFiles = [];
  const fileExtensions = new Set();
  const commonFileExtensions = [ '.mp3', '.woff2', '.jpg', '.png', '.gif' ]; // Add more extensions if needed

  for (const asset of noname_asset_list) {
    if (asset.startsWith('v') && !commonFileExtensions.some(ext => asset.endsWith(ext))) {
      continue; // Skip checking version numbers that are not common file extensions
    }

    if (await checkAssetExistence(asset) === false) {
      nonExistentFiles.push(asset);
    }

    // Extract the file extension and add it to the set
    const extension = path.extname(asset);
    fileExtensions.add(extension);
  }

  if (fileExtensions.size > 0) {
    console.log('File extensions:');
    console.log(Array.from(fileExtensions));
  }

  if (nonExistentFiles.length > 0) {
    console.log('The following files do not exist:');
    console.log(nonExistentFiles);
  } else {
    console.log('All files exist.');
  }
}

checkAssets();