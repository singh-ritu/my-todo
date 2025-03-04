import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { TextInput } from "react-native-paper";
import { Redirect } from "expo-router";

interface Todo {
  task: string;
  userId: string;
  createdAt: string;
}

export default function TodosScreen() {
  const [input, setInput] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userToken");
      const response = await fetch(
        `https://gettodos-yyc5vsflha-uc.a.run.app/getTodos?userId=${userId}`
      );

      const data = await response.json();
      console.log(data);

      setTodos(data.todos);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodos = async () => {
    if (!input) {
      setError("! Input Field is  cannot be empty");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const userId = await SecureStore.getItemAsync("userToken");
      console.log("User ID:", userId);

      if (!userId) {
        alert("User not authenticated");
        return <Redirect href={"/explore"} />;
      }

      const response = await fetch(
        "https://createtodo-yyc5vsflha-uc.a.run.app/createTodo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, task: input }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.ok) {
        console.log("Todo added:", data);
      } else {
        alert("Failed to add Todo:" + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error . Please try again");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Surf.jpeg")}
      className="flex-1 justify-end items-center mb-8"
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className=" flex w-screen justify-center align-middle rounded-2xl p-4 bg-[white] m-4">
          <Text className="text-xl font-bold m-4 text-[black] text-center">
            Create Your TodoList!
          </Text>
          {error ? (
            <Text className="text-center text-red-500 border border-red-500 my-2 py-2 rounded-lg">
              {error}
            </Text>
          ) : null}
          <TextInput
            value={input}
            onChangeText={setInput}
            mode="outlined"
            placeholder="Enter your todos"
          />

          <TouchableOpacity onPress={handleTodos}>
            <Text className="text-lg text-center rounded-lg mb-6 mt-3 text-white font-bold px-4 py-3 bg-[#1b3552]">
              Add your Todo
            </Text>
          </TouchableOpacity>

          {todos?.length > 0 ? (
            <View className="border px-7 py-2 rounded-lg">
              {todos.map((todo, index) => (
                <Text key={index} className="text-center text-xl font-semibold">
                  {todo.task}
                </Text>
              ))}
            </View>
          ) : (
            ""
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
