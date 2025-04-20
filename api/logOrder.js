// api/logOrder.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const orderDetails = req.body;

    try {
      const orderId = `order:${Date.now()}`; // Unique key for each order
      await redis.set(orderId, JSON.stringify(orderDetails)); // Save to Redis

      return res.status(200).json({ message: 'Order stored successfully', orderId });
    } catch (error) {
      console.error('Redis error:', error);
      return res.status(500).json({ message: 'Failed to store order' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
