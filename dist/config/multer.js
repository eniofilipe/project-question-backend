"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = require("path");
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, res) => {
                if (err)
                    return cb(err, file.originalname);
                return cb(null, res.toString('hex') + path_1.extname(file.originalname));
            });
        },
    }),
};
//# sourceMappingURL=multer.js.map