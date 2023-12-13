const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
          // YOUR USER ID
            //author: '65135622d1b2891a3031babd',
            author: '651db77ef0af0a4dcb5b93ff',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ex, facere impedit ad quo esse adipisci eveniet dicta sit, commodi quaerat soluta laudantium molestias doloribus officia numquam necessitatibus corrupti voluptate!',
            price,
            geometry: {
              type: "Point",
              coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/dl9luygdi/image/upload/v1696876514/YelpCamp/qctaryqsvlqxfpyg9ire.jpg',
                  filename: 'YelpCamp/bc35wvfkthrcupj3fvsk',
                }
              ]

        })
        await camp.save();
    }
}

seedDb();

