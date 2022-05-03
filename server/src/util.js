var md5 = require('js-md5');

export function encode_password(text){
    var hash = md5.create();
    hash.update(text);
    return hash.hex();
}

