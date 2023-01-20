import axios from "axios";
import { useEffect, useState } from "react";
interface weatherData {
  dt_txt: string;
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
  };
}

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const fetchWeatherData = async () => {
    const data: any = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=15.219721&lon=120.692644&appid=89fab09afd27f114587629dcb1a68105&units=metric"
    );
    setWeatherData(data.data.list[2]);
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);
  console.log("WeatherDashboard Rerender");
  if (!weatherData) return <></>;

  return (
    <>
      <div>
        Weather - Today
        <p>
          {weatherData.weather[0].description
            .split(" ")
            .map((x) => {
              return x.charAt(0).toUpperCase() + x.slice(1);
            })
            .join(" ")}{" "}
          <br />
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon.slice(
              0,
              -1
            )}d@2x.png
      `}
            alt='ads'
          />
          <span style={{ paddingRight: "9px" }}>{weatherData.main.temp} °C</span>
        </div>
        <img
          src='https://i.ibb.co/jkm2VRM/psaumap.png'
          alt='psaumap'
          width={250}
          style={{ borderRadius: "10px" }}
        />
      </div>
    </>
  );
};

export default WeatherDashboard;
