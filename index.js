var axios = require("axios");

module.exports = class Memes {
  constructor() {
    this.dto = "f8DiUW9OTMy5_4LoYqODJM:APA91bGPiZoh__3bn-wxp0bvPZeGFtVjJL3XC8KQUu5zLa9eZDJcUwgZEGEcWxd1dtuGZ-OdoY_w1JvTod761HeeYNYEHOudAS-pBOY8i6ajlEx6VqLZZRfEC8_gZAX-8Cwt5qUc-vTM"
  }

  async login(username,password) {
    this.username = username;
    this.password = password;
    var ltoken = await axios({
      url: 'https://app.memes.com/api/loginUser',
      method: 'POST',
      data: {
        "email": this.username,
	"device_token": this.dto,
	"password": this.password,
	"device_type":"2"
      }
    });
    this.ltoken = ltoken.data.data.loginToken;
    this.id = ltoken.data.data.id;
    this.uid = ltoken.data.data["user_id"];
    var token = await axios({
      url: 'https://api.memes.com/legacy_auth',
      method: 'POST',
      data: {
	"login_token": this.ltoken,
	"user_id": this.uid,
	"device_type":"2"
      }
    });
    this.token = token.data.token;
    this.rto = token.data["refresh_token"];
    return ltoken.data;
  }
}
