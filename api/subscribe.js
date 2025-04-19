export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST allowed' });
    }
  
    const { email } = req.body;
  
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
  
    // TODO: Connect to DB, email service, or log
    console.log(`New subscriber: ${email}`);
  
    return res.status(200).json({ message: 'Thanks for subscribing!' });
  }
  