import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,         
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: true,         
    trim: true
  },
  category: {
    type: String,
    required: true,          
    trim: true
  },
  price: {
    type: Number,
    required: true,          
  },
  originalPrice: {
    type: Number             
  },
  discountPercent: {
    type: Number,            
    default: 0
  },
  imageUrl: {
    type: String,
    default: "/images/image_1.png",         
    
  },
  isNewProduct : {
    type: Boolean,           
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now        
  }
});

export const Product = mongoose.model("Product", ProductSchema);