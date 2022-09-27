# Paypack-js

Paypack is a cloud service that offers a solution to merchants in need of a resilient, robust and efficient payment service.

Easily request and send funds . Funds are seamlessly delivered to their recipients via mobile money.

Paypack-js is a wrapper around the Paypack HTTP based API that can be easily integrated with any Node.js framework.

## Getting started guide

Before any integrations a Paypack account is mandatory, head over to [payments.paypack.rw](payments.paypack.rw) and register an account.

## Setup

` npm install paypack-js`

## Usage

### Configuration

Each request to our secure API must have the `client_id` and `client_secret` parameters set.

Setting the `client_id` and `client_secret` parameters can be done by calling the `Paypack.config()` method.

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });
```

Assuming you have your Paypack configuration parameters defined (`client_id`,`client_secret`), making any request is very simple.

##

### Cashin Request

The following example generates a cashin request:

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });

Paypack.cashin({
  number: "07xxxxxxx",
  amount: 100,
  environment: "development/production",
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

<b> ⚠ Warning : </b> <i>"amount"</i> must be of type number
<b> ⓘ Info : </b> <i>"environment"</i> is an optional parameter corresponding to a mode of operation of your registerd webhook.

##

### Cashout Request

The following example generates a cashout request:

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });

Paypack.cashout({
  number: "07xxxxxxx",
  amount: 100,
  environment: "development/production",
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

<b> ⚠ Warning : </b> <i>"amount"</i> must be of type number
<b> ⓘ Info : </b> <i>"environment"</i> is an optional parameter corresponding to a mode of operation of your registerd webhook.

##

### Transactions

The following example returns a list of 100 transactions:

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });

Paypack.transactions({ offset: 0, limit: 100 })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

<b> ⚠ Info : </b> This method supports a number of filters.

```js
 - offset	String() // offset of transactions to fetch
 - limit	String() // limit of transactions to fetch default is 20
 - from		Date()	// starting date range of transactions to fetch
 - to		Date() // ending date range of transactions to fetch
 - kind		String() //  kind of transactions to fetch eg: CASHIN or CASHOUT
 - client	Number() // transactions for a specific client
```

##

### Events

The following example returns a list of 100 events:

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });

Paypack.events({ offset: 0, limit: 100 })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

<b> ⚠ Info : </b> This method supports a number of filters.

```js
 - offset	String() // offset of events to fetch
 - limit	String() // limit of events to fetch default is 20
 - from		Date()	// starting date range of events to fetch
 - to		Date() // ending date range of events to fetch
 - kind		String() //  kind of events to fetch eg: CASHIN or CASHOUT
 - client	Number() // events for a specific client
 - ref		String() // events for a specific transaction ref
 - status	String() // events with a specific status eg: pending or successfull or failed
```

##

### Profile

The following example returns the profile of the authenticated merchant:

```js
var Paypack = require("paypack");

Paypack.config({ client_id: "", client_secret: "" });

Paypack.me()
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Node support

This SDK requires node >= 8.

## Support

You can [open an issue through GitHub](https://github.com/quarksgroup/paypack-js/issues).

## License

Released under the MIT license.
