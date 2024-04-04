const axios = require('axios');

async function trackEvent() {
    const trackingId = 'YOUR_TRACKING_ID'; // Replace with your Google Analytics Tracking ID
    const clientId = 'YOUR_CLIENT_ID'; // Replace with a unique client ID
    const url = 'https://www.google-analytics.com/collect';

    const data = {
        v: '1', // Protocol version
        tid: trackingId, // Tracking ID
        cid: clientId, // Client ID
        t: 'event', // Hit type: event
        ec: 'category', // Event category
        ea: 'action', // Event action
        el: 'label', // Event label
        ev: 'value', // Event value
        // Add any other parameters as required
    };

    try {
        await axios.post(url, data);
        console.log('Event tracked successfully');
    } catch (error) {
        console.error('Error tracking event:', error);
    }
}

// Call the function to track an event
trackEvent();
