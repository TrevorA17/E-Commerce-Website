let contactSubmissions = []; // temp store – resets on each deployment

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Save data to in-memory array (resets every cold start/deploy)
  contactSubmissions.push({ name, email, subject, message, date: new Date() });

  // Log it in the Vercel dashboard (under Functions > Logs)
  console.log("New contact form submission:", {
    name,
    email,
    subject,
    message
  });

  return res.status(200).json({ message: 'Thanks for reaching out!' });
}
