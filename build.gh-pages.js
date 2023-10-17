const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '/build/index.html')

function fixIndex() {
  fs.readFile(indexPath, 'utf-8', (err, data) => {
    if (err) throw err

    const fixJS = data.replace(/src="\/static/gim, 'src="./static')
    const fixCSS = fixJS.replace(/href="\/static/gim, 'href="./static')

    fs.writeFile(indexPath, fixCSS, 'utf-8', function (err) {
      if (err) throw err

      console.log('fix build applied successfully')
    })
  })
}

fixIndex()
