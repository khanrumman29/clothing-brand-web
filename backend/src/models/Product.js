import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Unisex'],
      default: 'Unisex'
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    mrpText: {
      type: String,
      default: 'MRP INCLUSIVE OF ALL TAXES'
    },
    image: {
      type: String,
      required: [true, 'Main product image URL is required']
    },
    secondaryImage: {
      type: String
    },
    discount: {
      type: String
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    colors: {
      type: [String],
      default: ['#000000']
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL']
    },
    description: {
      type: String,
      default: ''
    },
    details: {
      type: [String],
      default: []
    },
    stock: {
      type: Number,
      default: 10,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
