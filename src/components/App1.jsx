
import React, { useState, useEffect } from 'react';
import './App1.css'
const App1 = () => {
  const [inputText, setInputText] = useState('');
  const [queue, setQueue] = useState([]);
  const [displayedText, setDisplayedText] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
   const interval = setInterval(() => {
      if (queue.length > 0) {
        setDisplayedText(prevDisplayedText => [...prevDisplayedText, queue[0]]);
        setQueue(queue.slice(1));
      }
      else if(displayedText.length>0){
        setShowSuccessPopup(true)
      }
    }, 10000);
    if(queue.length>0) setShowSuccessPopup(false)
    return () => clearInterval(interval);
  }, [queue]);


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    setQueue([...queue, inputText]);
    setInputText('');
  };

  const handleEndClick = () => {
    if (queue.length === 0) {
      setShowSuccessPopup(true);
    } 
  };

  const handleReset = () => {
    setInputText('');
    setQueue([]);
    setDisplayedText([]);
    setShowSuccessPopup(false);
  };

  return (
    <div className='body'>
      <h1 className='h1'>React Queue App</h1>
      <div className='inputText'>
           <label alt='enter the input text:'>Enter the input text:</label>
          <input type="text" value={inputText} onChange={handleInputChange} className='input' />
          <button onClick={handleSubmit} className='Add'>Add</button>
        </div>
      <div className='position'>
        
        
        <div className='tempData'>
          <h2>Temp Data:</h2>
          <ul>
            {queue.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        </div>

        <div className='finalData'>
          <h2>Final Data:</h2>
          <ul>
            {displayedText.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
         </div> 
        <div className='buttons'>
            <button onClick={handleEndClick} className='End'>End</button>
            <button onClick={handleReset} className='Reset'>Reset</button>
           {showSuccessPopup && <div className='success'>The queue is empty.</div> }
          </div>
         
      </div>
      );
}
export default App1;
