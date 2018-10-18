var SlackBot = require('slackbots');
var request = require("request")

// create a bot
const envKey = process.env.JOKES_BOT_TOKEN
var bot = new SlackBot({
  token: envKey,
  name: "Jokes Bot"
})

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('bot_test', 'meow!', params);
    
    // define existing username instead of 'user_name'
    bot.postMessageToUser('Kenneth', 'meow!', params); 
    
    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('Kenneth', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'meow!', params); 
});



const getRandomJoke = (callback, user) => {
  return request("https://icanhazdadjoke.com/slack", (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      let jokeJSON = JSON.parse(response.body)
      let joke = jokeJSON.attachments[0].text
      return callback(joke, user)
    }
  })
}

const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
  }