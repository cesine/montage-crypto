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
	secretkey: {
		value: "abcdefg"
	},
	handleInputAction: {
		value: function(event) {
			var encrypted = AES.encrypt(event.target.value, this.secretkey);
			this.templateObjects.encrypted.value = btoa(encrypted.toString());
			var decrypted = AES.decrypt(encrypted, this.secretkey).toString(CryptoEncoding);
			this.templateObjects.decrypted.value = decrypted;
		}
	}
});
