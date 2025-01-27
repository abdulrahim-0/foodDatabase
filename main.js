import OpenFoodFacts from "openfoodfacts-nodejs";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 5000;

const client = new OpenFoodFacts();

// Ensure the images directory exists
const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

app.get('/product/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    const product = await client.getProduct(barcode);
    const productName = product.product.product_name;

    res.json({ productName });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});