import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import PokemonList from "./PokemonList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
type Pokemon = {
  id: number;
  name: string;
  image: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: Array<{ type: { name: string } }>;
  height: number;
  weight: number;
};

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews", // Error occurs due to nesting FlatList inside ScrollView but doesn't cause any issue when running application
]);

const Homepage: React.FC<Props> = ({ navigation }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const pokeData = async (pokeName: string) => {
    if (!pokeName || typeof pokeName !== "string") {
      setPokemon(null);
    }
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      console.log(response.data);
      setPokemon(response.data);
      setError("");
      return response.data;
    } catch (err) {
      setError("Invalid Pokemon Name.");
      setPokemon(null);
    }
  };

  const handleSearch = () => {
    setSearch(search.toLowerCase()); //String to LowerCase when typed in UpperCase in search bar
    if (search.trim()) {
      pokeData(search);
    }
  };

  const fetchPokemonList = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100`
      );
      const data = await response.json();

      const detailedData: Pokemon[] = await Promise.all(
        data.results.map(async (result: { name: string }) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${result.name}`
          );
          return await res.json();
        })
      );
      setPokemonList(detailedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#DC0A2D" }}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            style={styles.search}
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : pokemon ? (
          <View style={styles.pokeContainer}>
            <TouchableOpacity
              style={styles.pokeCard}
              onPress={() => navigation.navigate("PokeDetails", { pokemon })}
            >
              <Text style={styles.pokeID}>#{pokemon.id}</Text>
              <Image
                source={{
                  uri: pokemon.sprites.other.home.front_default,
                }}
                style={styles.pokeImage}
              />
              <Text style={styles.pokeName}>{pokemon.name.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* <View >
          <PokemonList />
        </View> */}
        <View style={styles.pokeList}>
          <FlatList
            data={pokemonList}
            key={(2).toString()}
            keyExtractor={(item) => item.id.toString()}
            // style={{ flexDirection: "row" }}
            renderItem={({ item }: { item: Pokemon }) => (
              <TouchableOpacity
                style={styles.pokeCard}
                onPress={() => {
                  navigation.navigate("PokeDetails", { item });
                }}
              >
                <View style={styles.pokeListCard}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    #{item.id}
                  </Text>

                  <Image
                    source={{ uri: item.sprites.other.home.front_default }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: 10,
                    }}
                  />

                  <Text
                    style={{ fontSize: 18, marginLeft: 10, paddingTop: 10 }}
                  >
                    {item.name.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 10,
  },
  search: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    height: 40,
    width: "80%",
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    width: "20%",
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#479cfe",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: { color: "white" },

  error: {
    color: "red",
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "700",
    borderRadius: 10,
  },
  pokeCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    width: "50%",
    height: 200,
    margin: 10,
  },
  pokeContainer: { alignItems: "flex-start", marginBottom: 20 },
  pokeID: { alignItems: "center" },
  pokeName: { fontSize: 20, fontWeight: "bold", paddingTop: 10 },
  pokeImage: { width: 100, height: 100 },
  pokeList: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
  },
  pokeListCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    width: 150,
    height: 150,
    margin: 10,
  },
});

export default Homepage;
