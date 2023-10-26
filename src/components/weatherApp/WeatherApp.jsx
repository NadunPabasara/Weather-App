import * as React from "react";
import "./WeatherApp.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";

import d01 from "../assets/01d.png";
import n01 from "../assets/01n.png";
import d02 from "../assets/02d.png";
import n02 from "../assets/02n.png";
import d03 from "../assets/03d.png";
import d04 from "../assets/04d.png";
import d09 from "../assets/09d.png";
import d10 from "../assets/10d.png";
import n10 from "../assets/10n.png";
import d11 from "../assets/11d.png";
import d13 from "../assets/13d.png";
import d50 from "../assets/50d.png";

const InfoBack = styled(Paper)(({ theme }) => ({
  backgroundColor: "#8D92AD", // Background color
  ...theme.typography.body2,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  color: "#FFFFFF",
  borderRadius: "15px",
  fontSize: 32,
  boxShadow: "none",
}));

const Inside = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff00", // Background color
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "#FFFFFF",
  borderRadius: "15px",
  boxShadow: "none",
  borderColor: "#FFF",
  border: "1px solid #FFF",
  textAlign: "center",
}));

const WeatherApp = () => {
  const [city, setCity] = React.useState("New york");
  const [weatherData, setWeatherData] = React.useState("");

  const iconMapping = {
    "01d": d01,
    "01n": n01,
    "02d": d02,
    "02n": n02,
    "03d": d03,
    "03n": d03,
    "04d": d04,
    "04n": d04,
    "09d": d09,
    "09n": d09,
    "10d": d10,
    "10n": n10,
    "11d": d11,
    "11n": d11,
    "13d": d13,
    "13n": d13,
    "50d": d50,
    "50n": d50,
  };

  const weatherIcon =
    weatherData && weatherData.list
      ? weatherData.list[0].weather[0].icon
      : null;

  const iconFileName = iconMapping[weatherIcon] || d01;

  const apiKey = "2ef2090a46d467db47367b2f1fdc7968";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error("Error fetching weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page refresh
    fetchData();
    setCity(""); // Clear the search box after clicking
  };

  React.useEffect(() => {
    fetchData();
    setCity(""); // Clear the search box after clicking
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#201086",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          margin: "20px",
          backgroundColor: "#60699B",
          textAlign: "center",
          maxWidth: "1200px",
          height: "fit-content",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          {/*Search box*/}
          <Paper
            sx={{
              p: "1px 4px",
              display: "flex",
              alignItems: "center",
              borderRadius: "15px",
              backgroundColor: "#8D92AD",
              boxShadow: "none",
            }}
          >
            <IconButton
              type="button"
              sx={{ p: "6px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
            <form onSubmit={handleSearch}>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#FFF" }}
                placeholder="Search City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </form>
          </Paper>
        </Grid>

        <Grid container sx={{ paddingTop: "20px" }} spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <InfoBack>
              {weatherData ? weatherData.city.name : "Invalid City"}
              <img
                src={iconFileName}
                alt="Weather_icon"
                className="icon"
                width="156"
              />
              <Box sx={{ fontSize: 60, textAlign: "center" }}>
                {weatherData && weatherData.list
                  ? Math.round(weatherData.list[0].main.temp)
                  : "No data"}
                °<sup>c</sup>
              </Box>
              <Box
                sx={{
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {weatherData && weatherData.list
                  ? weatherData.list[0].weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                    weatherData.list[0].weather[0].description.slice(1)
                  : "No data"}
              </Box>
            </InfoBack>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <InfoBack>
              <Box sx={{ fontSize: 16, paddingBottom: "10px" }}>
                Hourly Forecast
              </Box>
              <Grid
                container
                sx={{ justifyContent: "center", overflow: "auto" }}
                rowSpacing={{ xs: 1 }}
                columnSpacing={{ xs: 2, sm: 1 }}
              >
                {weatherData &&
                  weatherData.list &&
                  weatherData.list.slice(1, 7).map((hourData, index) => (
                    <Grid item xs={4} sm={4} md={2} key={index}>
                      <Inside>
                        <p style={{ fontSize: 14, margin: 0 }}>
                          {hourData.dt_txt.slice(11, 16)}
                        </p>
                        <img
                          src={iconMapping[hourData.weather[0].icon]}
                          alt=""
                          className="icon"
                          width="60"
                          height="60"
                        />
                        <Box sx={{ fontSize: 24 }}>
                          {Math.round(hourData.main.temp)}°<sup>c</sup>
                        </Box>
                      </Inside>
                    </Grid>
                  ))}
              </Grid>
            </InfoBack>

            <Grid
              container
              sx={{
                paddingTop: "8px",
              }}
              rowSpacing={{ xs: 1, sm: 1 }}
              columnSpacing={{ xs: 2, sm: 1 }}
            >
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <InfoBack sx={{ minHeight: "111px" }}>
                  <Box
                    sx={{
                      fontSize: 16,
                      paddingBottom: "10px",
                    }}
                  >
                    Wind Speed
                  </Box>
                  <Box
                    sx={{
                      fontSize: 32,
                      paddingY: "10px",
                      textAlign: "center",
                    }}
                  >
                    {weatherData && weatherData.list
                      ? (weatherData.list[0].wind.speed * 3.6).toFixed(1)
                      : "No data"}
                    km/h
                  </Box>
                </InfoBack>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <InfoBack sx={{ minHeight: "111px" }}>
                  <Box
                    sx={{
                      fontSize: 16,
                      paddingBottom: "10px",
                    }}
                  >
                    Feels Like
                  </Box>
                  <Box
                    sx={{
                      fontSize: 32,
                      paddingY: "10px",
                      textAlign: "center",
                    }}
                  >
                    {weatherData && weatherData.list
                      ? Math.round(weatherData.list[0].main.feels_like)
                      : "No data"}
                    °<sup>c</sup>
                  </Box>
                </InfoBack>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <InfoBack sx={{ minHeight: "111px" }}>
                  <Box
                    sx={{
                      fontSize: 16,
                      paddingBottom: "10px",
                    }}
                  >
                    Pressure
                  </Box>
                  <Box
                    sx={{
                      fontSize: 32,
                      paddingY: "10px",
                      textAlign: "center",
                    }}
                  >
                    {weatherData && weatherData.list
                      ? Math.round(weatherData.list[0].main.pressure)
                      : "No data"}
                    mb
                  </Box>
                </InfoBack>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <InfoBack sx={{ minHeight: "111px" }}>
                  <Box
                    sx={{
                      fontSize: 16,
                      paddingBottom: "10px",
                    }}
                  >
                    Humidity
                  </Box>
                  <Box
                    sx={{
                      fontSize: 32,
                      paddingY: "10px",
                      textAlign: "center",
                    }}
                  >
                    {weatherData && weatherData.list
                      ? Math.round(weatherData.list[0].main.humidity)
                      : "No data"}
                    %
                  </Box>
                </InfoBack>
              </Grid>
            </Grid>
          </Grid>

          {/*Small set*/}
          <Grid
            container
            sx={{ paddingTop: "8px", paddingLeft: "8px" }}
            spacing={1}
          >
            <Grid
              item
              xs={6}
              sm={3}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <InfoBack sx={{ minHeight: "111px" }}>
                <Box
                  sx={{
                    fontSize: 16,
                    paddingBottom: "10px",
                  }}
                >
                  Wind Speed
                </Box>
                <Box
                  sx={{
                    fontSize: 32,
                    paddingY: "10px",
                    textAlign: "center",
                  }}
                >
                  {weatherData && weatherData.list
                    ? (weatherData.list[0].wind.speed * 3.6).toFixed(1)
                    : "No data"}
                  km/h
                </Box>
              </InfoBack>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <InfoBack sx={{ minHeight: "111px" }}>
                <Box
                  sx={{
                    fontSize: 16,
                    paddingBottom: "10px",
                  }}
                >
                  Feels Like
                </Box>
                <Box
                  sx={{
                    fontSize: 32,
                    paddingY: "10px",
                    textAlign: "center",
                  }}
                >
                  {weatherData && weatherData.list
                    ? Math.round(weatherData.list[0].main.feels_like)
                    : "No data"}
                  °<sup>c</sup>
                </Box>
              </InfoBack>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <InfoBack sx={{ minHeight: "111px" }}>
                <Box
                  sx={{
                    fontSize: 16,
                    paddingBottom: "10px",
                  }}
                >
                  Pressure
                </Box>
                <Box
                  sx={{
                    fontSize: 32,
                    paddingY: "10px",
                    textAlign: "center",
                  }}
                >
                  {weatherData && weatherData.list
                    ? Math.round(weatherData.list[0].main.pressure)
                    : "No data"}
                  mb
                </Box>
              </InfoBack>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <InfoBack sx={{ minHeight: "111px" }}>
                <Box
                  sx={{
                    fontSize: 16,
                    paddingBottom: "10px",
                  }}
                >
                  Humidity
                </Box>
                <Box
                  sx={{
                    fontSize: 32,
                    paddingY: "10px",
                    textAlign: "center",
                  }}
                >
                  {weatherData && weatherData.list
                    ? Math.round(weatherData.list[0].main.humidity)
                    : "No data"}
                  %
                </Box>
              </InfoBack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherApp;
