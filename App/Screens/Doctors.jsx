// DoctorsScreen.js
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import DoctorCard from "../Components/DoctorCard";
import { Entypo } from "@expo/vector-icons";
import client from "../api/client";

const DoctorsScreen = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]);

  const openEditModal = (doctorId) => {
    const selected = doctorsData.find((doctor) => doctor.id === doctorId);
    setSelectedDoctor(selected);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedDoctor(null);
  };

  const fetchDoctors = async () => {
    await client.get(`/psychologist`).then((res) => {
      console.log("Doctor data before setDoctorsData", res.data);
      setDoctorsData(res.data.user);
      console.log("Doctor data after setDoctorsData", doctorsData);
    });
  };

  useEffect(() => {
    // Fetch doctors data from the database
    // setDoctorsData(data);
    fetchDoctors();
  }, []);

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
      </ImageBackground>
      <Text style={styles.headerText}>বিশেষজ্ঞদের তালিকা</Text>
      <View style={styles.doctorsContainer}>
        {doctorsData &&
          doctorsData.map((doctor) => (
            <TouchableOpacity
              onPress={() => openEditModal(doctor.id)}
              key={doctor.id}
            >
              <DoctorCard
                doctorInfo={doctor.name}
                subText={doctor.email}
                doctorImage={{
                  uri: `http://192.168.0.103:3000/image/${doctor?.profilePicture}`,
                }}
              />
              {/* <Image
                source={{
                  uri: `http://192.168.0.103:3000/image/${user.user?.profilePicture}`,
                }}
                style={styles.profileImage}
              /> */}
            </TouchableOpacity>
          ))}
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Entypo
            name="circle-with-cross"
            size={24}
            color="black"
            style={styles.closeIcon}
            onPress={closeEditModal}
          />
          <Text>{selectedDoctor ? selectedDoctor.name : ""}</Text>
          {/* Display other doctor information as needed */}
          <TouchableOpacity onPress={closeEditModal}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

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
  modalContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 100,
    marginBottom: 200,
    backgroundColor: "white",
  },
  modalInput: {
    width: 300,
    height: 50,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    width: "40%",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default DoctorsScreen;
