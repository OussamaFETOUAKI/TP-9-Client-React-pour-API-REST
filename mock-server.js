import http from 'http';

const PORT = 8082;
let comptes = [
  { id: 1, solde: 4500.0, dateCreation: '2026-11-10', type: 'COURANT' },
  { id: 2, solde: 12850.5, dateCreation: '2026-11-12', type: 'EPARGNE' },
  { id: 3, solde: 950.0, dateCreation: '2026-11-15', type: 'COURANT' },
  { id: 4, solde: 8500.0, dateCreation: '2026-11-17', type: 'EPARGNE' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/comptes' || req.url === '/banque/comptes') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comptes));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const newCompte = JSON.parse(body);
          newCompte.id = comptes.length + 1;
          comptes.push(newCompte);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newCompte));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Mock REST API server listening on http://localhost:${PORT}`);
  console.log(`Endpoints available:`);
  console.log(` - GET  http://localhost:${PORT}/api/comptes`);
  console.log(` - POST http://localhost:${PORT}/api/comptes`);
});
