const bindToLDAP = require('./bindToLDAP');
const getEntryDataFromLDAP = require('./getEntryDataFromLDAP');


const loginVerifier = (ldap, username, password) => {
  const ldapClient = ldap.createClient({
    url: process.env.LDAP_URL,
  });

  const opts = {
    filter: `(|(uid=${username})(mail=${username}))`,
    scope: 'sub',
  };

  return getEntryDataFromLDAP(ldapClient, opts)
    .then(entry => bindToLDAP(ldapClient, entry, password))
    .then(({ client, entry }) => {
      client.unbind();
      return { email: entry.mail, username: entry.uid }
    });
};

module.exports = loginVerifier;
