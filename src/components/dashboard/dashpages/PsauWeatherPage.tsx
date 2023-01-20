import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
interface weatherData {
  dt_txt: string;
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
  };
}
const PsauWeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<weatherData[] | null>(null);
  const fetchWeatherData = async () => {
    const data: any = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=15.219721&lon=120.692644&appid=89fab09afd27f114587629dcb1a68105&units=metric"
    );
    const convertedArr = data.data.list.splice(2, 5);
    setWeatherData(convertedArr);
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);
  if (weatherData === null)
    return (
      <Container sx={{ paddingTop: "150px" }}>
        return (
        <Container
          maxWidth='sm'
          sx={{
            display: "flex",
            color: "white",
            backgroundColor: "#2b4829",
            padding: "20px 10px",
          }}
        >
          <h2>loading...</h2>
        </Container>
      </Container>
    );
  return (
    <Container sx={{ paddingTop: "150px" }}>
      {weatherData.map((x) => {
        return (
          <Container
            maxWidth='sm'
            sx={{
              display: "flex",
              color: "white",
              backgroundColor: "#2b4829",
              padding: "20px 10px",
            }}
          >
            <div>
              Today <h1>{x.dt_txt.split(" ")[1].slice(0, 5)}</h1> {x.weather[0].main}
            </div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${x.weather[0].icon.slice(0, -1)}d@2x.png
      `}
                alt='ads'
              />
              <h4 style={{ display: "inline" }}>
                {x.weather[0].description} - {x.main.temp}°C
              </h4>
            </div>
          </Container>
        );
      })}
    </Container>
  );
};

export default PsauWeatherPage;
