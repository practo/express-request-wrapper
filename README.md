# express-request-wrapper
This is a library which allows me to address concerns of stamping required data for a request created using request middleware and also has been enpowerd with debugging and lot of othere cool error handling

Library exposes four methods for each of the popular http request

### makePostCall(url, formData, headers, cb, isForm)
Method to forward incoming POST call

`url - *requried, Url for making POST proxy request`

`formData - *requried, Body or form data which requried to be forwarded with the request `

`headers - *required, Object containing all the required headers, (do not forward 'host' and 'accept-encoding')`

`cb - *required, call back function or the format function(err, body, response)`

`isForm - optional, if the server is expecting request as form`

### makeGetCall(url, query, headers, cb)
Method to forward incoming GET call

`url - *requried, Url for making GET proxy request`

`query - *requried, query requried to be forwarded`

`headers - *required, Object containing all the required headers, (do not forward 'host' and 'accept-encoding')`

`cb - *require, call back function or the format function(err, body, response)`

### makePatchCall(url, formData, headers, cb, isForm)
Method to forward incoming PATCH call

`url - *requried, Url for making PATCH proxy request`

`formData - *requried, Body or form data which requried to be forwarded with the request `

`headers - *required, Object containing all the required headers, (do not forward 'host' and 'accept-encoding')`

`cb - *required, call back function or the format function(err, body, response)`

`isForm - optional, if the server is expecting request as form`

### makePutCall(url, formData, headers, cb, isForm)
Method to forward incoming PUT call

`url - *requried, Url for making PUT proxy request`

`formData - *requried, Body or form data which requried to be forwarded with the request `

`headers - *required, Object containing all the required headers, (do not forward 'host' and 'accept-encoding')`

`cb - *required, call back function or the format function(err, body, response)`

`isForm - optional, if the server is expecting request as form`

### makeDeleteCall(url, headers, cb)
Forward incoming delete request
`url - *requried, Url for making post proxy request`

`headers - *required, Object containing all the required headers, (do not forward 'host' and 'accept-encoding')`

`cb - *required, call back function or the format function(err, body, response)`
