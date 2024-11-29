// const express = require('express');
// const { Kafka } = require('kafkajs');
// const cors = require('cors');

// const app = express();
// const port = 6677;

// app.use(cors());

// // Kafka configuration
// const kafka = new Kafka({
//   clientId: 'my-consumer99',
//   brokers: ['144.24.102.6:9092'], // Update with your Kafka brokers
// });

// // Kafka consumer group
// const consumer = kafka.consumer({ groupId: 'my-group65' });

// // Store latest messages for each topic
// const topicMessages = {};

// // Topics mapping
// const topicMapping = {
//   topic1: 'PM-TTE',
//   topic2: 'Hello-Apache',
//   topic3: 'Hello-Python',
//   topic4: 'Website_SearchData_Fetcher',
//   topic5: 'Website_Trend_data',
//   topic6: 'HCM_Overall_Insight',
//   topic7: 'Website_Socialmedia_Visitor',
//   topic8: 'Website_Visitor_Page',
//   topic9: 'Trend_Page_viewed',
//   topic10: 'Scorecard_Report',
//   topic11: 'Scorecard_Report_ALL',
//   topic12: 'PMO_record',
//   topic13: 'All_Availability_perc',
//   topic14: 'Trend_Search_data',
//   topic15: 'Men_days',
//   topic16: 'Delay_Projects',
// };

// // Function to consume a Kafka topic
// const runConsumer = async (topic) => {
//   try {
//     await consumer.connect();
//     console.log(`Connected to Kafka for topic: ${topic}`);
//     await consumer.subscribe({ topic, fromBeginning: false });

//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const newMessage = { value: message.value.toString() };
//         topicMessages[topic] = newMessage; // Store the latest message
//       },
//     });

//     console.log(`Subscribed to topic: ${topic}`);
//   } catch (error) {
//     console.error(`Error subscribing to topic ${topic}:`, error.message);
//   }
// };

// // Start consuming all topics from topicMapping
// Object.values(topicMapping).forEach((topic) => {
//   runConsumer(topic).catch(console.error);
// });

// // API endpoint to fetch the latest message for a topic by identifier
// app.get('/api/messages/:identifier', (req, res) => {
//   const { identifier } = req.params;
//   const topic = topicMapping[identifier];

//   if (topic) {
//     if (topicMessages[topic]) {
//       res.json(topicMessages[topic]); // Return the latest message if available
//     } else {
//       res.status(200).json({ message: `No messages yet for topic: ${topic}` });
//     }
//   } else {
//     res.status(404).json({ error: `Invalid identifier: ${identifier}` });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// actual -----
// const express = require('express');
// const { Kafka } = require('kafkajs');
// const cors = require('cors');

// const app = express();
// const port = 6677;

// app.use(cors());

// // Kafka configuration
// const kafka = new Kafka({
//   clientId: 'my-consumer99',
//   brokers: ['144.24.102.6:9092'], // Replace with your actual Kafka brokers
// });

// // Kafka consumer group
// const consumer = kafka.consumer({ groupId: 'my-group98' });

// // Store latest messages for each topic
// const topicMessages = {};

// // Topics mapping
// const topicMapping = {
//   topic1: 'PM-TTE',
//   topic2: 'Hello-Apache',
//   topic3: 'Hello-Python',
//   topic4: 'Website_SearchData_Fetcher',
//   topic5: 'Website_Trend_data',
//   topic6: 'HCM_Overall_Insight',
//   topic7: 'Website_Socialmedia_Visitor',
//   topic8: 'Website_Visitor_Page',
//   topic9: 'Trend_Page_viewed',
//   topic10: 'Scorecard_Report',
//   topic11: 'Scorecard_Report_ALL',
//   topic12: 'PMO_record',
//   topic13: 'All_Availability_perc',
//   topic14: 'Trend_Search_data',
//   topic15: 'Men_days',
//   topic16: 'Delay_Projects',
// };

// // Function to initialize and run the consumer for all topics
// const startConsumer = async () => {
//   try {
//     await consumer.connect();
//     console.log('Kafka consumer connected.');

//     // Subscribe to all topics in the mapping
//     await Promise.all(
//       Object.values(topicMapping).map((topic) =>
//         consumer.subscribe({ topic, fromBeginning: false })
//       )
//     );

//     console.log('Subscribed to all topics.');

//     // Start consuming messages
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const receivedMessage = message.value.toString();
//         topicMessages[topic] = { topic, partition, message: receivedMessage };
//         console.log(`Received message from topic ${topic}:`, receivedMessage);
//       },
//     });
//   } catch (error) {
//     console.error('Error starting Kafka consumer:', error.message);
//     process.exit(1); // Exit the application if Kafka consumer fails
//   }
// };

// // API endpoint to fetch the latest message for a topic by identifier
// app.get('/api/messages/:identifier', (req, res) => {
//   const { identifier } = req.params;
//   const topic = topicMapping[identifier];

//   if (!topic) {
//     return res.status(404).json({ error: `Invalid identifier: ${identifier}` });
//   }

//   const latestMessage = topicMessages[topic];

//   if (latestMessage) {
//     res.json(latestMessage);
//   } else {
//     res.status(200).json({ message: `No messages yet for topic: ${topic}` });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// // Start the Kafka consumer
// startConsumer().catch((error) => {
//   console.error('Error initializing the Kafka consumer:', error.message);
// });

// ----------------2nd chat gpt
const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
const port = 6677;

app.use(cors());

// Kafka configuration
const kafka = new Kafka({
  clientId: 'my-consumer99',
  brokers: ['144.24.102.6:9092'], // Replace with your actual Kafka brokers
});

// Kafka consumer group
const consumer = kafka.consumer({ groupId: 'my-group98' });

// Store latest messages for each topic
const topicMessages = {};

// Topics mapping
const topicMapping = {
  topic1: 'PM-TTE',
  topic2: 'Hello-Apache',
  topic3: 'Hello-Python',
  topic4: 'Website_SearchData_Fetcher',
  topic5: 'Website_Trend_data',
  topic6: 'HCM_Overall_Insight',
  topic7: 'Website_Socialmedia_Visitor',
  topic8: 'Website_Visitor_Page',
  topic9: 'Trend_Page_viewed',
  topic10: 'Scorecard_Report',
  topic11: 'Scorecard_Report_ALL',
  topic12: 'PMO_record',
  topic13: 'All_Availability_perc',
  topic14: 'Trend_Search_data',
  topic15: 'Men_days',
  topic16: 'Delay_Projects',
};

// Function to initialize and run the consumer for all topics
const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka consumer connected.');

    // Subscribe to all topics in the mapping
    await Promise.all(
      Object.values(topicMapping).map((topic) =>
        consumer.subscribe({ topic, fromBeginning: false })
      )
    );

    console.log('Subscribed to all topics.');

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const receivedMessage = message.value.toString();
        topicMessages[topic] = { message: receivedMessage }; // Store only the message
        console.log(`Received message from topic ${topic}:`, receivedMessage);
      },
    });
  } catch (error) {
    console.error('Error starting Kafka consumer:', error.message);
    process.exit(1); // Exit the application if Kafka consumer fails
  }
};

// API endpoint to fetch the latest message for a topic by identifier
app.get('/api/messages/:identifier', (req, res) => {
  const { identifier } = req.params;
  const topic = topicMapping[identifier];

  if (!topic) {
    return res.status(404).json({ error: `Invalid identifier: ${identifier}` });
  }

  const latestMessage = topicMessages[topic];

  if (latestMessage) {
    // Only return the `message` field
    res.json(JSON.parse(latestMessage.message));
  } else {
    res.status(200).json({ message: `No messages yet for topic: ${topic}` });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Start the Kafka consumer
startConsumer().catch((error) => {
  console.error('Error initializing the Kafka consumer:', error.message);
});
