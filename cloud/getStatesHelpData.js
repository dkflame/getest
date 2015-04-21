// [
//     {States:"HI", times:12},
//     {States:"AK", times:10}
// ]
// ==>
// {
//     HI:{times:12, color:200},
//     AK:{times:10, color:220}
// }

Parse.Cloud.define("getStatesHelpData", function(request, response) {
    'use strict';
    var StatesHelpQuery = new Parse.Query(StatesHelp);

    StatesHelpQuery.find({
        success: function(StatesHelp){
            var StatesHelpObj = {};
            var maxTimes = 1;
            for(var i=0; i<StatesHelp.Length; i++){
                if (StateHelp[i].get("times")>maxTimes){
                    maxTimes = StateHelp[i].get("times");
                }
            }
            for(var i=0; i<StatesHelp.Length; i++){
                var state = StatesHelp[i].get("state");
                var times = StateHelp[i].get("times");
                StatesHelpObj[state] = {times:times, color:d3.interpolate("#FFFFFF", "#FF0000")(times/maxTimes)};
            }
            response.success(StatesHelpObj);
        },
        error:function() {
            response.error("statesHelp Lookup failed");
        }
    });
});