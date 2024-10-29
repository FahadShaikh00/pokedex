import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../App";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "PokeDetails">;
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
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.pokeName}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.pokemonID}>#{pokemon.id}</Text>
          <Image
            source={{ uri: pokemon.sprites.other.home.front_default }}
            style={styles.pokeImage}
          />
          <Text>{pokemon.types.map((t) => t.type.name).join(", ")}</Text>
          <Text>About</Text>
          <View>
            <Text>Weight: {pokemon.weight / 10} kg</Text>
            <Text>Height: {pokemon.height / 10} m</Text>
            <Text>
              Moves: {pokemon.abilities.map((t) => t.ability.name).join(", ")}
            </Text>
            <View>
              {pokemon.stats.map((t, index) => (
                <Text key={`name-${index}`}>{t.stat.name}</Text>
              ))}
              {pokemon.stats.map((t, index) => (
                <Text key={`stat-${index}`}>{t.base_stat}</Text>
              ))}
            </View>
          </View>

          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  pokemonID: {},
  pokeName: {},
  pokeImage: { width: 300, height: 300, marginVertical: 10 },
});
export default PokemonDetails;
