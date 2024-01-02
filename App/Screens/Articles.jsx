import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ArticleCard from "../Components/ArticleCard";
import { AntDesign } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGlobalContext } from "../context";
import client from "../api/client";

const Articles = ({ navigation }) => {
  const { user, articleData, setArticleData, setData, data } =
    useGlobalContext();
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("আর্টিকেলস");
  const [myArticles, setMyArticles] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const fetchArticle = async () => {
    try {
      const res = await client.get("/article/");
      console.log("Article data", res.data);

      const myArticles = res.data.articles.filter(
        (article) => article.posterId === user.user?._id
      );
      const otherArticles = res.data.articles.filter(
        (article) => article.posterId !== user.user?._id
      );

      setMyArticles(myArticles);
      setOtherArticles(otherArticles);
      console.log("My articles", myArticles);
      console.log("Other articles", otherArticles);
      setData(res.data.articles.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={Wave} style={styles.image}>
        <View style={styles.header}>
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="black"
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
          {/* Removed unused Recorder component */}
        </View>
      </ImageBackground>
      {isListExpanded && <Expand />}
      <View style={styles.headerArt}>
        <Text style={styles.headerText}>আর্টিকেলস</Text>
        <AntDesign
          name="pluscircle"
          size={24}
          color="black"
          onPress={() =>
            navigation.navigate("ArticleScreen", {
              atitle: "",
              adescription: "",
              author: user.user?.name,
              date: "",
              userID: user.user?._id,
              editArticle: true,
            })
          }
        />
      </View>
      <View style={styles.artSection}>
        <TouchableOpacity
          style={[
            styles.arBox,
            {
              backgroundColor:
                selectedTab === "আর্টিকেলস" ? "lightblue" : "#fff",
            },
          ]}
          onPress={() => setSelectedTab("আর্টিকেলস")}
        >
          <Text style={styles.arText}>আর্টিকেলস</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.arBox,
            {
              backgroundColor:
                selectedTab === "নিজের আর্টিকেলস" ? "lightblue" : "#fff",
            },
          ]}
          onPress={() => setSelectedTab("নিজের আর্টিকেলস")}
        >
          <Text style={styles.arText}>নিজের আর্টিকেলস</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.articlesContainer}>
        {selectedTab === "আর্টিকেলস"
          ? otherArticles.map((article) => (
              <TouchableOpacity
                key={article._id}
                onPress={() =>
                  navigation.navigate("ArticleScreen", {
                    articleId: article._id,
                    atitle: article.title,
                    adescription: article.description,
                    author: article.author,
                    date: article.date,
                    userID: article.posterId,
                    editArticle: false,
                  })
                }
              >
                <ArticleCard
                  title={article.title}
                  content={article.description.substring(0, 100) + "......"}
                  author={article.author}
                />
              </TouchableOpacity>
            ))
          : myArticles.map((article) => (
              <TouchableOpacity
                key={article.id}
                onPress={() =>
                  navigation.navigate("ArticleScreen", {
                    articleId: article._id,
                    atitle: article.title,
                    adescription: article.description,
                    author: article.author,
                    date: article.date,
                    userID: article.posterId,
                    editArticle: true,
                    isOld: true,
                  })
                }
              >
                <ArticleCard
                  title={article.title}
                  content={article.description.substring(0, 100) + "......"}
                  author={article.author}
                />
              </TouchableOpacity>
            ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  articlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  headerArt: {
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
    marginHorizontal: 10,
  },
  artSection: {
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
    marginHorizontal: 10,
  },
  arBox: {
    alignItems: "center",
    width: "45%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10, // Add elevation for shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  arText: {
    fontSize: 20,
    color: "#555",
    marginTop: 10,
    paddingLeft: 20,
    fontFamily: "HindiSiliBold",
  },

  headerText: {
    fontFamily: "HindiSiliBold",
    fontSize: 30,
    paddingLeft: 15,
  },
});

export default Articles;
