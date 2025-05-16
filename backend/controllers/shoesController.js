const connection = require('../db/boolshop_db.js')


function index(req, res) {
  const sql =
    `
    SELECT
      shoes.id,
      shoes.name,
      shoes.brand,
      shoes.description,
      shoes.price,
      shoes.sold_copies,
      shoes.updated_at,
      IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
      discounts.value AS discount_value,
      GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
      GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
      GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
      GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
      GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
      GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
      GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM shoes
      LEFT JOIN variants ON variants.shoe_id = shoes.id
      LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
      LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
      LEFT JOIN tags ON tags.id = shoe_tags.tag_id
      LEFT JOIN discounts ON discounts.id = shoes.discount_id
    GROUP BY shoes.id;
`
  connection.query(sql, [], (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })
}
function indexBrand(req, res) {
  const brand = req.params.brand || req.query.brand;
  if (!brand) return res.status(400).json({ error: "Brand is required" });
  const sql = `
  SELECT
      shoes.id,
      shoes.name,
      shoes.brand,
      shoes.description,
      shoes.price,
      shoes.sold_copies,
      shoes.updated_at,
      IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
      discounts.value AS discount_value,
      GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
      GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
      GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
      GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
      GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
      GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
      GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM shoes
      LEFT JOIN variants ON variants.shoe_id = shoes.id
      LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
      LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
      LEFT JOIN tags ON tags.id = shoe_tags.tag_id
      LEFT JOIN discounts ON discounts.id = shoes.discount_id
      WHERE shoes.brand = ?
    GROUP BY shoes.id`

  connection.query(sql, [brand], (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })
}
function indexSearch(req, res) {
  const { brand, size, color, price, name, search, tags, onsale } = req.query

  console.log(tags)

  let sql = `SELECT 
  shoes.id,
  shoes.name,
  shoes.brand,
  shoes.description,
  shoes.price,
  shoes.sold_copies,
  shoes.updated_at,
  IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
  discounts.value AS discount_value,
  GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
  GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
  GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
  GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
  GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
  GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
  GROUP_CONCAT(DISTINCT tags.name) AS tags
  FROM shoes
  LEFT JOIN variants ON variants.shoe_id = shoes.id
  LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
  LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
  LEFT JOIN tags ON tags.id = shoe_tags.tag_id
  LEFT JOIN discounts ON discounts.id = shoes.discount_id
  WHERE 1=1
   `
  const params = []

  if (brand) {
    sql += ' AND shoes.brand = ?'
    params.push(brand)
  }
  if (size) {
    sql += ' AND variants.size LIKE ?'
    params.push(`%${size}%`)
  }
  if (color) {
    sql += ' AND variants.color = ?'
    params.push(color)
  }
  if (price) {
    sql += ' AND shoes.price > ?'
    params.push(price)
  }
  if (name) {
    sql += ' AND shoes.name LIKE ?'
    params.push(`%${name}%`)
  }
  if (search) {
    sql += ` AND (shoes.name LIKE ? OR shoes.brand LIKE ? OR variants.color LIKE ? OR shoes.price LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (onsale === true || onsale === "true") {
    sql += ' AND discounts.value IS NOT NULL AND discounts.value > 0'
  }
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(',');
    const placeholders = tagArray.map(() => '?').join(', ');
    sql += ` AND tags.name IN (${placeholders})`;
    params.push(...tagArray);
    sql += ` GROUP BY shoes.id`;
    sql += ` HAVING COUNT(DISTINCT tags.name) = ?`;
    params.push(tagArray.length);
  } else {
    sql += ` GROUP BY shoes.id`;
  }



  connection.query(sql, params, (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })

}
function indexNewProducts(req, res) {
  const sql = ` SELECT
shoes.id,
shoes.name,
shoes.brand,
shoes.description,
shoes.price,
shoes.sold_copies,
shoes.updated_at,
IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
discounts.value AS discount_value,
GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
GROUP_CONCAT(DISTINCT tags.name) AS tags
FROM shoes
LEFT JOIN variants ON variants.shoe_id = shoes.id
LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
LEFT JOIN tags ON tags.id = shoe_tags.tag_id
LEFT JOIN discounts ON discounts.id = shoes.discount_id
GROUP BY shoes.id
ORDER BY shoes.updated_at DESC
LIMIT 9;`

  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })
}

function indexPopularProducts(req, res) {
  const sql = ` SELECT
shoes.id,
shoes.name,
shoes.brand,
shoes.description,
shoes.price,
shoes.sold_copies,
shoes.updated_at,
IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
discounts.value AS discount_value,
GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
GROUP_CONCAT(DISTINCT tags.name) AS tags
FROM shoes
LEFT JOIN variants ON variants.shoe_id = shoes.id
LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
LEFT JOIN tags ON tags.id = shoe_tags.tag_id
LEFT JOIN discounts ON discounts.id = shoes.discount_id
GROUP BY shoes.id
ORDER BY shoes.sold_copies DESC
LIMIT 9;`

  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })
}

function indexOnSale(req, res) {
  const sql = `SELECT
shoes.id,
shoes.name,
shoes.brand,
shoes.description,
shoes.price,
shoes.sold_copies,
shoes.updated_at,
IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
discounts.value AS discount_value,
GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
GROUP_CONCAT(DISTINCT variants.image_urls) AS variant_images_urls,
GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
GROUP_CONCAT(DISTINCT tags.name) AS tags
FROM shoes
LEFT JOIN variants ON variants.shoe_id = shoes.id
LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
LEFT JOIN tags ON tags.id = shoe_tags.tag_id
LEFT JOIN discounts ON discounts.id = shoes.discount_id
WHERE discounts.value = 10
GROUP BY shoes.id
LIMIT 9;`

  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneakers not found' })
    res.json(results)
  })
}

function show(req, res) {
  const id = Number(req.params.id)
  const sql = `
  SELECT  shoes.id,
  shoes.name,
  shoes.brand,
  shoes.description,
  shoes.price,
  shoes.discounted_price,
  discounts.value AS discount_value,
  IF(discounts.value IS NOT NULL, shoes.price - (shoes.price * discounts.value / 100), shoes.price) AS discounted_price,
  discounts.value AS discount_value,
  GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
  GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
  GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
  GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
  GROUP_CONCAT(DISTINCT variants.sku) AS variant_sku,
  GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
  GROUP_CONCAT(DISTINCT tags.name) AS tags
  FROM shoes 
  LEFT JOIN variants ON variants.shoe_id = shoes.id
  LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
  LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
  LEFT JOIN tags ON tags.id = shoe_tags.tag_id
  LEFT JOIN discounts ON discounts.id = shoes.discount_id
  WHERE shoes.id=?
  GROUP BY shoes.id;
  `
  const variantsSql = `SELECT * FROM variants WHERE shoe_id= ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'sneaker not found' })
    const sneaker = results[0]


    connection.query(variantsSql, [id], (err, variant) => {
      if (err) return res.status(500).json({ error: err.message })
      sneaker.variants = variant
      res.json(sneaker)
    })


  })
}
function updateSoldCopies(req, res) {
  const id = Number(req.params.id)
  const { quantity } = req.body

  if (!quantity || isNaN(quantity)) {
    return res.status(400).json({ error: 'Valid quantity is required' })
  }
  const updateSoldCopiesSql = `
    UPDATE shoes 
    SET sold_copies = sold_copies + ? 
    WHERE id = ?
  `
  const updateStockSql = `
  UPDATE variants
  SET stock = stock - ?
  WHERE shoe_id = ?
  `
  connection.query(updateSoldCopiesSql, [quantity, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shoe not found' })
    }

    connection.query(updateStockSql, [quantity, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Shoe not found' })
      }
      res.json({
        message: 'Sold copies updated successfully',
        shoe_id: id,
        quantity_added: quantity
      })

    })
  })
}
module.exports = {
  index,
  indexBrand,
  indexNewProducts,
  indexPopularProducts,
  indexOnSale,
  indexSearch,
  show,
  updateSoldCopies,

}

