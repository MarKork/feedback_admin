import React, {useState, useEffect} from 'react'
import axios from 'axios'
import NumberValueAnswers from './NumberValueAnswers'
import CheckBoxAnswers from './CheckBoxAnswers'
import dateFormat from 'dateformat';

const Answers = () =>{
    const [inquiries, setInquiries] = useState([])
    const [inquiry, setInquiry] = useState()
    const [answers, setAnswers] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getInquiries()
    }, [])

    const getInquiries = async() => {
        try {
            const response = await axios.get('/api/inquiries', {headers: {
                'dataType': 'questions'
            }})
            setInquiries(response.data)
        } catch(error) {
            console.log(error)
        }
        
    }

    const handleClick = async (event) => {
        event.preventDefault();
        
        let identifier=event.target.innerHTML
        
        if(toggle && identifier===inquiry.inquiryIdentifier){
            setToggle(false)
            setInquiry('')
            setAnswers([])
        }else{
            setToggle(true)
            setInquiry('')
            setAnswers([])
        }


        try {
            const response = await axios.get('/api/inquiry', {headers: {
                'inquiryIdentifier': identifier,
                'dataType': 'questions'
            }})
            setInquiry(response.data[0])
        } catch(error) {
            console.log(error)
        }

        try {
            const response = await axios.get('/api/answers', {headers: {
                'answerIdentifier': identifier,
                'dataType': 'answers'
            }})
            setAnswers(response.data)
            
        } catch(error) {
            console.log(error)
        }
       
    }


    return(
        <div>
            <h2>Kyselyiden vastaukset</h2>
            <label>Voit katsella vastauksia valitsemalla kyselyn tunnuksen listasta:</label>
            {inquiries? 
            <ul style={{ listStyleType: "none" }}>
            {inquiries.map(item =>
                <li key={item._id}><a href="#" name={item.id} onClick={handleClick}>{item.inquiryIdentifier}</a></li>)}
            </ul>
            :''}
            {toggle&&inquiry&&answers.length>1?
                <div>
                    <p>{inquiry.customerName}</p> 
                    <p>{inquiry.projectName}</p>
                    {answers.map(answer => {
                            return(
                                <div key={answer._id}>
                                    ***********************************************
                                    <p>vastattu: {dateFormat(answer.date,"dd.mm.yyyy")}</p>
                                    <CheckBoxAnswers answer={answer} inquiry={inquiry}/>
                                    <NumberValueAnswers answer={answer} inquiry={inquiry}/>
                                    <p>{inquiry.answerWithTextQuestion}</p>
                                    <p>{answer.answerWithTextAnswer}</p>
                                </div>
                            )
                        }) 
                    }
                </div>
            : toggle&&inquiry&&answers.length<1?<p>Tähän kyselyyn ei ole tullut vielä vastauksia</p>:''}
            
        </div>
    )
}

export default Answers;