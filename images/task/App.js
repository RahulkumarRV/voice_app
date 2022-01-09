/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Node} from 'react';
import {
  ActivityIndicatorComponent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import userLogo from './images/user3.png';
import mic_icon from './images/mic_icon.png';
import Voice from '@react-native-community/voice';

const ListData = [
  {
    key: 1,
    name: 'Mr Ram Verma',
    image: userLogo,
    description:
      'There are more than 3,000 species of snakes on the planet and they’re found everywhere except in Antarctica, Iceland, Ireland, Greenland, and New Zealand. About 600 species are venomous, and only about 200—seven percent—are able to kill or significantly wound a human.' +
      ' Nonvenomous snakes, which range from harmless garter snakes to the not-so-harmless python, dispatch their victims by swallowing them alive or constricting them to death. Whether they kill by striking with venom or squeezing, nearly all snakes eat their food whole, in sometimes astoundingly large portions.',
  },
  {
    key: 2,
    name: 'Mr Mohan Kumar',
    image: userLogo,
    description:
      'Dogs (Canis lupus familiaris) are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated. ... They are a popular pet because they are usually playful, friendly, loyal and listen to humans.',
  },
  {
    key: 3,
    name: 'Ms Sunita singh',
    image: userLogo,
    description:
      'scorpion, (order Scorpiones or Scorpionida), any of approximately 1,500 elongated arachnid species characterized by a segmented curved tail tipped with a venomous stinger at the rear of the body and a pair of grasping pincers at the front. Although scorpions are most common and diverse in deserts, they also live in many other habitats. Primarily nocturnal, scorpions often play the role of evildoers in fables and legends. Greek respect for scorpions prompted the naming of the constellation Scorpius, a sign of the zodiac. Gene',
  },
  {
    key: 4,
    name: 'Mr Mukesh Ambani',
    image: userLogo,
    description:
      'elephant, (family Elephantidae), largest living land animal, characterized by its long trunk (elongated upper lip and nose), columnar legs, and huge head with temporal glands and wide, flat ears. Elephants are grayish to brown in colour, and their body hair is sparse and coarse. They are found most often in savannas, grasslands, and forests but occupy a wide range of habitats, including deserts, swamps, and highlands in tropical and subtropical regions of Africa and Asia.',
  },
  {
    key: 5,
    name: 'Mr Amit Verma',
    image: userLogo,
    description:
      'Hippopotamus is Greek for “river horse,” and the animal has been known since ancient times. Hippopotamuses are often seen basking on the banks or sleeping in the waters of rivers, lakes, and swamps next to grasslands. Because of their great size and aquatic habits, they are safe from most predators but human beings, who have long valued their hide, meat, and ivory and at times have resented them for ruining crops. Once ranging over the entire continent and beyond, hippopotamuses (or “hippos”) now live in eastern, central, and parts of southern Africa.',
  },
  {
    key: 6,
    name: 'Mr Karan Verma',
    image: userLogo,
    description:
      'lion, (Panthera leo), large, powerfully built cat (family Felidae) that is second in size only to the tiger. The proverbial “king of beasts,” the lion has been one of the best-known wild animals since earliest times. Lions are most active at night and live in a variety of habitats but prefer grassland, savanna, dense scrub, and open woodland. Historically, they ranged across much of Europe, Asia, and Africa, but now they are found mainly in parts of Africa south of the Sahara. An isolated population of about 650 Asiatic lions constitute a slightly smaller race that lives under strict protection in India’s Gir National Park and Wildlife Sanctuary.',
  },
];

const App = () => {
  const [results, setResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    setIsLoading(true);
    console.log('onSpeechStart: ', e);
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    setIsLoading(false);
    console.log('onSpeechEnd: ', e);
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    let text = e.value[0];
    setResults(text);
    console.log('onSpeechResults: ', e);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setResults([]);
      setPartialResults([]);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Patients List</Text>
        <FlatList
          keyExtractor={item => item.key.toString()}
          data={ListData}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item}>
              <Image
                source={{uri: item.image}}
                style={{width: 100, height: 100}}
              />
              <View style={{marginLeft: 10, width: '100%'}}>
                <h1
                  style={{
                    fontWeight: '500',
                    marginTop: 0,
                    marginBottom: 0,
                  }}>
                  {item.name}
                </h1>
                <p style={{fontWeight: 500, width: '90%'}}>
                  {item.description}
                </p>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            backgroundColor: 'white',
            marginBottom: 10,
            marginTop: 10,
            shadowColor: 'black',
            shadowOpacity: 0.5,
            borderRadius: 5,
          }}>
          <TextInput
            style={{
              width: '80%',
              backgroundColor: 'white',
              marginLeft: 10,
              borderColor: 'yellow',
              padding: 10,
              color: 'black',
              fontWeight: 'bold',
              borderRadius: 10,
            }}
            value={results}
            placeholder="Your voice text"
            onChange={e => setResults(e.value)}></TextInput>

          {isLoading ? (
            <ActivityIndicatorComponent size="large" color="red" />
          ) : (
            <TouchableOpacity
              onPress={startRecording}
              style={{
                marginTop: 10,
                marginBottom: 5,
                width: 30,
                height: 30,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Image
                source={{uri: mic_icon}}
                style={{width: '100%', height: '100%'}}></Image>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              width: 60,
              height: 30,
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'black',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginVertical: 'auto',
                fontWeight: '500',
              }}>
              {' '}
              STOP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
