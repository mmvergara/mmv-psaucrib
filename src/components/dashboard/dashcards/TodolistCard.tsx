import styled from "styled-components";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
export const DivSettingSubContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const TodolistCard: React.FC = () => {
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);
  const card = (
    <>
      <CardContent sx={{ backgroundColor: navBg, color: "white" }}>
        <Typography variant='h5' component='div' sx={{ marginBottom: "20px" }}>
          To Do List <span style={{color:'white'}}  ><CgNotes/> </span>
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: "20px" }}>
          Track your task to become more productive!
        </Typography>
        <Link to='/todolist' style={{textDecoration:'none'}}>
          <Button size='small' variant='contained' color='success'>
            Try Now!
          </Button>
        </Link>
      </CardContent>
    </>
  );

  return (
    <Card variant='outlined' sx={{ minWidth: "300px", maxWidth: "300px", textAlign: "center" }}>
      {card}
    </Card>
  );
};

export default TodolistCard;
