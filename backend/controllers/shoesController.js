const connection = require('../db/boolshop_db.js')


function index(req, res) {

  const sql =
    `
SELECT
  shoes.id,
  shoes.name,
  shoes.description,
  shoes.onsale, -- assuming this column exists
  GROUP_CONCAT(DISTINCT variants.id) AS variant_ids,
  GROUP_CONCAT(DISTINCT variants.size) AS variant_sizes,
  GROUP_CONCAT(DISTINCT variants.color) AS variant_colors,
  GROUP_CONCAT(DISTINCT variants.stock) AS variant_stocks,
  GROUP_CONCAT(DISTINCT shoe_images.url) AS image_urls,
  GROUP_CONCAT(DISTINCT tags.name) AS tags
FROM shoes
  LEFT JOIN variants ON variants.shoe_id = shoes.id
  LEFT JOIN shoe_images ON shoe_images.shoe_id = shoes.id
  LEFT JOIN shoe_tags ON shoe_tags.shoe_id = shoes.id
  LEFT JOIN tags ON tags.id = shoe_tags.tag_id
GROUP BY shoes.id;

`

  connection.query(sql, [], (err, results) => {
    if (err) res.status(500).json({ message: err.message })
    res.json(results)
  })
}

module.exports = {
  index
}