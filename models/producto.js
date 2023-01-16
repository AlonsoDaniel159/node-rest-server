import mongoose, { Schema } from "mongoose";

export const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'Ya existe un producto con ese nombre']
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }

});

productSchema.methods.toJSON = function () {
    const { __v, available, status, ...producto } = this.toObject();

    if (producto.user._id){
        producto.user.uid = producto.user._id
        delete producto.user._id
    }
 
    return producto;
}

export const modelProduct = mongoose.model('Producto', productSchema);