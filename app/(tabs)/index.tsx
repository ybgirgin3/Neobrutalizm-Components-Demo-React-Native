import NBButton from '@/components/neub/NBButton';
import NBCard from '@/components/neub/NBCard';
import Spacer from '@/components/neub/Spacer';
import Header from '@/components/PageComponents/IndexComponents';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <>
    <Header />
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

      <NBCard>
        <Text>Demo Card</Text>
      </NBCard>
      <Spacer />
      <NBButton style={{backgroundColor: "lightblue"}}>
      </NBButton>
    </View>
</>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
