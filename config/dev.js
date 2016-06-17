var path = require('path');

module.exports = {
  images: process.env.IMAGE_PATH || path.resolve(__dirname, '../../AZT Photos'),
  directions: process.env.DIRECTIONS_PATH || path.resolve(__dirname, '../../directions.csv'),
  data: process.env.DB_PATH || path.resolve(__dirname, '../../azt-photos.jsonl'),
};
