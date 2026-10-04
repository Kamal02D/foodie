import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen({ route }) {
  const recipe = route?.params || {};
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );
  const isFavourite = favoriteRecipes.some(
    (favorite) => favorite.idFood === recipe.idFood
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  const metrics = [
    { icon: "⏱", label: "Time", value: recipe.cookingTime || recipe.time || "—" },
    { icon: "🍽", label: "Servings", value: recipe.servings || "—" },
    { icon: "🔥", label: "Calories", value: recipe.calories || "—" },
    {
      icon: "•",
      label: "Type",
      value: recipe.recipeCategory || recipe.category || "—",
    },
  ];
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.recipeImage ? (
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
          />
        ) : null}
      </View>

      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
          accessibilityLabel={
            isFavourite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.recipeDetailsContainer}>
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {recipe.recipeName || recipe.title || "Untitled recipe"}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.recipeCategory || recipe.category || ""}
          </Text>
        </View>

        <View style={styles.miscContainer} testID="miscContainer">
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.miscItem}>
              <Text style={styles.miscIcon}>{metric.icon}</Text>
              <Text style={styles.miscLabel}>{metric.label}</Text>
              <Text style={styles.miscText}>{String(metric.value)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList} testID="ingredientsList">
            {ingredients.map((ingredient, index) => (
              <View
                key={`${ingredient.ingredientName || ingredient.name || "ingredient"}-${index}`}
                style={styles.ingredientItem}
              >
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {ingredient.ingredientName || ingredient.name || ""}
                  {ingredient.measure ? ` — ${ingredient.measure}` : ""}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {recipe.recipeInstructions ||
              recipe.cookingDescription ||
              recipe.description ||
              "No instructions available."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: hp(4),
  },
  imageContainer: {
    alignItems: "center",
  },
  recipeImage: {
    width: wp(98),
    height: hp(40),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: 4,
  },
  topButtonsContainer: {
    position: "absolute",
    top: hp(4),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: wp(5),
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: wp(5),
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF",
    marginTop: hp(0.5),
  },
  miscContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: hp(2.5),
  },
  miscItem: {
    width: "48%",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: hp(1),
    marginBottom: hp(1),
    borderRadius: 10,
  },
  miscIcon: {
    fontSize: hp(2.5),
  },
  miscLabel: {
    color: "#6B7280",
    fontSize: hp(1.5),
    marginTop: hp(0.3),
  },
  miscText: {
    color: "#374151",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  ingredientsList: {
    marginLeft: wp(1),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(0.8),
    padding: wp(2.5),
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
  },
  ingredientBullet: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(0.5),
    marginRight: wp(2),
    backgroundColor: "#FFD700",
  },
  ingredientText: {
    flex: 1,
    fontSize: hp(1.8),
    color: "#333",
  },
  instructionsText: {
    fontSize: hp(1.8),
    color: "#4B5563",
    textAlign: "justify",
    lineHeight: hp(2.6),
  },
});
