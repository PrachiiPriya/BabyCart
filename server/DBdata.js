const ProductData = require('./ProductData');
const ProductSchema = require('./models/ProductSchema');

const DBdata = async () => {
  try {
    console.log('ProductData:', ProductData);
    await ProductSchema.deleteMany({});
    await ProductSchema.insertMany(ProductData);
    console.log('Data imported successfully.');
  } catch (err) {
    console.log('Error while inserting default data.', err.message);
  }
};

module.exports = DBdata;