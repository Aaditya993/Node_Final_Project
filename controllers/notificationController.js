const admin = require('firebase-admin');

// We wrap the Firebase setup in a try-catch so your server does not crash if you haven't downloaded the Firebase JSON key yet.
try {
    // For your viva: This is where you would load your actual Firebase project credentials
    // const serviceAccount = require('../firebase-key.json');
    // admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (error) {
    console.log("Firebase setup pending...");
}

// POST /api/notifications/send
exports.sendPushNotification = async (req, res) => {
    try {
        const { deviceToken, title, body } = req.body;

        // The exact structure Firebase requires
        const message = {
            notification: {
                title: title,
                body: body
            },
            token: deviceToken
        };

        // For testing purposes right now, if we pass "TEST_TOKEN", we will simulate a success response
        if (deviceToken === "TEST_TOKEN") {
            return res.status(200).json({ 
                message: "Simulated Firebase Notification sent successfully!", 
                details: message 
            });
        }

        // The real code that triggers the push notification to a mobile phone
        const response = await admin.messaging().send(message);
        res.status(200).json({ message: "Notification sent!", response });
    } catch (error) {
        res.status(500).json({ message: "Firebase Error", error: error.message });
    }
};