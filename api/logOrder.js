// api/logOrder.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const orderDetails = req.body;
      
      // Log order details to Vercel logs
      console.log('Order details:', JSON.stringify(orderDetails));
  
      return res.status(200).json({ message: 'Order logged successfully' });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  