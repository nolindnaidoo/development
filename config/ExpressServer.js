import path from 'path';
import express from 'express';
import compression from 'compression';
import redirect from 'express-redirect';

// Quick access to express function
const APP = express();

// GZip compression
APP.use(compression());

// Mount redirect plugin
redirect(APP);

// Pragmatic Callback
APP.get('/heartbeat', function(req, res) {
  res.status(200).json('OK');
});

// Ease unit and integration testing
APP.redirect('/', '/build');

// Attach static route
APP.use(express.static(path.join(__dirname)));

// Assign the port
const PORT = process.env.PORT || 3000;

// Tell server to listen at port
APP.server = APP.listen(PORT, function() {
  console.log('Express APP listening at PORT %s', APP.server.address().PORT);
});

// Export APP in module for testing
module.exports = APP;
