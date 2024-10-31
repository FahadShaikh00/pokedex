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
import React, { useEffect } from "react";
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

type PokemonList = {
  id: number;
  name: string;
  image: string;
};

type RouteParams = {
  pokemon: Pokemon;
  pokeList: PokemonList;
};

const PokemonDetails: React.FC<Props> = ({ navigation }) => {
  const route =
    useRoute<RouteProp<Record<string, RouteParams>, "PokeDetails">>();
  const { pokemon, pokeList } = route.params;

  const backgroundColors: { [key: string]: string } = {
    bug: "#A7B723",
    dark: "#75574C",
    dragon: "7037FF",
    electric: "#F9CF30",
    fairy: "#E69EAC",
    fighting: "#C12239",
    fire: "#F57D31",
    flying: "#A891EC",
    ghost: "70559B",
    normal: "#AAA67F",
    grass: "#74CB48",
    ground: "#DEC16B",
    ice: "#9AD6DF",
    poison: "#A43E9E",
    psychic: "#FB5584",
    rock: "#B69E31",
    steel: "#B7B9D0",
    water: "#6493EB",
    default: "#737373",
  };
  const primaryType = pokemon.types[0]?.type.name || "default";
  const backgroundColor =
    backgroundColors[primaryType] || backgroundColors.default;
  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    navigation.setOptions({
      title: pokemon.name.toUpperCase(),
      headerTitleStyle: { fontSize: 24, fontWeight: "bold", color: "white" },
    });
  }, [navigation, pokemon.name]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container, { backgroundColor }]}>
          <Text style={styles.pokeID}>#{pokemon.id}</Text>
          <Image
            style={styles.pokeImage}
            source={{ uri: pokemon.sprites.other.home.front_default }}
          />
          <View style={[styles.aboutContainer, {}]}>
            <Text style={[styles.pokeType, { backgroundColor }]}>
              {pokemon.types
                .map((t) => capitalizeFirstLetter(t.type.name))
                .join("         ")}
            </Text>
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 24 }}>
              About
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.aboutWeight}>{pokemon.weight / 10} kg</Text>
              <Text style={styles.aboutHeight}>{pokemon.height / 10} m</Text>
              <Text style={styles.aboutAbility}>
                {pokemon.abilities
                  .map((t) => capitalizeFirstLetter(t.ability.name))
                  .join(", ")}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={[styles.aboutWeight, { fontSize: 15, paddingTop: 10 }]}
              >
                Weight
              </Text>
              <Text
                style={[styles.aboutHeight, { fontSize: 15, paddingTop: 10 }]}
              >
                Height
              </Text>
              <Text
                style={[styles.aboutAbility, { fontSize: 15, paddingTop: 10 }]}
              >
                Moves
              </Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
              Base Stats
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", alignContent: "center" }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  paddingStart: 20,
                }}
              >
                {/* {pokemon.stats.map((t, index) => (
                  <Text key={`name-${index}`}>{t.stat.name}</Text>
                ))} */}
                <Text>HP</Text>
                <Text>ATK</Text>
                <Text>DEF</Text>
                <Text>SATK</Text>
                <Text>SDEF</Text>
                <Text>SPD</Text>
              </View>
              <View
                style={{ flex: 1, flexDirection: "column", paddingStart: 20 }}
              >
                {pokemon.stats.map((t, index) => (
                  <Text key={`stat-${index}`}>{t.base_stat}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center", // Align all items to the start
    justifyContent: "center",
    marginBottom: 30,
  },
  pokeID: {
    alignSelf: "flex-end",
    color: "white",
    marginTop: 10,
    paddingEnd: 30,
    fontWeight: "900",
  },
  pokeImage: {
    alignSelf: "center",
    width: 300,
    height: 300,
    marginTop: -30,
    zIndex: 1,
  },
  pokeType: {
    padding: 10,
    margin: 5,
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 10,
  },
  aboutContainer: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: -60,
    paddingTop: 60,
    width: "95%",
    borderRadius: 10,
    paddingBottom: 50,
    marginBottom: 100,
  },
  aboutWeight: {
    alignSelf: "center",
    borderColor: "black",
    fontSize: 20,
    width: "25%",
  },
  aboutHeight: { alignSelf: "center", fontSize: 20, width: "25%" },
  aboutAbility: { alignSelf: "center", fontSize: 20, width: "25%" },
});
export default PokemonDetails;
