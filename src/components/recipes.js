import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay" style={styles.listContainer}>
        <FlatList
          data={foods}
          numColumns={2}
          keyExtractor={(item, index) =>
            String(item.idFood ?? item.recipeId ?? index)
          }
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          nestedScrollEnabled
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No recipes found in this category.
            </Text>
          }
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={styles.cardContainer}
      testID="articleDisplay"
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("RecipeDetail", item)}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />
        <Text style={styles.articleText} numberOfLines={2}>
          {item.recipeName}
        </Text>
        <Text style={styles.articleDescription} numberOfLines={3}>
          {item.cookingDescription || item.recipeInstructions}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "flex-start",
    marginBottom: hp(1.5),
    flex: 1,
    paddingHorizontal: wp(1.5),
  },
  articleImage: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between", // Align columns evenly
  },
  listContainer: {
    width: "100%",
  },
  listContent: {
    paddingBottom: hp(2),
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: hp(1.8),
    paddingVertical: hp(3),
  },
});
