"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs = require("bcryptjs");
const models_1 = require("../enums/models");
class UserSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            addresses: [{
                    code: Number,
                    country: String,
                    city: String,
                    quarter: String
                }],
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 4
            },
            image: String,
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
                minlength: 6
            },
            role: {
                type: String,
                enum: ["user", "admin"],
                default: "user"
            },
            savedEvents: [{ type: mongoose_1.Types.ObjectId, ref: models_1.Models.Event }],
            followers: [{ type: mongoose_1.Types.ObjectId, ref: models_1.Models.User }],
            passwordChangedAt: Date,
            passwordResetCode: String,
            passwordResetCodeExpires: Date,
            passwordResetCodeVertified: Boolean,
            lastSeen: Date,
            emailVertified: { type: Boolean, default: false },
            active: { type: Boolean, default: true },
            emailVerifiedExpired: Date,
            emailVerifiedCode: String,
            averageRating: { type: Number, default: 0 },
            ratingQuantity: { type: Number, default: 0 }
        }, {
            timestamps: true
        });
        this.schema.pre("save", async function (next) {
            if (this.isModified("password")) {
                this.password = await bcryptjs.hash(this.password, 10);
            }
            ;
            return next();
        });
        this.schema.index({ name: "text" });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/user/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/user/${this.image}`;
            }
        });
    }
    ;
}
exports.UserSchema = UserSchema;
;
;
//# sourceMappingURL=user.schema.js.map