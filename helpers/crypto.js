var CryptoJS = require("crypto-js");
const enCrypt = (data)=>{
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(data,process.env.CRYPTO_PRIVATE_KEY).toString();
    return ciphertext
}

const denCrypt = (data)=>{
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(data,process.env.CRYPTO_PRIVATE_KEY);
    var deCryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return deCryptedValue
}
module.exports={
    enCrypt:enCrypt,
    denCrypt:denCrypt
}
