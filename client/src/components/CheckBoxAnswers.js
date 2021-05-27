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
            <table>
                <tbody>
                    {output}
                </tbody>
            </table>
        </div>
    )

}

export default CheckBoxAnswers;