
import './App.css'
import { Button } from '@mui/material' 
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'

function App() {
 
  // const TextButton = styled(Button)`
  //   text-transform: none;
  // `;

  const [loading, setLoading] = useState(true);
  function handleClick() {
    setLoading(true);
  }


  return (
    <>
    <h1>HelloWorld</h1>
    <p>こんにちはこうらです</p>
    {/* <TextButton> push </TextButton>
    <Button variant="contained">contained </Button>
    <Button variant="outlined">outlined </Button> */}

    <Button
      onClick={handleClick}
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
    >
      Send
    </Button>
    </>
    
  )
}

export default App
