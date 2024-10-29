import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "PokeDetails">;
type Pokemon = {
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  height: number;
  weight: number;
};

type RouteParams = {
  pokemon: Pokemon;
};

const PokemonDetails: React.FC<Props> = ({ navigation }) => {
  const route =
    useRoute<RouteProp<Record<string, RouteParams>, "PokeDetails">>();
  const { pokemon } = route.params;
  return (
    <View style={styles.container}>
      <Text>Pokemon Details</Text>
      <Text style={styles.pokeName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.pokeImage}
      />
      <Text>Type(s): {pokemon.types.map((t) => t.type.name).join(", ")}</Text>
      <Text>Height: {pokemon.height / 10} m</Text>
      <Text>Weight: {pokemon.weight / 10} kg</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002bff",
  },
  pokeName: {},
  pokeImage: { width: 100, height: 100, marginVertical: 10 },
});
export default PokemonDetails;
