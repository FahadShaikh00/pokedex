import { Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Homepage from "./components/Homepage";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";

export type RootStackParamList = {
  Home: any;
  PokeDetails: any;
  PokeList: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Header = () => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Image
      style={{ width: 50, height: 36, resizeMode: "contain" }}
      source={require("./assets/headerLogo.png")}
    />
    <Text style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>
      Pokédex
    </Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Homepage}
            options={{
              headerTitle: () => <Header />,
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="PokeDetails"
            component={PokemonDetails}
            options={{ headerTransparent: true }}
          />
          <Stack.Screen
            name="PokeList"
            component={PokemonList}
            options={{ headerTitle: "Pokemon List" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
