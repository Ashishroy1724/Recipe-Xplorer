import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        ingredients:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        }, 
        regularPrice:{
            type: Number,
            required: true,
        },
        discountPrice:{
            type: Number,
            required: true,
        },
        bathrooms:{
            type: Number,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        lunch:{
            type: Boolean,
            required: true,
        },
        breakfast:{
            type: Boolean,
            required: true,
        },
        snack:{
            type: Boolean,
            required: true,
        },
        // type:{
        //     type: String,
        //     required: true,
        // },
        dinner:{
            type: Boolean,
            required: true,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
        userRef:{
            type: String,
            required: true,
        },
    }, { timestamps: true }

)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;