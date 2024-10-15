const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

const InventoryController = {
  async createInventory(req, res) {
    try {
      const { product, quantity, description, sizeText, sizeNumber } = req.body;

      let inventory = await Inventory.findOne({ productName });

      if (inventory) {
        // Nếu Inventory đã tồn tại, thì cập nhật
        inventory.quantity = quantity;
        inventory.description = description || inventory.description;

        // Cập nhật sizeText
        if (sizeText && sizeText.length > 0) {
          inventory.sizeText = sizeText.map((size) => ({
            _id: size._id,
            type: size.type,
            quantity: size.quantity
          }));
        }

        // Cập nhật sizeNumber
        if (sizeNumber && sizeNumber.length > 0) {
          inventory.sizeNumber = sizeNumber.map((size) => ({
            _id: size._id,
            type: size.type,
            quantity: size.quantity
          }));
        }
      } else {
        inventory = new Inventory({
          productName,
          quantity,
          description,
          sizeText: sizeText.map((size) => ({
            _id: size._id,
            type: size.type,
            quantity: size.quantity
          })),
          sizeNumber: sizeNumber.map((size) => ({
            _id: size._id,
            type: size.type,
            quantity: size.quantity
          }))
        });
      }
      await inventory.save();

      const inventoryOfProduct = await Product.findByIdAndUpdate(product, { $push: { inventory: inventory._id } });
      if (!inventoryOfProduct) return res.status(400).json({ message: "Create inventory failed", status: -1 });

      res.status(201).json({
        message: "Inventory created/updated successfully",
        status: 1,
        inventory
      });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
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