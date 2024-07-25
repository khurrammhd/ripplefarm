import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native"
import { Button, Card, Chip, Divider, Icon, Text } from "react-native-paper"
import { styles } from "./HomeScreen.styles"
import { useQuery } from "react-query"
import { apiClient, endpoints } from "../../api"
import { Course } from "../../types/course"
import { CourseItem } from "../CoursesScreen/components/CourseItem"
import { useNavigation } from "@react-navigation/native"
import { Weather } from "../../types/weather"
import { generateEndpoint } from "../../utils/generateEndpoint"
import { WEATHER_ICONS } from "../../constants/weatherIcons"
import { format } from "date-fns"

const articles = [
  {
    id: 1,
    title: "Sustainable Farming Practices",
    excerpt: "Learn about sustainable farming practices that are being implemented in Rwanda...",
    image: require("../../assets/farming.jpg"),
  },
  {
    id: 2,
    title: "Rwanda's Agricultural Growth",
    excerpt: "Discover the growth in Rwanda's agriculture over the past decade...",
    image: require("../../assets/livestock.jpg"),
  },
]

// const marketPrices = [
//   { id: 1, name: "Rice", price: "1200 RWF/kg", trend: "up" },
//   { id: 2, name: "Maize", price: "800 RWF/kg", trend: "down" },
//   { id: 3, name: "Beans", price: "1000 RWF/kg", trend: "stable" },
// ]

export const HomeScreen = () => {
  const navigation = useNavigation()

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await apiClient.get<Course[]>(endpoints.COURSES)

      return data
    },
  })
  const { data: dailyWeatherList } = useQuery({
    queryKey: ["weathers", 1],
    queryFn: async () => {
      const { data } = await apiClient.get<Weather>(
        generateEndpoint(endpoints.DISTRICT_WEATHER_DETAIL, { id: 1 })
      )

      return data.weather.daily.slice(undefined, 3)
    },
  })

  return (
    <ScrollView>
      <View style={styles.homeScreen}>
        <Text style={styles.sectionTitle}>Featured articles</Text>
        {articles.map((article) => (
          <Card key={article.id} style={styles.card} mode="contained">
            <Card.Cover style={styles.articleImage} source={article.image} />
            <Card.Title titleStyle={styles.cardTitle} title={article.title} />
            <Card.Content>
              <Text>{article.excerpt}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" theme={{ colors: { outline: "tomato" } }}>
                Read more
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Divider style={styles.divider} />

        <Text style={styles.chatbotTitle}>Meet Our Chatbot</Text>
        <Text variant="bodyMedium">
          Our friendly chatbot is here to help you with general knowledge, courses available in the
          app, weather updates, and market prices. Get quick answers and stay informed with the
          latest agricultural trends.
        </Text>
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("ChatBot")
          }}>
          Try it!
        </Button>

        <Divider style={styles.divider} />

        <View style={styles.courseList}>
          <Text style={styles.sectionTitle}>Courses</Text>
          {courses
            ?.slice(undefined, 2)
            .map((course) => <CourseItem key={course.id} course={course} btnMode="outlined" />)}
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Weather Report</Text>
        {dailyWeatherList?.map((dailyWeather) => (
          <Card key={dailyWeather.dt} style={styles.weatherCard} mode="contained">
            <Card.Title
              title={format(new Date(dailyWeather.dt * 1000), "eeee")}
              titleStyle={styles.weatherTitle}
              subtitle={format(new Date(dailyWeather.dt * 1000), "dd.MM")}
              left={() => (
                <Image
                  style={styles.weatherIcon}
                  source={WEATHER_ICONS[dailyWeather.weather[0].main]}
                />
              )}
              right={({ size }) => (
                <View style={styles.weatherInfoWrapper}>
                  <View style={styles.temperatureContainer}>
                    <Icon size={size} color="#ADD8E6" source="thermometer-low" />
                    <Text style={styles.minColor}>{Math.round(dailyWeather.temp.min)}°C</Text>
                  </View>
                  <View style={styles.temperatureContainer}>
                    <Icon size={size} color="#FF7F7F" source="thermometer-high" />
                    <Text style={styles.maxColor}>{Math.round(dailyWeather.temp.max)}°C</Text>
                  </View>
                </View>
              )}
            />
          </Card>
        ))}

        {/* <Divider style={styles.divider} /> */}
        {/*
        <Text style={styles.sectionTitle}>Market Prices</Text>
        <Card style={styles.card} mode="contained">
          {marketPrices.map((item) => (
            <View key={item.id} style={styles.marketItem}>
              <Text style={styles.marketText}>{item.name}</Text>
              <Text style={styles.marketText}>{item.price}</Text>
              <Text style={styles.trendText}>
                {item.trend === "up" && "⬆️"}
                {item.trend === "down" && "⬇️"}
                {item.trend === "stable" && "➡️"}
              </Text>
            </View>
          ))}
        </Card> */}
      </View>
    </ScrollView>
  )
}
