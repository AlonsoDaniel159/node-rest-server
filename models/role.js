import mongoose, { Schema } from "mongoose";

export const roleSchema = new Schema({

    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

});


export const modelRole = mongoose.model('Role',roleSchema);