const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'my-consumer-test', // A unique identifier for this consumer
  brokers: ['144.24.102.6:9092'], // Replace with your broker address
});

// Kafka consumer configuration
const consumer = kafka.consumer({ groupId: 'test-group' }); // A unique group for testing

// Function to consume messages
const consumeMessages = async () => {
  try {
    // Connect the consumer
    await consumer.connect();
    console.log('Consumer connected to Kafka');

    // Subscribe to the desired topic
    const topic = 'Delay_Projects'; // Replace with your topic name
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Subscribed to topic: ${topic}`);

    // Listen for messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Message received from topic ${topic}:`, message.value.toString());
      },
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
};

// Start consuming
consumeMessages();
