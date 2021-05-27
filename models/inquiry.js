const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	inquiryIdentifier:{
        type:String,
        required: true,
        minLength: 5,
        unique: true},
    customerName: {
        type:String,
        required: true,
        minLength: 5
        },
    projectName: {
        type:String,
        required: true,
        minLength: 5
        },
    dataType:{
        type:String,
        required: true,
        },
    checkBoxQuestions:{
        firstCheckBox: {
            type:String
        },
        secondCheckBox: {
            type:String
        },
        thirdCheckBox: {
            type:String
        },
        fourthCheckBox: {
            type:String
        },
        fifthCheckBox: {
            type:String
        }
    },
    numberValueQuestions:{
        firstNumberValue:{
            type:String
        },
        secondNumberValue:{
            type:String
        },
        thirdNumberValue:{
            type:String
        },
        fourthNumberValue:{
            type:String
        },
        fifthNumberValue:{
            type:String
        }
    },
    answerWithTextQuestion:{
        type:String}
})

module.exports = mongoose.model("Inquiry",Schema);