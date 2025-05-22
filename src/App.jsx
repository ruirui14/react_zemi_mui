
import './App.css'
//import { Button } from '@mui/material' 
import { Button } from "antd";
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'

function App() {
 
  // これは変なボタンのやつ　const [loading, setLoading] = useState(true);
  // function handleClick() {
  //   setLoading(true);
  // }


  return (
    <>
    <h1>HelloWorld</h1>
    <p>こんにちはこうらです</p>
    {/* <TextButton> push </TextButton>
    <Button variant="contained">contained </Button>
    <Button variant="outlined">outlined </Button> */}

    {/*MUIのボタン*/}
    {/* これは変なボタン<Button
      onClick={handleClick}
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
    >
      Send
    </Button> */}

    {/*AntDのボタン*/}
    <Button type="primary">Primary Button</Button>
    </>
    
  )
}

export default App
