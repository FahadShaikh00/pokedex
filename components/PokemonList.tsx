import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "PokeList">;
type Pokemon = {
  id: number;
  name: string;
  image: string;
};

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"id" | "name">("id");

  const pokeList = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`
      );
      const pokeData = await Promise.all(
        response.data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const pokeDetails = await axios.get(pokemon.url);
            return {
              id: pokeDetails.data.id,
              name: pokeDetails.data.name,
              image: pokeDetails.data.sprites.other.home.front_default,
            };
          }
        )
      );

      setPokemonList(pokeData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  // Sorting function
  const sortPokemon = () => {
    const sortedList = [...pokemonList].sort((a, b) => {
      if (sortBy === "id") return a.id - b.id;
      return a.name.localeCompare(b.name);
    });
    setPokemonList(sortedList);
  };

  // Handle Sort Toggle
  const toggleSort = () => {
    setSortBy(sortBy === "id" ? "name" : "id");
  };

  // Fetch on initial load and when offset or sortBy changes
  useEffect(() => {
    pokeList();
  }, [offset]);

  useEffect(() => {
    sortPokemon();
  }, [sortBy]);

  // Handle Pagination
  const handlePrev = () => setOffset(offset - 9);
  const handleNext = () => setOffset(offset + 9);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Sort Button */}
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={toggleSort}
          style={{
            alignItems: "center",
            backgroundColor: "#ddd",
            padding: 10,
            width: 120,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text>Sort by: {sortBy === "id" ? "ID" : "Name"}</Text>
        </TouchableOpacity>
      </View>

      {/* Pokemon List */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("PokeDetails", { pokemonList })}
      > */}
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1, flexDirection: "row" }}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              // marginVertical: 10,
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
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>#{item.id}</Text>

            <Image
              source={{ uri: item.image }}
              style={{
                width: 70,
                height: 70,
                marginRight: 10,
              }}
            />

            <Text style={{ fontSize: 18, marginLeft: 10, paddingTop: 10 }}>
              {item.name.toUpperCase()}
            </Text>
          </View>
        )}
      />
      {/* </TouchableOpacity> */}

      {/* Next Button */}
      <Button title="Previous" onPress={handlePrev} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default PokemonList;
