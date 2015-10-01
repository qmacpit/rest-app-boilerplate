module.exports = {
	hashPassword: function(username, password) {
		return CryptoJS.PBKDF2(password, username, { keySize: 256/32 }).toString();
	}
};