var Config = function() {
  return {
      "cookieMaxAge": 1000 * 60 * 60 * 72, // 72h cookie
      "secretSession": "kashmerekittykat",
      "MONGO_URI": "mongodb://localhost:27017/kit",
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