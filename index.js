// Module containing common helper methods
var request = require("request");

var util = function() {
    var public = {};
    var debugOn = process.env.DEBUG ?
        process.env.DEBUG.indexOf('express') > -1 : false;

    /**
        Base wrapper on request post call, this gives us opportunity to add
        pre-processing if requried on request default post request

        Since this is a proxy give the response object to underlying callback
        `isForm`, pass true if you want to make a form url encoded request
        `isFormData`, pass true if you want to make a multipart form data request 
    */
    var getErrorMessage = function(url, body, response) {
        var errorMessage = "Invalid response from server in " +
            "post call " + url;
        if (body) {
            body = typeof(body) == 'object' ? JSON.stringify(body) : body;
            errorMessage = body + ", url: " + url;
            errorMessage = errorMessage + ", statusCode: " + response.statusCode;
        }
        return errorMessage;
    }
    public.makePostCall = function(url, formData, headers, cb,
        isForm, isFormData) {
        if (debugOn) console.time("postRequest " + url);
        var requestData = {
            url: url,
            json: formData,
            headers: headers
        }
        if (isForm) {
            delete requestData.json;
            requestData.form = formData;
        }
        if (isFormData) {
            delete requestData.json;
            requestData.formData = formData;
        }
        request
            .post(requestData,
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if ([201, 200].indexOf(response.statusCode) > -1) {
                        if (debugOn) console.timeEnd("postRequest " + url);
                        return cb(null, body, response)
                    } else {
                        return cb(new Error(getErrorMessage(url, body, response)),
                            body, response);
                    }
                });
    };

    /**
    * pass response if you want to pipe the response
    * This is needed for file download
    **/
    public.makeGetCall = function(url, query, headers, cb, isPipe) {
        if (debugOn) console.time("getRequest " + url);
        if (isPipe) {
            request
                .get({
                        url: url,
                        qs: query,
                        headers: headers
                    }).pipe(cb);
        } else {
            request
                .get({
                        url: url,
                        qs: query,
                        headers: headers
                    },
                    function(err, response, body) {
                        if (err) {
                            return cb(err);
                        }
                        if (response.statusCode == 200) {
                            if (debugOn) console.timeEnd("getRequest " + url);
                            return cb(null, body, response)
                        } else {
                            return cb(new Error(getErrorMessage(url, body, response)),
                                body, response);
                        }
                    });
        }
    };

    public.makePatchCall = function(url, formData, headers, cb, isForm) {
        if (debugOn) console.time("patchRequest " + url);

        var requestData = {
            url: url,
            json: formData,
            headers: headers
        }
        if (isForm) {
            delete requestData.json;
            requestData.form = formData;
        }
        request
            .patch(requestData,
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if ([201, 200].indexOf(response.statusCode) > -1) {
                        if (debugOn) console.timeEnd("patchRequest " + url);
                        return cb(null, body, response)
                    } else {
                        return cb(new Error(getErrorMessage(url, body, response)),
                            body, response);
                    }
                })
    };


    public.makePutCall = function(url, formData, headers, cb, isForm) {
        if (debugOn) console.time("putRequest " + url);

        var requestData = {
            url: url,
            json: formData,
            headers: headers
        }
        if (isForm) {
            delete requestData.json;
            requestData.form = formData;
        }
        request
            .put(requestData,
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if (response.statusCode == 200) {
                        if (debugOn) console.timeEnd("putRequest " + url);
                        return cb(null, body, response)
                    } else {
                        return cb(new Error(getErrorMessage(url, body, response)),
                            body, response);

                    }
                })
    };

    public.makeDeleteCall = function(url, headers, cb) {
        if (debugOn) console.time("deleteRequest " + url);
        request.del({
            url: url,
            headers: headers
        }, function(err, response, body) {
            if (err) {
                return cb(err);
            }
            if (response.statusCode == 200) {
                if (debugOn) console.timeEnd("deleteRequest " + url);
                return cb(null, body, response)
            } else {
                return cb(new Error(getErrorMessage(url, body, response)),
                    body, response);
            }
        })
    };
    return public;
}

module.exports = util();