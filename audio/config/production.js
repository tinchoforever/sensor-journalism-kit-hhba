var Config = function() {
  return {
      "cookieMaxAge": 1000 * 60 * 60 * 72, // 72h cookie
      "secretSession": "kashmerekittykat",
      "MONGO_URI": "mongodb://heroku:H5rQn0gXwSJ5VXzHpxRq60Kg-t_7NWgKLZpGUzzp0biusnnMNrMo4Rtm6uUUXffc4m3Bhu88b7naurpTfhwACQ@oceanic.mongohq.com:10077/app23263985",
      "express": {
        "port": 3000
      },
      "client": {
        "PORT": 80,
        "ADDRESS": "192.168.100.22"
      }
  }
}

module.exports = Config;