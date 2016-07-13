$(document).foundation()

var CJs = {};

CJs.FormTimeoutHandle = 0;
CJs.FormTimeout = 1 * 60 * 1000; // 1 minutes

CJs.ClearFields = function() {
    var phrase = $("#txtPassphrase");
    var secret = $("#txtInput");

    phrase.val("");
    secret.val("");
};

CJs.SecureFields = function() {
    clearTimeout(CJs.FormTimeoutHandle);

    CJs.FormTimeoutHandle = setTimeout(CJs.ClearFields, CJs.FormTimeout);
};

$("#btnEncrypt").click(function (e) {
    e.preventDefault;

    var phrase = $("#txtPassphrase");
    var secret = $("#txtInput");
    var phrasef = phrase.val().trim();
    var secretf = secret.val().trim();

    if (phrasef.length > 0 && secretf.length > 0) {
        secret.val(CryptoJS.AES.encrypt(secretf, phrasef));

        CJs.SecureFields();
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

        CJs.SecureFields();
    }
});