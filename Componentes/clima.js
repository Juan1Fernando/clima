import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const fetchWeatherData = async () => {
  try {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=86d11f8689654db785f180450230910&q=Huejutla&days=5&aqi=no&alerts=no');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const HourlyForecastCard = ({ time, temp, iconUrl }) => (
  <View style={styles.hourlyCard}>
    <Text style={styles.hourlyTime}>{time}</Text>
    <Image style={styles.hourlyImage} source={{ uri: iconUrl }} />
    <Text style={styles.hourlyTemp}>{temp}°C</Text>
  </View>
);

const CurrentWeather = ({ weatherData }) => {
  const currentHour = new Date().getHours();

  const filteredHours = weatherData.forecast.forecastday[0].hour.filter(item => {
    return new Date(item.time).getHours() >= currentHour;
  });

  return (
    <View style={[styles.weatherContainer, styles.currentWeatherContainer]}>
      <View style={styles.weatherScreen}>
        <Text style={styles.locationName}>{weatherData.location.name}</Text>
        <Image
          style={styles.currentConditionImage}
          source={{ uri: `https:${weatherData.current.condition.icon}` }}
        />
        <Text style={styles.currentTemp}>{weatherData.current.temp_c}°C</Text>
        <Text style={styles.conditionText}>
          {weatherData.current.condition.text} - {weatherData.forecast.forecastday[0].day.maxtemp_c}°C / {weatherData.forecast.forecastday[0].day.mintemp_c}°C
        </Text>
        <Text style={styles.hourlyHeader}>Pronóstico del día</Text>
        <FlatList
          data={filteredHours}
          renderItem={({ item }) => (
            <HourlyForecastCard
              time={`${new Date(item.time).getHours()}:00`}
              temp={item.temp_c}
              iconUrl={`https:${item.condition.icon}`}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hourlyList}
        />
      </View>
    </View>
  );
};

const WeeklyWeather = ({ forecast }) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const renderItem = ({ item }) => {
    const date = new Date(item.date);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return (
      <View style={styles.weeklyWeatherItem}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <View style={styles.weatherDetails}>
          <Text style={styles.temperature}>{item.day.maxtemp_c}°C / {item.day.mintemp_c}°C</Text>
          <Image style={styles.weatherIcon} source={{ uri: `https:${item.day.condition.icon}` }} />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.weatherContainer, styles.weeklyWeatherContainer]}>
      <FlatList
        data={forecast.forecastday}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.weeklyWeatherList}
      />
    </View>
  );
};

const Clima = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchWeatherData();
        setWeatherData(data);
        setIsLoading(false);
      };
      loadData();
    }, []);
  
    if (isLoading) {
      return (
        <LinearGradient colors={['#87CEEB', '#ADD8E6', '#B0C4DE']} style={styles.linearGradient}>
          <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={'#FFF'} />
            <Text style={styles.loadingText}>Cargando datos...</Text>
          </View>
        </LinearGradient>
      );
    }
  
    return (
      <LinearGradient colors={['#87CEEB', '#ADD8E6', '#B0C4DE']} style={styles.linearGradient}>
        <View style={styles.container}>
          <FlatList
            data={[{ key: 'currentWeather' }, { key: 'weeklyWeather' }]}
            renderItem={({ item }) => {
              if (item.key === 'currentWeather') {
                return <CurrentWeather weatherData={weatherData} />;
              } else if (item.key === 'weeklyWeather') {
                return <WeeklyWeather forecast={weatherData.forecast} />;
              }
            }}
            keyExtractor={item => item.key}
          />
        </View>
      </LinearGradient>
    );
  };

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFF',
  },
  weatherContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  currentWeatherContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  weeklyWeatherContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  weatherScreen: {
    alignItems: 'center',
    padding: 20,
  },
  locationName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  currentConditionImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  currentTemp: {
    fontSize: 50,
    fontWeight: '300',
    color: '#FFF',
  },
  conditionText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },
  hourlyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  hourlyList: {
    marginBottom: 20,
  },
  hourlyCard: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hourlyTime: {
    fontSize: 16,
    color: '#333',
  },
  hourlyImage: {
    height: 40,
    width: 40,
    margin: 5,
  },
  hourlyTemp: {
    fontSize: 16,
    color: '#333',
  },
  weeklyWeatherList: {
    paddingHorizontal: 10,
  },
  weeklyWeatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 14,
    marginRight: 10,
    color: '#333',
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Clima;
