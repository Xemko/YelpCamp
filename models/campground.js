const mongoose = require('mongoose');
const Review = require('./review');

const Schema = mongoose.Schema;


// https://res.cloudinary.com/dl9luygdi/image/upload/v1696598834/YelpCamp/uglxdchxwde4zt2zugiu.jpg

const ImageSchema = new Schema({
        url: String,
        filename: String 
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
