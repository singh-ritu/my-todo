import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-paper";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const handleSignup = () => {
    console.log("logged details");
  };
  return (
    <ImageBackground
      source={require("../../assets/Surf.jpeg")} // Ensure image is inside "assets" folder
      className="flex-1 justify-end items-center mb-8"
      resizeMode="cover" // Ensures the image covers the entire screen
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className=" flex w-screen justify-center align-middle rounded-2xl p-4 bg-[white] m-4">
          <Text className="text-xl font-bold m-4 text-[black] text-center">
            Create your First Todo!
          </Text>

          <View className="my-1">
            <TextInput
              label="Enter Your Name"
              value={name}
              keyboardType="default"
              onChangeText={setName}
              mode="outlined"
            />
          </View>
          <View className="my-1">
            <TextInput
              label="Enter Your Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              mode="outlined"
            />
          </View>
          <View className="my-1">
            <TextInput
              label="Enter Your Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              mode="outlined"
            />
          </View>
          <TouchableOpacity onPress={handleSignup}>
            <Text className="text-lg text-center rounded-lg my-6 text-white font-bold p-4 bg-[#1b3552]">
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text className="text-lg text-center font-semibold">
            Already have an account?{" "}
            <Text
              className="text-blue-400"
              onPress={() => {
                console.log("Signin clicked");
                router.replace("/explore");
              }}>
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
