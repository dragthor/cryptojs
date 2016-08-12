$(document).foundation()

$("#btnEncrypt").click(function (e) {
    e.preventDefault;

    var phrase = $("#txtPassphrase");
    var secret = $("#txtInput");
    var phrasef = phrase.val().trim();
    var secretf = secret.val().trim();

    if (phrasef.length > 0 && secretf.length > 0) {
        secret.val(CryptoJS.AES.encrypt(secretf, phrasef));
    }
});

$("#btnDecrypt").click(function (e) {
    e.preventDefault;

    var phrase = $("#txtPassphrase");
    var secret = $("#txtInput");
    var phrasef = phrase.val().trim();
    var secretf = secret.val().trim();

    if (phrasef.length > 0 && secretf.length > 0) {
        var result = CryptoJS.AES.decrypt(secretf, phrasef).toString(CryptoJS.enc.Utf8);

        secret.val(result);
    }
});