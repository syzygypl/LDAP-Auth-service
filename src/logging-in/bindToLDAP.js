module.exports = (client, entry, password) => new Promise((res, rej) => {
  client.bind(entry.dn, password, (err) => {
    if (err) {
      rej({ err, client });
    } else {
      res({ err: null, client, entry });
    }
  });
});
