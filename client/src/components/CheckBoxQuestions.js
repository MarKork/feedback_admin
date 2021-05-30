const CheckBoxQuestions = ({inquiryContent, setInquiryContent}) =>{

  window.addEventListener("load", function(event) {
    console.log("windowsta length on ",document.getElementsByClassName('removeBtn').length);
  });


    const handleInputChange = (event, index) => {
        event.preventDefault();
        console.log("event.target on ", event.target)
        const { name, value } = event.target;
        console.log("name on ", name)
        console.log("value on ", value)
        const list = [...inquiryContent.checkBoxQuestions];
        list[index][name] = value;
        setInquiryContent({
            ...inquiryContent,
            [inquiryContent.checkBoxQuestions]: {
              ...inquiryContent[inquiryContent.checkBoxQuestions],
              [inquiryContent.checkBoxQuestions[index]]: event.target.value
            }
          });
        
      };
       
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        
        if(inquiryContent.checkBoxQuestions.length===1){
          let button=document.getElementsByClassName("removeBtn")
          button.disabled=true
        }else{
          let buttons=document.getElementsByClassName("removeBtn")
          for(let i=0;i<buttons.length;i++){
            buttons[i].disabled=true
          }
        }

        console.log("index on ", index)
        console.log(inquiryContent)
        const list = inquiryContent.checkBoxQuestions;
        console.log(list)
        list.splice(index, 1);
        console.log(list)
        setInquiryContent({
            ...inquiryContent,
            [inquiryContent.checkBoxQuestions]: list
        });
      };
       
      const buttons = () => {
        let buttons=document.getElementsByClassName("removeBtn")
        console.log("button on ", buttons)
        console.log("buttons length on ", buttons.length)
        
        for(let i=0;i<buttons.length;i++){
          console.log("forissa i on ", i)
          console.log("forissa buttons[i] on ", buttons[i])
          //buttons[i].disabled=false
        }
        //return ('')
      }

      // handle click event of the Add button
      const handleAddClick = () => {

        const list = inquiryContent.checkBoxQuestions;
        console.log(list)
        list.push({"qkey":""});
        console.log(list)
        
        setInquiryContent({
            ...inquiryContent,
            [inquiryContent.checkBoxQuestions]: list
        });

        buttons()

        
        
      };

    

    return(
        <div>
        {inquiryContent.checkBoxQuestions.map((question, i)=>{
            return(
                <div>
                    <div>
                        <input type="text"
                            name="qkey"
                            value={question.qkey}
                            onChange={event => handleInputChange(event, i)}
                            />
                            
                            {inquiryContent.checkBoxQuestions.length && <button className="removeBtn" disabled onClick={() => handleRemoveClick(i)}>Poista rivi</button>}
                            <div>
                              {inquiryContent.checkBoxQuestions.length-1===i && <button onClick={handleAddClick}>Lisää uusi rivi</button>}
                            </div>
                        
                    </div>
                    
                    {console.log(question)}
                </div>)
        })}
        
        </div>
    )
}

export default CheckBoxQuestions;
