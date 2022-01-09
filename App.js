import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	FlatList,
	TouchableOpacity,
	Image,
	ScrollView,
	TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userLogo from "./images/user3.png";
import mic_icon from "./images/mic_icon.png";
import Voice from "@react-native-community/voice";

//import HomeScreen from "./screens/HomeScreen";

const ListData = [
	{
		key: 1,
		name: "Mr Ram Verma",
		image: userLogo,
		description:
			"There are more than 3,000 species of snakes on the planet and they’re found everywhere except in Antarctica, Iceland, Ireland, Greenland, and New Zealand. About 600 species are venomous, and only about 200—seven percent—are able to kill or significantly wound a human." +
			" Nonvenomous snakes, which range from harmless garter snakes to the not-so-harmless python, dispatch their victims by swallowing them alive or constricting them to death. Whether they kill by striking with venom or squeezing, nearly all snakes eat their food whole, in sometimes astoundingly large portions.",
	},
	{
		key: 2,
		name: "Mr Mohan Kumar",
		image: userLogo,
		description:
			"Dogs (Canis lupus familiaris) are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated. ... They are a popular pet because they are usually playful, friendly, loyal and listen to humans.",
	},
	{
		key: 3,
		name: "Ms Sunita singh",
		image: userLogo,
		description:
			"scorpion, (order Scorpiones or Scorpionida), any of approximately 1,500 elongated arachnid species characterized by a segmented curved tail tipped with a venomous stinger at the rear of the body and a pair of grasping pincers at the front. Although scorpions are most common and diverse in deserts, they also live in many other habitats. Primarily nocturnal, scorpions often play the role of evildoers in fables and legends. Greek respect for scorpions prompted the naming of the constellation Scorpius, a sign of the zodiac. Gene",
	},
	{
		key: 4,
		name: "Mr Mukesh Ambani",
		image: userLogo,
		description:
			"elephant, (family Elephantidae), largest living land animal, characterized by its long trunk (elongated upper lip and nose), columnar legs, and huge head with temporal glands and wide, flat ears. Elephants are grayish to brown in colour, and their body hair is sparse and coarse. They are found most often in savannas, grasslands, and forests but occupy a wide range of habitats, including deserts, swamps, and highlands in tropical and subtropical regions of Africa and Asia.",
	},
	{
		key: 5,
		name: "Mr Amit Verma",
		image: userLogo,
		description:
			"Hippopotamus is Greek for “river horse,” and the animal has been known since ancient times. Hippopotamuses are often seen basking on the banks or sleeping in the waters of rivers, lakes, and swamps next to grasslands. Because of their great size and aquatic habits, they are safe from most predators but human beings, who have long valued their hide, meat, and ivory and at times have resented them for ruining crops. Once ranging over the entire continent and beyond, hippopotamuses (or “hippos”) now live in eastern, central, and parts of southern Africa.",
	},
	{
		key: 6,
		name: "Mr Karan Verma",
		image: userLogo,
		description:
			"lion, (Panthera leo), large, powerfully built cat (family Felidae) that is second in size only to the tiger. The proverbial “king of beasts,” the lion has been one of the best-known wild animals since earliest times. Lions are most active at night and live in a variety of habitats but prefer grassland, savanna, dense scrub, and open woodland. Historically, they ranged across much of Europe, Asia, and Africa, but now they are found mainly in parts of Africa south of the Sahara. An isolated population of about 650 Asiatic lions constitute a slightly smaller race that lives under strict protection in India’s Gir National Park and Wildlife Sanctuary.",
	},
];

function HomeScreen({ navigation }) {
	const [partialResults, setPartialResults] = useState([]);
	const [results, setResults] = useState([]);
	const [started, setStarted] = useState("");
	const [error, setError] = useState("");
	const [pitch, setPitch] = useState("");
	const [end, setEnd] = useState("");

	// useEffect(() => {
	// 	Voice.onSpeechStart = startHandler;
	// 	Voice.onSpeechEnd = endHandler;
	// 	Voice.onSpeechResults = resultsHandler;
	// 	return () => {
	// 		Voice.destroy().then(Voice.removeAllListeners);
	// 	};
	// }, []);

	// const startHandler = (e) => {
	// 	console.log("starting.....");
	// };

	// const endHandler = (e) => {
	// 	console.log("ending....");
	// };

	// const resultsHandler = (e) => {
	// 	console.log("result recognizing...");
	// };

	const startRecording = async () => {
		console.log("startRecording function calling...");
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "bold", fontSize: 18 }}>Patients List</Text>
			<FlatList
				keyExtractor={(item) => item.key.toString()}
				data={ListData}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							console.log("clicked");
							navigation.navigate("Details", {
								title: item.about,
							});
						}}>
						<Image
							source={{ uri: item.image }}
							style={{ width: "100px", height: "100px" }}
						/>
						<View style={{ marginLeft: "10px", width: "90%" }}>
							<h1
								style={{
									fontWeight: 500,
									marginTop: "0px",
									marginBottom: "0px",
								}}>
								{item.name}
							</h1>
							<p style={{ fontWeight: 500, width: "90%" }}>
								{item.description}
							</p>
						</View>
					</TouchableOpacity>
				)}
			/>
			<View
				style={{
					width: "100%",
					height: "50px",
					flexDirection: "row",
					backgroundColor: "white",
					marginBottom: "10px",
					marginTop: "10px",
					shadowColor: "black",
					shadowOpacity: "0.5",
					borderRadius: "5",
				}}>
				<TextInput
					style={{
						width: "80%",
						backgroundColor: "rgb(247 234 234)",
						marginLeft: "10px",
						borderColor: "yellow",
						padding: "10px",
						color: "black",
						fontWeight: "bold",
						borderRadius: "10px",
					}}
					value={results}
					placeholder='Your voice text'
					onChange={(e) => setResults(e.value)}></TextInput>
				<TouchableOpacity
					onPress={startRecording}
					style={{
						marginTop: "10px",
						marginBottom: "5px",
						width: "30px",
						height: "30px",
						marginLeft: "10px",
						marginRight: "10px",
					}}>
					<Image
						source={{ uri: mic_icon }}
						style={{ width: "100%", height: "100%" }}></Image>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: "60px",
						height: "30px",
						marginTop: "10px",
						marginBottom: "5px",
						marginLeft: "10px",
						marginRight: "10px",
						backgroundColor: "black",
					}}>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							marginVertical: "auto",
							fontWeight: "500",
						}}>
						{" "}
						STOP
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function DetailsScreen({ route, navigation }) {
	const { title } = route.params;
	return (
		<View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
			<Text style={{ marginBottom: 50, fontWeight: "bold", width: "50%" }}>
				{title}
			</Text>
			<View style={{ width: "50%" }}>
				<View>
					<View style={styles.inputgroup}>
						<Text style={{ fontWeight: "bold" }}>Enter Product Name</Text>
						<input></input>
					</View>
					<View style={styles.inputgroup}>
						<Text style={{ fontWeight: "bold" }}>Enter Product Name</Text>
						<input></input>
					</View>
				</View>
				<Button title='SUBMIT'></Button>
			</View>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Details' component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 40,
		paddingHorizontal: 20,
		marginBottom: "20px",
	},
	item: {
		marginTop: 10,
		padding: 10,
		backgroundColor: "white",
		fontSize: 14,
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 9,
		flexDirection: "row",
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
	},
	inputgroup: {
		marginBottom: 10,
	},
});
export default App;
