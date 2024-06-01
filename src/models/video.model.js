import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,  // Cloudinary URL
        required: [true, "Video File Must be Upload"]
    },
    thumbnail: {
        type: String,  // Cloudinary URL
        required: [true, "Thumbnail Must be Required"]
    },
    title: {
        type: String,
        required: [true, "Title Must be Required"]
    },
    description: {
        type: String,
        required: [true, "Description Must be Required"]
    },
    duration: {
        type: Number,  // Cloudinary te jokhon video upload korbo tokhon cloudinary video er information provide kore,  tokhon okhan thekei video er duration er information niye nebi
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)