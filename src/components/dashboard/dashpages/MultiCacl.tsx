import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
const MultiTaskCalcPage: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);

  const swapHandler = () => {
    setNum1(num2);
    setNum2(num1);
  };
  return (
    <>
      <Container sx={{ paddingTop: "150px" }}>
        <Container sx={{ color: "white", backgroundColor: "#2b4829", padding: "20px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{ color: "white", width: "40%" }}
              style={{ backgroundColor: "#ffffff9b" }}
              color='success'
              id='filled-basic'
              label='Input Number 1'
              variant='filled'
              type='number'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setNum1(Number(e.target.value!));
              }}
              value={num1}
            />
            <Button onClick={swapHandler} color='success' variant='contained'>
              {"<- Swap ->"}
            </Button>
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setNum2(Number(e.target.value!));
              }}
              value={num2}
              sx={{ color: "white", width: "40%" }}
              style={{ backgroundColor: "#ffffff9b" }}
              color='success'
              id='filled-basic'
              label='Input Number 2'
              variant='filled'
              type='number'
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center",color:'white',flexDirection:'column',padding:'1em' }}>
              <p>{num1} + {num2} = {' ' && num1+num2}</p>
              <p>{num1} - {num2} = {' ' && num1-num2}</p>
              <p>{num1} * {num2} = {' ' && num1*num2}</p>
              <p>{num1} / {num2} = {' ' && num1/num2}</p>

          </div>
        </Container>
      </Container>
    </>
  );
};

export default MultiTaskCalcPage;
