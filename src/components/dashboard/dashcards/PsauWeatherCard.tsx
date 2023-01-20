import styled from "styled-components";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { TiWeatherCloudy } from "react-icons/ti";
import { Link } from "react-router-dom";
export const DivSettingSubContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;
 
const PsauWeatherCard: React.FC = () => {
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);

  const card = (
      <CardContent sx={{ backgroundColor: navBg, color: "white" }}>
        <Typography variant='h5' component='div' sx={{ marginBottom: "20px" }}>
          Psau Weather
          <span style={{ color: "white" }}>
            <TiWeatherCloudy/>
          </span>
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: "20px" }}>
          Check the weather in our Favorite School!
        </Typography>
        <Link to='/psauweather'
          style={{ textDecoration: "none" }}
        >
          <Button size='small' variant='contained' color='success'>
            Try Now!
          </Button>
        </Link>
      </CardContent>
    );

  return (
    <Card variant='outlined' sx={{ minWidth: "300px", maxWidth: "300px", textAlign: "center" }}>
      {card}
    </Card>
  );
};

export default PsauWeatherCard;
