import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

categorySchema.methods.toJSON = function () {
    const { __v, status, ...categoria } = this.toObject();

    if (categoria.user._id){
        categoria.user.uid = categoria.user._id
        delete categoria.user._id
    }

    return categoria;
}

export const modelCategory = mongoose.model('Categoria', categorySchema);