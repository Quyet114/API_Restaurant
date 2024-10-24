const {Inventory} = require('../models/Inventory');
const {Product} = require('../models/Product');

const InventoryController = {
  async createInventory(req, res) {
    try {
      const { product, description = "", sizeText = [], sizeNumber = [] } = req.body;
  
      if (!product) {
        return res.status(400).json({ message: "Product is required", status: -1 });
      }
  
      let inventoryData = { product, description };
  
      // If sizeText is provided, add it to the inventory data
      if (sizeText.length > 0) {
        inventoryData.sizeText = sizeText.map(size => ({
          _id: size._id,
          type: size.type,
          quantity: size.quantity
        }));
      }
  
      // If sizeNumber is provided, add it to the inventory data
      if (sizeNumber.length > 0) {
        inventoryData.sizeNumber = sizeNumber.map(size => ({
          _id: size._id,
          type: size.type,
          quantity: size.quantity
        }));
      }
  
      // Create a new inventory record with the collected data
      const inventory = new Inventory(inventoryData);
      await inventory.save();
  
      // Update the product with the new inventory
      const inventoryOfProduct = await Product.findByIdAndUpdate(product, { $push: { inventory: inventory._id } });
      if (!inventoryOfProduct) {
        return res.status(400).json({ message: "Create inventory failed", status: -1 });
      }
  
      res.status(201).json({
        message: "Inventory created/updated successfully",
        status: 1,
        inventory
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  async updateSizeQty(req, res) {
    try {
      const { inventoryId, sizeText = [], sizeNumber = [] } = req.body;
  
      // Initialize an empty object to hold the update data
      let updateData = {};
  
      // Check which size is provided and prepare the data accordingly
      if (sizeText.length > 0) {
        updateData.sizeText = sizeText.map(size => ({
          _id: size._id,
          quantity: size.quantity
        }));
      } else if (sizeNumber.length > 0) {
        updateData.sizeNumber = sizeNumber.map(size => ({
          _id: size._id,
          quantity: size.quantity
        }));
      } else {
        return res.status(400).json({ message: "No size data provided", status: -1 });
      }
  
      // Perform the update
      const inventory = await Inventory.findByIdAndUpdate(inventoryId, updateData, {
        new: true,
        runValidators: true
      });
  
      if (!inventory) {
        return res.status(400).json({ message: "Update inventory failed", status: -1 });
      }
  
      res.status(200).json({
        message: "Inventory updated successfully",
        status: 1,
        inventory
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  }
  

}
module.exports = InventoryController;
// Create Inventory data
// {
//   "productName": "64b1bc97b1a50c2c8b913c39",  // ObjectId của sản phẩm
//   "quantity": 100,
//   "description": "Product description",
//   "sizeText": [
//     { "_id": "S", "type": "S", "quantity": 20 },
//     { "_id": "M", "type": "M", "quantity": 30 },
//     { "_id": "L", "type": "L", "quantity": 25 }
//   ],
//   "sizeNumber": [
//     { "_id": "36", "type": "36", "quantity": 10 },
//     { "_id": "37", "type": "37", "quantity": 5 },
//     { "_id": "38", "type": "38", "quantity": 15 }
//   ]
// }