// clientId = zubvkr5nn03m69oadmm3yrumkohs08
// var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// https://api.twitch.tv/helix/channels?broadcaster_id=141981764

//shorthand function to cover everything
$(function () {
  var streams = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"];

  //function to send GET request from url which returns the JSON object
  $.getJSON(
  "https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=freecodecamp").
  done(function (data) {
    //function to handle and update the html element when freecodecamp is online
    if (data.data.length === 0) {
      $("#fcc").html(" is OFFLINE");
    } else {
      $("#fcc").html(" is ONLINE");
    }
  });
  //iterating through the global var streams
  for (var i = 0; i < streams.length; i++) {
    $.ajax({
      type: "GET",
      url:
      "https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=" +
      streams[i],
      header: {
        "client-ID": "zubvkr5nn03m69oadmm3yrumkohs08" },

      success: function (dataI) {
        //console.log(dataI);
        //calling api to get the usernames,status,game
        $.getJSON(
        "https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=" +
        dataI.data[0].user_name).
        done(function (data2) {
          var name = data2.data[0].user_name;
          //appending required data on the dom
          if (data2.data.length === 0) {
            $("#user").append(
            '<a target="_blank" href="https://www.twitch.tv/' +
            name +
            '">' +
            name +
            "</a>NULL<br>");

            $("#status").append("offline<br>");
            $("#game").append("No Game<br>");
          } else {
            $("#user").append(
            '<a target="_blank" href="https://www.twitch.tv/' +
            name +
            '">' +
            name +
            "</a><br>");

            $("#status").append("online<br>");
            $("#game").append(data2.data[0].game_name + "<br>");
          }
        });
      },
      //handling error
      error: function (err) {
        //alert("Error: User not found");
        $("#user").append(streams[i] + "<br>");
        $("#status").append("Not Found<br>");
        $("#game").append("No Game<br>");
      } });

  }
});