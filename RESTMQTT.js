// Include Packages
var express    = require('express');        // Include Express package
var app        = express();                 // Set alias app to Express
var bodyParser = require('body-parser');    // Include Body Parser package
var mqtt       = require('mqtt');           // Include MQTT package


// ****** MQTT Setup ******
var mqtt_broker = {
	host		 : 'xxx.xxx.xxx.xxx', 
	port 		 : '1883',
	protocolId 	 : 'MQTT',
	username     : 'name',
	clientId	 : 'xxxxxxxxxx'
} 


mqttClient = mqtt.connect(mqtt_broker);
mqttClient.on('connect',function() {
	console.log('Connected to MQTT Broker');
});


// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8085;        // Set listening port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.post('/messages/devices', function(req, res) {       // Receiving HTTP POST route
    console.log(JSON.stringify(req.body));                  // Output to console of receiving messages after converting to strings
	mqttClient.publish('/devices/telemetry', JSON.stringify(req.body));     // Publish to connected MQTT broker
	res.status(200).json(req.body);
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);       // Start listing to port

console.log('Listening on port ' + port);