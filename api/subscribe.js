import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Create a unique key using a timestamp
  const timestamp = new Date().toISOString();
  const key = `subscriber:${timestamp}`;

  // Store email to Upstash
  await redis.hset(key, {
    email,
    date: timestamp,
  });

  // Also log to Vercel logs for reference
  console.log(`✅ New subscriber: ${email}`);

  return res.status(200).json({ message: 'Thanks for subscribing!' });
}
