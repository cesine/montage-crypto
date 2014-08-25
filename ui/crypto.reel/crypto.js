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
	/**
	 * Encrypt accepts a string (UTF8) and returns a CryptoJS object, in base64
	 * encoding so that it looks like a string, and can be saved as a string in
	 * the corpus.
	 *
	 * @param message
	 *          A UTF8 string
	 * @returns Returns a base64 string prefixed with "confidential" so that the
	 *          views can choose to not display the entire string for the user.
	 */
	encrypt: {
		value: function(value) {
			if (typeof value === 'object') {
				value = JSON.stringify(value);
				this.debug("Converted object to string before encryption");
			}
			var result = AES.encrypt(value, this.secretkey);
			// return the base64 version to save it as a string in the corpus
			return "confidential:" + btoa(result.toString());
		}
	},

	/**
	 * Decrypt uses this object's secret key to decode its parameter using the
	 * AES algorithm.
	 *
	 * @param encrypted
	 *          A base64 string prefixed (or not) with the word "confidential"
	 * @returns Returns the encrypted result as a UTF8 string.
	 */
	decrypt: {
		value: function(encrypted) {
			var result = encrypted;

			encrypted = encrypted.replace("confidential:", "");
			// decode base64
			encrypted = atob(encrypted);
			result = AES.decrypt(encrypted, this.secretkey).toString(CryptoEncoding);
			try {
				if ((result[0] === "{" && result[result.length - 1] === "}") || (result[0] === "[" && result[result.length - 1] === "]")) {
					result = JSON.parse(result);
				}
			} catch (e) {
				console.log(e);
			}
			return result;
		}
	},
	handleInputAction: {
		value: function(event) {
			var encrypted = this.encrypt(event.target.value);
			this.templateObjects.encrypted.value = encrypted;
			var decrypted = this.decrypt(encrypted);
			this.templateObjects.decrypted.value = decrypted;
		}
	}
});
