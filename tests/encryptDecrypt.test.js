const chai = require("chai");
const expect = chai.expect;

const passPhrase = "i like CryptoJs";

const crypto = require("../js/vendor/aes");

describe("crypto", () => {
    it("should be able to encrypt and decrypt", () => {
        let password = "mypassword";
        let encrypted = crypto.cryptoJS().AES.encrypt(password, passPhrase).toString();
        let decrypted = crypto.cryptoJS().AES.decrypt(encrypted, passPhrase).toString(crypto.cryptoJS().enc.Utf8);

        expect(decrypted).to.equal(password);
    });
});