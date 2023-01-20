import styled from "styled-components";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AiFillCalculator } from "react-icons/ai";
export const DivSettingSubContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const PsauGradeCalc: React.FC = () => {
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);

  const card = (
    <>
      <CardContent sx={{ backgroundColor: navBg, color: "white" }}>
        <Typography variant='h5' component='div' sx={{ marginBottom: "20px" }}>
          Grade Calculator{" "}
          <span style={{ color: "white" }}>
            <AiFillCalculator />
          </span>
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: "20px" }}>
          Copy Paste your grade to automatically calculate it
        </Typography>
        <a
          href='https://gwa-calculator-mmv.netlify.app/'
          target='_blank'
          rel='noreferrer'
          style={{ textDecoration: "none" }}
        >
          <Button size='small' variant='contained' color='success'>
            Try Now!
          </Button>
        </a>
      </CardContent>
    </>
  );

  return (
    <Card variant='outlined' sx={{ minWidth: "300px", maxWidth: "300px", textAlign: "center" }}>
      {card}
    </Card>
  );
};

export default PsauGradeCalc;
