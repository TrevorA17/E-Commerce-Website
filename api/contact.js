import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();  // This connects to your Redis instance via environment variables

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a unique ID for each submission using timestamp or any unique identifier
  const submissionId = `contact:${new Date().toISOString()}`;

  // Save contact form data to Redis as a hash
  await redis.hset(submissionId, {
    name,
    email,
    subject,
    message,
    date: new Date().toISOString(),
  });

  // Log the submission in the Vercel dashboard (under Functions > Logs)
  console.log('New contact form submission:', {
    name,
    email,
    subject,
    message,
  });

  // Respond with success message
  return res.status(200).json({ message: 'Thanks for reaching out!' });
}
