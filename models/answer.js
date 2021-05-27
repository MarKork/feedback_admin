const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	answerIdentifier:{
        type:String,
        required: true,
        minLength: 5},
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
    date: {
        type: Date, 
        default: Date.now
        },
    checkBoxAnswers:{
        firstCheckBox: {
            type:Boolean
        },
        secondCheckBox: {
            type:Boolean
        },
        thirdCheckBox: {
            type:Boolean
        },
        fourthCheckBox: {
            type:Boolean
        },
        fifthCheckBox: {
            type:Boolean
        }
    },
    numberValueAnswers:{
        firstNumberValue:{
            type:Number
        },
        secondNumberValue:{
            type:Number
        },
        thirdNumberValue:{
            type:Number
        },
        fourthNumberValue:{
            type:Number
        },
        fifthNumberValue:{
            type:Number
        }
    },
    answerWithTextAnswer:{
        type:String}
})

module.exports = mongoose.model("Answer",Schema);