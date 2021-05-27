require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const inquiryModel = require("./models/inquiry");
const answerModel = require("./models/answer");
const app = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
} catch(error) {
    console.log(error)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/answers', (req, res) => {

  const identifier = req.header('answerIdentifier')
  answerModel.find({answerIdentifier:identifier, dataType:"answers"}, function(err, items){
      if(err) {
        console.log("Failed to find items. Reason:",err);
        return res.status(500).json({message:"Internal server error"})
      }
      return res.status(200).json(items);
  })
})

app.get('/api/inquiries', (req, res) => {
  const identifier = req.header('inquiryIdentifier')
  inquiryModel.find({dataType:"questions"}, function(err, items){
      if(err) {
        console.log("Failed to find items. Reason:",err);
        return res.status(500).json({message:"Internal server error"})
      }
      return res.status(200).json(items);
  })
})

app.get('/api/inquiry', (req, res) => {
  const identifier = req.header('inquiryIdentifier')
  inquiryModel.find({inquiryIdentifier:identifier,dataType:"questions"}, function(err, items){
      if(err) {
        console.log("Failed to find items. Reason:",err);
        return res.status(500).json({message:"Internal server error"})
      }
      return res.status(200).json(items);
  })
})

app.post('/api/inquiries', (req, res) => {
  const body = req.body
  console.log(body)
  
  const inquiry = new inquiryModel({
    inquiryIdentifier: body.inquiryIdentifier,
    customerName: body.customerName,
    projectName: body.projectName,
    dataType: body.dataType,
    checkBoxQuestions:{
      firstCheckBox: body.checkBoxQuestions.firstCheckBox,
      secondCheckBox: body.checkBoxQuestions.secondCheckBox,
      thirdCheckBox: body.checkBoxQuestions.thirdCheckBox,
      fourthCheckBox: body.checkBoxQuestions.fourthCheckBox,
      fifthCheckBox: body.checkBoxQuestions.fifthCheckBox
      },
    numberValueQuestions:{
      firstNumberValue: body.numberValueQuestions.firstNumberValue,
      secondNumberValue: body.numberValueQuestions.secondNumberValue,
      thirdNumberValue: body.numberValueQuestions.thirdNumberValue,
      fourthNumberValue: body.numberValueQuestions.fourthNumberValue,
      fifthNumberValue: body.numberValueQuestions.fifthNumberValue
      },
    answerWithTextQuestion: body.answerWithTextQuestion
  })

  inquiry.save(function(err){
    if(err){
      console.log("Failed to save item. Reason:",err);
			return res.status(500).json({message:"Internal server error"})
    }
    return res.status(201).json({message:"success!"})
  })
})

// Checking if in production or dev environment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})