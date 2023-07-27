import React, { useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../constants";
import axios from "axios";
import { AuthAPI } from '../../components/authentication/authAPI';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({});
  const [registering, setRegistering] = useState(false);

  const handleInputChange = (inputName, inputValue) => {
    setUserDetails({
      ...userDetails, [inputName]: inputValue,
    });
  }

  const submitdata = async () => {
    setRegistering(true);
    
    await axios.post(`${AuthAPI}/auth/login`, userDetails, {
      headers: {
        'Content-Type': 'application/json',
        'api_key': '5K#jRv8Dx@9Lq&3E7G$t2Hn6W4',
      }
    })
      .then(async (res) => {
        setRegistering(false);
        const userData = JSON.stringify({...res.data, password: userDetails.password});
        await AsyncStorage.setItem('loginDetails', userData);
        alert('You have loged in Successfully');
        router.push('/job-home');
      })
      .catch((err) => {
        setRegistering(false);
        alert(err);
      })
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
          paddingVertical: 35,
          paddingHorizontal: 10,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={{ padding: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 35,
                color: "#1CA1DA",
                fontWeight: "bold",
                marginVertical: 30,
              }}
            >
              Login here
            </Text>
            <Text
              style={{
                letterSpacing: 2,
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "50%",
              }}
            >
              Welcome back !
            </Text>
          </View>

          <View style={{ marginVertical: 35 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.primary}
              onChangeText={text => handleInputChange('Email', text)}
              style={{
                fontSize: 17,
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: "#DFE2EC",
              }}
            />
            <TextInput
              placeholder="password"
              placeholderTextColor={COLORS.primary}
              onChangeText={text => handleInputChange('password', text)}
              style={{
                fontSize: 17,
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: "#DFE2EC",
              }}
            />
          </View>
          {/* <View>
            <Text
              style={{
                color: "#1CA1DA",
                fontWeight: "bold",
                alignSelf: "flex-end",
              }}
            >
              Forgot your Password..?
            </Text>
          </View> */}

          {
            registering ? <ActivityIndicator size='large' color={COLORS.primary} /> :
              <>
                <TouchableOpacity
                  style={{
                    padding: 20,
                    backgroundColor: "#1CA1DA",
                    marginVertical: 30,
                    borderRadius: 10,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                  }}
                  onPress={submitdata}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      color: "#ffffff",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    marginVertical: 10,
                    backgroundColor: "#ECEDF4",
                  }}
                  onPress={() => router.push('/register')}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    Create a New Account
                  </Text>
                </TouchableOpacity>
              </>
          }

          {/* 
                    <View>
                    <Text style={{
                            fontWeight: "bold",
                            letterSpacing: 1.5,
                            textAlign: "center",
                            fontSize: 14,
                            marginVertical: 30,
                            color: "#676A6E"
                        }}>Or continue with</Text>
                        <View>
                            <TouchableOpacity style={{
                                alignItems: "center"
                            }}>
                                <Image source={images.googleIcon} style={{height: 45, width: 45,borderRadius: 50}}/>
                            </TouchableOpacity>
                        </View>
                    </View> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
