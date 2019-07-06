/**
 * Replace placeholder strings with the real values in given files
 */
const fs = require('fs');

const replacements = [
  { before: '%EMAIL%', after: 'test@example.com' },
  { before: '%DOMAIN%', after: 'example.com' },
]

const files = [
  __dirname + '/docker-compose.yml',
  __dirname + '/nginx-conf/nginx.conf',
]

files.forEach(file => {
  replacements.forEach(r => {
    let contents = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, contents.split(r.before).join(r.after));
  })
})
