const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://placeimg.com/640/480/nature',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ex, facere impedit ad quo esse adipisci eveniet dicta sit, commodi quaerat soluta laudantium molestias doloribus officia numquam necessitatibus corrupti voluptate!',
            price

        })
        await camp.save();
    }
}

seedDb();

