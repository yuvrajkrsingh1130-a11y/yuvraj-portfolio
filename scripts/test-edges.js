import https from 'https';

const ips = [
  { name: 'SFO', ip: '138.197.235.123' },
  { name: 'LHR', ip: '46.101.67.123' },
  { name: 'YYZ', ip: '159.203.50.177' },
  { name: 'JFK', ip: '159.203.159.100' },
  { name: 'AMS', ip: '188.166.132.94' },
  { name: 'FRA', ip: '138.68.112.220' },
  { name: 'SGP', ip: '139.59.195.30' },
  { name: 'BLR', ip: '139.59.50.135' },
  { name: 'SYD', ip: '45.76.126.95' },
  { name: 'NRT', ip: '172.104.96.133' },
];

for (const { name, ip } of ips) {
  try {
    const req = https.request(
      {
        host: ip,
        servername: 'yuvrajsingh.surge.sh',
        path: '/',
        method: 'HEAD',
        headers: { Host: 'yuvrajsingh.surge.sh' },
        rejectUnauthorized: false,
        timeout: 4000,
      },
      (res) => {
        console.log(`${name} (${ip}) -> Status: ${res.statusCode}, surge-cache: ${res.headers['surge-cache']}`);
      }
    );
    req.on('timeout', () => {
      console.log(`${name} (${ip}) -> TIMEOUT`);
      req.destroy();
    });
    req.on('error', (e) => {
      console.log(`${name} (${ip}) -> ERROR: ${e.message}`);
    });
    req.end();
  } catch (err) {
    console.log(`${name} (${ip}) -> EXCEPTION: ${err.message}`);
  }
}
