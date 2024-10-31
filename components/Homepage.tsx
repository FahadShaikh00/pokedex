import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
// import { ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
type Pokemon = {
  id: number;
  name: string;
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

const Homepage: React.FC<Props> = ({ navigation }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const pokeData = async (pokeName: string) => {
    if (!pokeName || typeof pokeName !== "string") {
      setError("Invalid Pokemon Name.");
      setPokemon(null);
    }
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      console.log(response.data);
      setPokemon(response.data);
      setError("");
    } catch (err) {
      setError("invalid");
      setPokemon(null);
    }
  };

  const handleSearch = () => {
    setSearch(search.toLowerCase());
    if (search.trim()) {
      pokeData(search);
    }
  };

  return (
    // <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TextInput
              style={styles.search}
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : pokemon ? (
            <View style={styles.pokemonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PokeDetails", { pokemon })}
              >
                <Text style={styles.pokemonID}>#{pokemon.id}</Text>
                <Image
                  source={{
                    uri: pokemon.sprites.other.home.front_default,
                  }}
                  style={styles.pokeImage}
                />
                <Text style={styles.pokemonName}>
                  {pokemon.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  search: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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

  error: { color: "red", marginTop: 10 },
  pokemonContainer: { alignItems: "center", marginTop: 20 },
  pokemonID: { alignItems: "center" },
  pokemonName: { fontSize: 20, fontWeight: "bold" },
  pokeImage: { width: 100, height: 100, marginVertical: 10 },
});

export default Homepage;
