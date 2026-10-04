import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,Alert,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a recipe title.");
      return;
    }

    const newrecipe = {
      ...(recipeToEdit || {}),
      idFood: recipeToEdit?.idFood || `custom-${Date.now()}`,
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
    };

    try {
      const savedRecipes = await AsyncStorage.getItem("customrecipes");
      const recipes = savedRecipes ? JSON.parse(savedRecipes) : [];

      if (!Array.isArray(recipes)) {
        throw new Error("Saved custom recipes data is not a list.");
      }

      if (recipeToEdit) {
        if (
          !Number.isInteger(recipeIndex) ||
          recipeIndex < 0 ||
          recipeIndex >= recipes.length
        ) {
          throw new Error("The recipe being edited could not be found.");
        }
        recipes[recipeIndex] = newrecipe;
      } else {
        recipes.push(newrecipe);
      }

      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      onrecipeEdited?.();
      navigation.goBack();
    } catch (error) {
      console.error("Unable to save custom recipe:", error);
      Alert.alert("Save failed", "Your recipe could not be saved.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
