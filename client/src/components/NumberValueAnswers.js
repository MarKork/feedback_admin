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
          <table>  
              <tbody>
                {output}
            </tbody>
         </table>
        </div>
    )

}

export default NumberValueAnswers;