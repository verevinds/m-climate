module.exports = async (req, res) => {
  const geoip = require('geoip-lite');
  const http = require('http');

  http.get({ host: 'api.ipify.org', port: 80, path: '/' }, function (resp) {
    resp.on('data', function (ip) {
      const geo = geoip.lookup(ip.toString('utf8'));
      res.status(200).send(geo);
    });
  });
};
