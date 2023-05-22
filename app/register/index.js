import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, images } from "../../constants";
import { AuthAPI } from '../../components/authentication/authAPI'
import axios from "axios";


const Register = () => {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState({});
    const [cpassword, setCpassword] = useState(null);
    const [registering, setRegistering] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[1-9]{1}[0-9]{9}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    const handleInputChange = (inputName, inputValue) => {
        setUserDetails({
            ...userDetails, [inputName]: inputValue,
        });
    }

    const validateEmail = (email) => {
        return emailRegex.test(email);
      }
      const validateMobile = (mobile) => {
        return mobileRegex.test(mobile);
      }
      const validateName = (name) => {
        return nameRegex.test(name);
      }

    const submitdata = async () => {
        setRegistering(true);

        if(validateEmail(userDetails.Email) && validateMobile(userDetails.Mobile) && validateName(userDetails.Name)){
            await axios.post(`${AuthAPI}/auth/register`, userDetails, {
                headers: {
                  'Content-Type': 'application/json',
                  'api_key': '5K#jRv8Dx@9Lq&3E7G$t2Hn6W4',
                }
              })
            .then((res) => {
                setRegistering(false);
                setUserDetails({});
                setCpassword(null);
                router.push('/login');
                alert("Registered Successfully");
            })
            .catch((err) => {
                alert(err.response.data);
                setRegistering(false);
            })
        }
        else{
            alert("Please Enter Valid Details")
        }

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
                        headerShadowVisible: false,
                        headerShown: false,
                        headerTitle: "",
                    }}
                />

                <View style={{ padding: 20 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 33,
                                color: "#1CA1DA",
                                fontWeight: "bold",
                                marginVertical: 17,
                            }}
                        >
                            Create an Account
                        </Text>
                        <Text
                            style={{
                                letterSpacing: 2,
                                fontSize: 12,
                                fontWeight: "bold",
                                textAlign: "center",
                                // maxWidth: "50%",
                            }}
                        >
                            Create an account so you can learn with AI and Find your Dream Job
                        </Text>
                    </View>
                    <ScrollView style={{ height: '90%' }} showsHorizontalScrollIndicator={false}>
                        <View style={{ marginVertical: 20 }}>
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor={COLORS.primary}
                                onChangeText={text => handleInputChange('Name', text)}
                                style={{
                                    fontSize: 17,
                                    padding: 13,
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    backgroundColor: "#DFE2EC"
                                }}
                            />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={COLORS.primary}
                                onChangeText={text => handleInputChange('Email', text)}
                                style={{
                                    fontSize: 17,
                                    padding: 13,
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    backgroundColor: "#DFE2EC"
                                }}
                            />
                            <TextInput
                                placeholder="Mobile Number"
                                placeholderTextColor={COLORS.primary}
                                onChangeText={text => handleInputChange('Mobile', text)}
                                keyboardType="numeric"
                                style={{
                                    fontSize: 17,
                                    padding: 13,
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    backgroundColor: "#DFE2EC",
                                }}
                            />

                            <TextInput
                                placeholder="password"
                                placeholderTextColor={COLORS.primary}
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={text => handleInputChange('password', text)}
                                style={{
                                    fontSize: 16,
                                    padding: 12,
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    backgroundColor: "#DFE2EC"
                                }}
                            />
                            <TextInput
                                placeholder="confirm password"
                                placeholderTextColor={COLORS.primary}
                                autoCorrect={false}
                                onChangeText={text => setCpassword(text)}
                                style={{
                                    fontSize: 16,
                                    padding: 12,
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    backgroundColor: "#DFE2EC"
                                }}
                            />
                            {userDetails.password === cpassword || userDetails.password === undefined ? null :
                                <Text style={{
                                    color: 'red',
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                }}>
                                    password & confirm password must be same</Text>
                            }
                        </View>

                        {
                            registering ? <ActivityIndicator size='large' color={COLORS.primary} /> :
                                <>
                                    <TouchableOpacity style={{
                                        padding: 15,
                                        backgroundColor: "#1CA1DA",
                                        marginVertical: 10,
                                        borderRadius: 10,
                                        shadowOffset: {
                                            width: 0,
                                            height: 10
                                        },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 10
                                    }}
                                        onPress={submitdata}
                                    >
                                        <Text style={{
                                            fontWeight: "bold",
                                            letterSpacing: 1.2,
                                            color: "#ffffff",
                                            textAlign: "center",
                                            fontSize: 17
                                        }}>Create Account</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        padding: 15,
                                        borderRadius: 10,
                                        marginVertical: 8,
                                        backgroundColor: "#ECEDF4",
                                    }}
                                        onPress={() => router.push('/login')}
                                    >
                                        <Text style={{
                                            fontWeight: "bold",
                                            letterSpacing: 1.2,
                                            textAlign: "center",
                                            fontSize: 17
                                        }}>Already a User ?</Text>
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
                                <Image source={images.googleIcon} style={{ height: 45, width: 45, borderRadius: 50 }} />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Register;
