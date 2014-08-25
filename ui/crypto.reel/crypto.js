/**
 * @module ui/crypto.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var AES = require("crypto-js/aes");
var CryptoEncoding = require("crypto-js/enc-utf8");

/**
 * @class Crypto
 * @extends Component
 */
exports.Crypto = Component.specialize( /** @lends Crypto# */ {
	constructor: {
		value: function Crypto() {
			this.super();
		}
	},

	handleInputAction: {
		value: function(event) {
			var encrypted = "...";
			this.templateObjects.encrypted.value = encrypted;
			var decrypted = "...."
			this.templateObjects.decrypted.value = decrypted;
		}
	}
});
