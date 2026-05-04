const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check (important for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Checkout API
app.post("/checkout", (req, res) => {
  try {
    const { items, total } = req.body;

    if (!Array.isArray(items) || typeof total !== "number" || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const orderItems = items.map((item) => ({
      name: item.name || item.product?.name,
      qty: item.qty ?? item.quantity,
    }));

    if (orderItems.some((item) => !item.name || typeof item.qty !== "number")) {
      return res.status(400).json({
        success: false,
        message: "Invalid item format",
      });
    }

    const message = `🛍️ Order Details:\n${orderItems
      .map((i) => `${i.name} x ${i.qty}`)
      .join("\n")}\n\n💰 Total: ₹${total}`;

    const whatsappUrl = `https://wa.me/916200391201?text=${encodeURIComponent(message)}`;

    const qrData = `upi://pay?pa=6200391201@upi&pn=Lavender Coast&cu=INR&am=${total.toFixed(2)}&tn=${encodeURIComponent(
      orderItems.map((i) => `${i.qty}×${i.name}`).join(", ")
    )}`;

    res.json({
      success: true,
      whatsappUrl,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=260x260`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ IMPORTANT FIX (for EC2 + Docker)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
