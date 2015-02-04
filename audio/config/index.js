var js = process.env.NODE_ENV || 'local',
    filename = './' + js + '.js';
    configuration = require(filename)();

// Export configuration.
module.exports = configuration;