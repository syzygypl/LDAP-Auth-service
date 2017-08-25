# LDAP Auth service

### Installation

Tested on [Node.js](https://nodejs.org/) v7.10.

Install the dependencies and start the server.

```sh
$ cd whirlpool-lp
$ npm install
$ node index.js
```

Set env vars:
* LDAP_URL= (url of the ldap service)
* PORT= (port on which server will be listening)
* BASIC_AUTH_REALM= (unique string - sites with same realm share auth data)


### Usage
Service provides `/login` endpoint which is secured with basic auth connected to LDAP.
If you provide correct credentials, then you will get a JSON response with username and email, otherwise 401 response will be sent.
