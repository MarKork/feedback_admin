const NumberValueAnswers = ({answer, inquiry}) =>{
    
    let output = Object.keys(inquiry.numberValueQuestions).map(key =>{
           
        let number=answer.numberValueAnswers[key]
        if(!number){
            number="-"
        }
        return(
            
            <tr key={key}>
                <td>{inquiry.numberValueQuestions[key]}</td><td>{number}</td>
            </tr>
            
        )
    })

    return (
        <div>
            {inquiry.numberValueQuestions.firstNumberValue.length>0||
            inquiry.numberValueQuestions.secondNumberValue.length>0||
            inquiry.numberValueQuestions.thirdNumberValue.length>0||
            inquiry.numberValueQuestions.fourthNumberValue.length>0||
            inquiry.numberValueQuestions.fifthNumberValue.length>0?
                <table>  
                    <tbody>
                        {output}
                    </tbody>
                </table>
            :''}
        </div>
    )

}

export default NumberValueAnswers;