import KJUR from 'jsrsasign'

const Jwt = {}


Jwt.encode = function (Head, Payload, Salt, CryptoType) {
    if (typeof Payload === 'object'){
        Payload = JSON.stringify(Payload);
    }
    if (typeof Head === 'object'){
        Head = JSON.stringify(Head);
    }
    return  KJUR.jws.JWS.sign(CryptoType, Head, Payload, Salt);

}

Jwt.verify = function (Jwt, Salt, CryptoType) {
    return KJUR.jws.JWS.verify(Jwt, Salt, CryptoType);
}

Jwt.GetPayLoad = function (Jwt) {
    return KJUR.jws.JWS.readSafeJSONString(KJUR.b64toutf8(Jwt.split(".")[1]));
}

Jwt.GetHead = function (Jwt) {
    return KJUR.jws.JWS.readSafeJSONString(KJUR.b64toutf8(Jwt.split(".")[0]));
}

export default Jwt
