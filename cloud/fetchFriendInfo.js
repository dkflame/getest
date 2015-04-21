Parse.Cloud.define("fetchFriendInfo", function (request, response) 
{
	'use strict';
    var user = request.object;
    var friendInfo = user.get("parent");
    friendInfo.fetch({
    	success: function(friendInfo) {
    		var friendUsername = friendInfo.get("username");
    		var friendFullname = friendInfo.get("fullname");
    		var friendEmail = friendInfo.get("email");
    		var friendPhoneNo = friendInfo.get("phone");
  		}
	});
});