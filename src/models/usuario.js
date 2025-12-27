import { Schema, model } from "mongoose";

const userSchema = Schema({
  /*numero: {
    type: String,
    required: [true, "Campo obligatorio"],
    unique: true,
  },*/
  user_id: {
    type: String,
    required: [true, "Campo obligatorio"],
    unique: true,
  },
  balance: {
    type: String,
    required: false,
    unique: false,
    default: null,
  },
  /*nombre: {
    type: String,
    required: [false],
    unique:[false]
  }*/
});

userSchema.methods.toJSON = function () {
  const { _id, ...data } = this.toObject();
  return data;
};

export default model("Usuario", userSchema);
