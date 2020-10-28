"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TNSHttpFormData_common_1 = require("./TNSHttpFormData.common");
var TNSHttpFormData = (function (_super) {
    __extends(TNSHttpFormData, _super);
    function TNSHttpFormData() {
        return _super.call(this) || this;
    }
    TNSHttpFormData.prototype.post = function (url, params, options) {
        return new Promise(function (resolve, reject) {
            var multipartFormData = OMGMultipartFormData.new();
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var param = params_1[_i];
                if (param.fileName && param.contentType) {
                    multipartFormData.addFileParameterNameFilenameContentType(param.data, param.parameterName, param.fileName, param.contentType);
                }
                else {
                    multipartFormData.addTextParameterName(param.data, param.parameterName);
                }
            }
            var request = OMGHTTPURLRQ.POSTError(url, multipartFormData);
            if (options && options.headers) {
                for (var k in options.headers) {
                    request.addValueForHTTPHeaderField(options.headers[k], k);
                }
                console.log(request.allHTTPHeaderFields);
            }
            NSURLConnection.sendAsynchronousRequestQueueCompletionHandler(request, NSOperationQueue.currentQueue, function (response, data, error) {
                if (error) {
                    reject(error);
                    return;
                }
                var desc;
                var temp = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding);
                try {
                    desc = JSON.parse(temp.description);
                }
                catch (e) {
                    desc = temp.description;
                }
                var customResponse = {
                    headers: response.allHeaderFields,
                    statusCode: response.statusCode,
                    statusMessage: NSHTTPURLResponse.localizedStringForStatusCode(response.statusCode),
                    body: desc
                };
                resolve(customResponse);
            });
        });
    };
    return TNSHttpFormData;
}(TNSHttpFormData_common_1.Common));
exports.TNSHttpFormData = TNSHttpFormData;
//# sourceMappingURL=TNSHttpFormData.ios.js.map