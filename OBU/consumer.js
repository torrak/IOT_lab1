let {
    setActiveStatus,
    setLatitude,
    setLongitude,
    setSpeed,
    setColor,
} = require('./obu.js');
const mqtt = require('mqtt')

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// setSpeed(number) : Use this function to set the vehicle's speed (km/hr), e.g. setSpeed(50)
// setActiveStatus(boolean) : Use this function to set the vehicle's online status (true=Active, false=Inactive), e.g. setActiveStatus(true)
// setLatitude(number), setLongitude(number) : Use these functions to set the vehicle's location
    // e.g. setLatitude(13.738044), setLongitude(100.529944)
// setColor(string) : Use this function to set the vehicle-pin's color, e.g. setColor("blue")
    // valid colors are "blue", "green", "red", "violet", "yellow", "no"
const v2x_topic = 'IotMsgPlatformPartTwo/sink-minnesota-echo-glucose';
const broker = 'mqtt://161.200.92.6:27004';

// connect to MQTT broker
const client = mqtt.connect(broker);

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // subscribe to all topics related to your group
    client.subscribe([
    `${v2x_topic}/speed`,
    `${v2x_topic}/heartbeat`,
    `${v2x_topic}/route`,
    ], (err) => {
        if (err) {
            console.error('Subscribe failed:', err);
        } else {
            console.log('Subscribed successfully to all topics');
        }
    });
    console.log( `${v2x_topic}/speed`);
    console.log( `${v2x_topic}/heartbeat`);
    console.log( `${v2x_topic}/route`);

});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        if (topic.endsWith('/speed')) {
            setSpeed(data.speed);
            console.log('Speed updated to:', data.speed);
        } else if (topic.endsWith('/heartbeat')) {
            setActiveStatus(data.heartbeat);
            console.log('Active status:', data.heartbeat);
        } else if (topic.endsWith('/route')) {
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setColor(data.color);
            console.log('Route update:', data);
        }
    } catch (err) {
        console.error('Error parsing message:', err);
    }
});