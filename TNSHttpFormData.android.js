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
            try {
                var client = new okhttp3.OkHttpClient();
                var builder = new okhttp3.MultipartBody.Builder();
                var FORM_MEDIA_TYPE = okhttp3.MediaType.parse("multipart/form-data");
                builder.setType(FORM_MEDIA_TYPE);
                for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                    var param = params_1[_i];
                    if (param.fileName && param.contentType) {
                        var MEDIA_TYPE = okhttp3.MediaType.parse(param.contentType);
                        builder.addFormDataPart(param.parameterName, param.fileName, okhttp3.RequestBody.create(MEDIA_TYPE, param.data));
                    }
                    else {
                        builder.addFormDataPart(param.parameterName, param.data);
                    }
                }
                var requestBody = builder.build();
                var reqWithURL = new okhttp3.Request.Builder()
                    .url(url);
                if (options && options.headers) {
                    for (var k in options.headers) {
                        reqWithURL.addHeader(k, options.headers[k]);
                    }
                }
                var request = reqWithURL
                    .post(requestBody)
                    .build();
                var callback = new okhttp3.Callback({
                    onResponse: function (call, response) {
                        resolve();
                    },
                    onFailure: function (call, response) {
                        reject(response);
                    }
                });
                client.newCall(request).enqueue(callback);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return TNSHttpFormData;
}(TNSHttpFormData_common_1.Common));
exports.TNSHttpFormData = TNSHttpFormData;
//# sourceMappingURL=TNSHttpFormData.android.js.map
