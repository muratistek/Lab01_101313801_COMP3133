const csv = require('csv-parser')
const fs = require('fs')


if (fs.existsSync('canada.txt')) {
  fs.unlinkSync('canada.txt')
  console.log('canada.txt was deleted')
}
else {
  console.log("canada.txt does not exist");
}

if (fs.existsSync('usa.txt')) {
  fs.unlinkSync('usa.txt')
  console.log('usa.txt was deleted')
}
else {
  console.log("usa.txt does not exist");
}

var readStream = fs.createReadStream('input_countries.csv')
var writeStream = fs.createWriteStream('canada.txt')
var writeStream2 = fs.createWriteStream('usa.txt')

readStream
  .pipe(csv())
  .on('data', (row) => {
    if (row.country === 'Afghanistan' && row.year === '1952') {
      writeStream.write(Object.keys(row).join(','))
      writeStream.write("\n")
      writeStream2.write(Object.keys(row).join(','))
      writeStream2.write("\n")
    }
    if (row.country === 'Canada') {
      writeStream.write(Object.values(row).join(','))
      writeStream.write("\n")
    }
    else if (row.country === 'United States') {
      writeStream2.write(Object.values(row).join(','))
      writeStream2.write("\n")
    }
  })

