
jQuery(document).ready(function() {
	jQuery('a').each(FindAddToCartLinks)
});

var MoreAddToCartPattern = /shoppingcart\.asp\?productcode=/i;
var ProductCodeStringPattern = /[^\&=]*$/i;
var ProductCodePattern = /productcode=/i;

function FindAddToCartLinks(indexInArray, valueOfElement) {
	var ProductCodeString = '';
	var ProductCode = '';
	if (MoreAddToCartPattern.test(valueOfElement)) {
		ProductCodeString = ProductCodeStringPattern.exec(valueOfElement);
		if (ProductCodeString.toString()) {
			ProductCode = ProductCodeString.toString().replace(ProductCodePattern, '');
			if (ProductCode) {
				this['ProductCode'] = unescape(ProductCode);
				jQuery(this).click(function() {
					SoftAddSingleItem(unescape(ProductCode), 1);
					return false;
				});
			}
		}
	}
}

