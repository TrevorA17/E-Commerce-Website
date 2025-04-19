// api/cart.js
let cart = []; // In-memory cart, for demo purposes

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the current cart
    return res.status(200).json(cart);
  }

  if (req.method === "POST") {
    // Add item to the cart
    const { product } = req.body;
    cart.push(product);
    return res.status(200).json(cart);
  }

  if (req.method === "DELETE") {
    // Remove item from the cart
    const { productId } = req.body;
    cart = cart.filter(item => item.id !== productId);
    return res.status(200).json(cart);
  }

  res.status(405).end(); // Method Not Allowed
}
