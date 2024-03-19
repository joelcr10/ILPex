"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Middleware to verify JWT token and attach decoded data to the request body
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const { JWTTOKENCODE } = process.env;
const verifyLoginJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }
    token = token === null || token === void 0 ? void 0 : token.split("Bearer ")[1];
    //verify the token
    if (JWTTOKENCODE) {
        jsonwebtoken_1.default.verify(token, JWTTOKENCODE, (error, decoded) => {
            if (error) {
                return res.status(404).json({ error: `${error}` });
            }
            //attach the decoded payload to the request object for further use
            req.body.jwt_decoded = decoded;
            next();
        });
    }
    else {
        return res.status(404).json({ error: `Unable to sign the token. Check if JWTTOKENCODE and userFound are defined` });
    }
    ;
};
exports.default = verifyLoginJWT;
