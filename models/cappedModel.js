const mongoose = require('mongoose');


const cappedCollection = new mongoose.Schema(

    {
        timestamp:{
            type: Date,
            default : Date.now
        },
        message : String
    },
    {
        capped:{
            size:100000,
            max:100
        }
    }
);
const log = mongoose.model('cappedColl', cappedCollection)