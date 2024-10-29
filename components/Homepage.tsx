import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
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
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to Pokédex</Text>

            <TextInput
              style={styles.search}
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />
            <Button title="Search" onPress={handleSearch} />
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : pokemon ? (
              <View style={styles.pokemonContainer}>
                <Text style={styles.pokemonID}>#{pokemon.id}</Text>
                <Image
                  source={{ uri: pokemon.sprites.front_default }}
                  style={styles.pokeImage}
                />
                <Text style={styles.pokemonName}>
                  {pokemon.name.toUpperCase()}
                </Text>
              </View>
            ) : null}

            <Button title="CARD" />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
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
  resultItem: {},
  error: { color: "red", marginTop: 10 },
  pokemonContainer: { alignItems: "center", marginTop: 20 },
  pokemonID: { alignItems: "center" },
  pokemonName: { fontSize: 20, fontWeight: "bold" },
  pokeImage: { width: 100, height: 100, marginVertical: 10 },
});

export default Homepage;
