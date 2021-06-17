const fs = require('fs');
const url = require('url');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const uploadProductImage = require('./uploadProductImage');
const { RemoveBgError, removeBackgroundFromImageUrl } = require('remove.bg');

dotenv.config();
const {
  REMOVE_BG_API_URL,
  REMOVE_BG_API_KEY,
  IMAGE_DIR_PATH
} = process.env;

const removeImageBackground = async ( imgUrl, bgColor ) => {
  try {
    const parsed = url.parse(imgUrl);
    const imgFileName = path.basename(parsed.pathname).split('.').slice(0, -1).join('.') + '.png';
    const outputFile = IMAGE_DIR_PATH + '/' + imgFileName;
    const imageUrl = imgUrl.split("?v=")[0];
    console.log('image url: ', imageUrl);
    console.log('output: ', outputFile);

    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,
      apiKey: REMOVE_BG_API_KEY,
      size: "full",
      type: "product",
      bg_color: bgColor,
      outputFile
    });

    console.log(`File saved to ${outputFile}`);
    console.log(`${result.creditsCharged} credit(s) charged for this image`);
    console.log(`Result width x height: ${result.resultWidth} x ${result.resultHeight}, type: ${result.detectedType}`);
    console.log(result.base64img.substring(0, 40) + "..");
    console.log(`Rate limit: ${result.rateLimit}, remaining: ${result.rateLimitRemaining}, reset: ${result.rateLimitReset}, retryAfter: ${result.retryAfter}`);
    return imgFileName;
  } catch (err) {
    const errors = err;
    console.log(JSON.stringify(errors));
    return null;
  }
};

module.exports = removeImageBackground;