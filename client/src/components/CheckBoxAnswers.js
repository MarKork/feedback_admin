const CheckBoxAnswers = ({answer, inquiry}) =>{

    let output = Object.keys(inquiry.checkBoxQuestions).map(key =>{
        
        let value=answer.checkBoxAnswers[key]
        
        return(
            <>
                {value? 
                    <tr key={key}>
                        <td><input type="checkbox" 
                            
                            checked={true}
                            readOnly={true}
                            />
                        </td>
                        <td>{inquiry.checkBoxQuestions[key]}</td>
                    </tr>
                :
                    <tr key={key}>
                        <td><input type="checkbox" 
                             
                            checked={false}
                            readOnly={true}
                            />
                        </td>
                        <td>{inquiry.checkBoxQuestions[key]}</td>
                    </tr>
                } 
            </>    
        )
    })

    return (
        <div>
            {inquiry.checkBoxQuestions.firstCheckBox.length>0||
            inquiry.checkBoxQuestions.secondCheckBox.length>0||
            inquiry.checkBoxQuestions.thirdCheckBox.length>0||
            inquiry.checkBoxQuestions.fourthCheckBox.length>0||
            inquiry.checkBoxQuestions.fifthCheckBox.length>0?
            <table>
                <tbody>
                    {output}
                </tbody>
            </table>
           :''}
        </div>
    )

}

export default CheckBoxAnswers;