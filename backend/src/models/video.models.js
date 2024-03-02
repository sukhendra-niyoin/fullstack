import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary file
            required: [true, "Video file is required"]
        },
        thumbnail: {
            type: String, //cloudinary file
            required: [true, "Thumbnail is required"]
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, //cloudinary file duration (Video)
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
        videoOwner: {
            type: Schema.Types.ObjectId, //getting type from user.models.js
            ref: "User" //Refrence 'User'
        }

    }, { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);