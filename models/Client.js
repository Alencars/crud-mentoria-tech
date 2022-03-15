const mongoose = require('mongoose')

const Client = mongoose.model('Client', {
    name: String,
    email: String,
    telephone: String,
    approved: Boolean,
})

module.exports = Client