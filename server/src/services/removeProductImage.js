//require('isomorphic-fetch');
const Shopify = require('shopify-api-node');

const removeProductImage = async (ctx, accessToken, productId, imgId) => {
	
	const shopify = new Shopify({
		shopName: ctx.state.webhook.domain,
		accessToken : accessToken
	});

	await shopify.productImage.delete(productId, imgId);
	console.log(imgId + " Image deleted");
};

module.exports = removeProductImage;