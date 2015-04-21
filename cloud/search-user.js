Parse.Cloud.define("searchUser", function (request, response) {
    'use strict';
 
    var query = new Parse.query(_User);
    query.contains("username", request.params.string)
    query.find({
        success: function(results) {
            var data = [];
            for (var i = 0; i < results.length; ++i) {
                data.push(rows[i].first_name);
            }
            response.success(JSON.stringify(data));
        },
        error: function() {
          response.error("lookup failed");
        }
    });
 
});