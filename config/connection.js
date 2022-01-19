// Requiring mongoose for the connection
const { connect, connection } = require('mongoose');

// Node looks for this environment variable and if it exists, it will use it. Otherwise it will 
// assume we are running it locally.
const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialMediaDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Exporting the connection
module.exports = connection;