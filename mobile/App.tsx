import { NavigationContainer } from "@react-navigation/native"
import { MarketScreen } from "./src/screens/MarketScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { DefaultTheme, MD3Theme, PaperProvider } from "react-native-paper"
import { QueryClient, QueryClientProvider } from "react-query"
import { CoursesStack } from "./src/stacks/CoursesStack"
import { WeatherStack } from "./src/stacks/WeatherStack"
import { ChatbotScreen } from "./src/screens/ChatbotScreen"
import { HomeScreen } from "./src/screens/HomeScreen"

const Tab = createBottomTabNavigator()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
    },
  },
})

export const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "red",
    surfaceVariant: "#fcfcfc",
    secondaryContainer: "tomato",
    onSecondaryContainer: "white",
    onSurface: "#666",
    outline: "#666",
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: "#fcfcfc",
      level3: "#fcfcfc",
    },
  },
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={() => ({
              headerTitle: "Riffle Farm",
              headerTitleAlign: "center",
              headerTitleStyle: { fontStyle: "italic", color: "#666" },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: { paddingTop: 4, paddingBottom: 4 },
              tabBarLabelStyle: { fontSize: 12 },
            })}>
            <Tab.Screen
              name="ChatBot"
              component={ChatbotScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "chatbubble" : "chatbubble-outline"}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Courses"
              component={CoursesStack}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? "book" : "book-outline"} color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Weather"
              component={WeatherStack}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? "cloud" : "cloud-outline"} color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Market"
              component={MarketScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  )
}
