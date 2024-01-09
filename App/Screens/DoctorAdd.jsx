import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import client from "../api/client";
import { useGlobalContext } from "../context";

const DoctorAdd = () => {
  const { user, setAlert } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email) {
      setAlert({
        on: true,
        type: "error",
        message: "ইমেইল দিন",
      });
      return;
    }
    setLoading(true);
    await client
      .post(`/psychologist/addEmail/${user.user?._id}`, { email: email })
      .then((res) => {
        console.log("Doctor data", res.data);

        setTimeout(() => {
          setAlert({
            on: true,
            type: "success",
            message: "ইমেইল সফলভাবে যোগ করা হয়েছে",
          });
          setEmail("");
          setLoading(false);
          navigation.navigate("DoctorAdd");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          on: true,
          type: "error",
          message: "ইমেইল যোগ করা হয়নি",
        });
        setLoading(false);
      });
  };
  const getDynamicStyle = (text) => {
    let marginRight = 300; // default margin
    if (text.length <= 4) {
      marginRight = 305;
    } else if (text.length > 10) {
      marginRight = 240; // increase margin for longer text
    }

    return {
      marginTop: 5,
      fontSize: 13,
      marginBottom: -7,
      fontFamily: "HindiSiliBold",
      marginLeft: 10,

      borderColor: "#000",
      borderWidth: 1,
      marginRight: marginRight,
      borderRadius: 10,
      backgroundColor: "#ececec",
      zIndex: 55,
      textAlign: "center",
      textAlignVertical: "center",
    };
  };
  const onChangeEmail = (textValue) => setEmail(textValue);
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
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            padding: 10,
            marginBottom: 30,
            marginHorizontal: 20,
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "white",
            fontFamily: "HindiSiliBold",
            marginTop: -40,
          }}
        >
          বিশেষজ্ঞদের{"\n"}এড করুন
        </Text>
      </ImageBackground>

      <View style={styles.doctorsContainer}>
        <Text style={getDynamicStyle("ইমেইল")}>ইমেইল</Text>
        <TextInput
          style={styles.input}
          placeholder="ইমেইল"
          onChangeText={(email) => onChangeEmail(email)}
          value={email} // Add this line
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text}>সম্পন্ন করুন</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

// ... rest of your code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  doctorsContainer: {
    paddingHorizontal: 10,
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
  headerText: {
    fontFamily: "HindiSiliBold",
    fontSize: 30,
    paddingLeft: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    width: "40%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "HindiSili",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default DoctorAdd;
