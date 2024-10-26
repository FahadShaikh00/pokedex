import { Text, View } from 'react-native';
import Homepage from './components/Homepage';
import PokemonDetails from './components/PokemonDetails';

export default function App() {

  return (
    <View>
      <Homepage />
      <PokemonDetails />
    </View>
  );
}
