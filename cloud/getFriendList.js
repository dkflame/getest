Parse.Cloud.define("getFriendList", function(request, response) {
    'use strict';
    var username = request.user.get("username");
    var user1 = new Parse.Query("Relationship");
    user1.equalTo("user_one", username);
    user1.equalTo("Status", "confirmed");
    var user2 = new Parse.Query("Relationship");
    user2.equalTo("user_two", username);
    user2.equalTo("Status", "confirmed");
    var friendListQuery = new Parse.Query.or(user1,user2);
    
    friendListQuery.find().then(function(friends){
        var friendList = [];
        for(var i=0; i<friends.Length; i++){
            if(friends[i].get("user_one")===username){
                friendList.push(friends[i].get("user_two"));
            }
            else{
                friendList.push(friends[i].get("user_one"));
            }
        }
        return friendList;
    }).then(function(friendList){
        var userListQuery = new Parse.Query("_User");
        userListQuery.containedIn("username",friendList);
        userListQuery.find({
            success:function(users){
                var friendObjList = [];
                for(var i=0; i<friendList.Length; i++){
                    for(var j=0; j<users.Length; j++){
                        if (friendList[i]===users[j]){
                            friendObjList.push({"username":friendList[i]});
                            friendObjList[i].set("parent", users[j]);
                        }
                    }
                }
                response.success(friendObjList);
            },
            error:function() {
                response.error("friendList Lookup failed");
            }
        });
    });
});
