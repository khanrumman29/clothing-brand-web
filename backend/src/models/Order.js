import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        selectedSize: String,
        selectedColor: String,
        image: String
      }
    ],
    customer: {
      name: { type: String, default: 'Guest Customer' },
      email: { type: String, default: '' },
      phone: String,
      address: String
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    promoCodeUsed: String,
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Confirmed'
    }
  },
  {
    timestamps: true
  }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
