import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Inquiry = () =>{

    const [isReady, setIsReady] = useState(false)
    const [sendToCustomer, setSendToCustomer] = useState('')
    const [amountOfQuestions, setAmountOfQuestions] = useState(0)
    const [inquiryContent, setInquiryContent] = useState({
        inquiryIdentifier: "",
        customerName: "",
        projectName: "",
        dataType: "questions",
        checkBoxQuestions:{
            firstCheckBox: "",
            secondCheckBox: "",
            thirdCheckBox: "",
            fourthCheckBox: "",
            fifthCheckBox: ""	
            },
        numberValueQuestions:{
            firstNumberValue: "",
            secondNumberValue: "",
            thirdNumberValue: "",
            fourthNumberValue: "",
            fifthNumberValue: ""
            },
        answerWithTextQuestion: ""
        })

    useEffect(() => {
        setButton();
        }, [amountOfQuestions]); 

    const onChange = (event) => {
        event.preventDefault()
        
        const [section, key] = event.target.name.split(".");

        if (key) {
            setInquiryContent({
              ...inquiryContent,
              [section]: {
                ...inquiryContent[section],
                [key]: event.target.value
              }
            });
          } else {
            setInquiryContent({
              ...inquiryContent,
              [section]: event.target.value
            });
          }
          
          if(section==="checkBoxQuestions"||section==="numberValueQuestions"||section==="answerWithTextQuestion"){
            setAmountOfQuestions(amountOfQuestions+1)
          }
          
    }

    const setButton = () => {
        if(amountOfQuestions>0&&inquiryContent.inquiryIdentifier.length>4&&
            inquiryContent.customerName.length>0&&inquiryContent.projectName.length>0){
                let button=document.getElementById("submitInquiry")
                button.disabled=false
          }
    }

    const addNewInquiry = async (event) => {
        console.log("addNewInquiryssä ", inquiryContent)
        event.preventDefault()
        setSendToCustomer(inquiryContent.inquiryIdentifier)
        await axios
            .post('/api/inquiries', inquiryContent)
            .then(response => {
                setInquiryContent({
                    inquiryIdentifier: "",
                    customerName: "",
                    projectName: "",
                    dataType: "questions",
                    checkBoxQuestions:{
                        firstCheckBox: "",
                        secondCheckBox: "",
                        thirdCheckBox: "",
                        fourthCheckBox: "",
                        fifthCheckBox: ""	
                        },
                    numberValueQuestions:{
                        firstNumberValue: "",
                        secondNumberValue: "",
                        thirdNumberValue: "",
                        fourthNumberValue: "",
                        fifthNumberValue: ""
                        },
                    answerWithTextQuestion: ""
                })
                setIsReady(true)
        }).catch(err => {
            alert("Tallennus ei onnistunut. Yritä uudella tunnuksella.")
        })
        
    }

    let i=0
    let checkBoxQuestionsOutput = Object.keys(inquiryContent.checkBoxQuestions).map(key =>{
        
        let name="checkBoxQuestions."+key
        i+=1
        return(
            <div key={key}>
                {i}. <input type="text"
                        name={name}
                        onChange={onChange}
                        value={inquiryContent.checkBoxQuestions[key]}/>
            </div>
        )
    })

    let j=0
    let numberValueQuestionsOutput = Object.keys(inquiryContent.numberValueQuestions).map(key =>{
        
        let name="numberValueQuestions."+key
        j+=1
        return(
            <div key={key}>
                {j}. <input type="text"
                        name={name}
                        onChange={onChange}
                        value={inquiryContent.numberValueQuestions[key]}/>
            </div>
        )
    })

    return(
        <div>
        {!isReady?
        <div>
            <h2>Luo uusi kysely</h2>
            <form onSubmit={addNewInquiry}>
                <div>
                    <label>Kyselyn tunnus:</label>
                    <input type="text"
                            name="inquiryIdentifier"
                            onChange={onChange}
                            value={inquiryContent.inquiryIdentifier}/>
                </div>
                <div>
                    <label>Asiakkaan nimi:</label>
                    <input type="text"
                            name="customerName"
                            onChange={onChange}
                            value={inquiryContent.customerName}/>
                </div>
                <div>
                    <label>Projektin nimi:</label>
                    <input type="text"
                            name="projectName"
                            onChange={onChange}
                            value={inquiryContent.projectName}/>
                </div>
                <br/>
                <label>Rasti ruutuun -kysymykset:</label>
                {checkBoxQuestionsOutput}
                <br/>
                <label>Numerolla arvioitavat kysymykset:</label>
                {numberValueQuestionsOutput}
                <br/>
                <div>
                    <label>Tekstivastauskysymys:</label>
                    <input type="text"
                            name="answerWithTextQuestion"
                            onChange={onChange}
                            value={inquiryContent.answerWithTextQuestion}/>
                </div>
                <br/>
                <button type = "submit" id="submitInquiry" disabled>Luo palautekysely</button>
            </form>
            
        </div>:
            <div>
            <p>Kysely on valmis.</p>
            <p>Voit lähettää asiakkaalle linkin vastaussovellukseen: xxxx ja kyselyn tunnuksen: {sendToCustomer}</p>
            </div>
            }
        </div>
    )
}

export default Inquiry;