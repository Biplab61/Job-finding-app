import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions } from 'react-native'
import { useRouter , Stack} from 'expo-router'
import { images } from '../../constants'



const { height } = Dimensions.get("window");

function Welcome() {
    const router = useRouter();


    return (
        <>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    headerTitle: "",
                }}
            />
            <SafeAreaView>
                <View>
                    <ImageBackground
                        style={{ height: height / 2.5 }}
                        resizeMode='contain'
                        source={images.AuthImg}
                    />

                    <View
                        style={{ paddingHorizontal: 10, paddingTop: 30 }}
                    >
                        <Text
                            style={{ fontSize: 35, textAlign: 'center', color: "#1CA1DA", fontWeight: 'bold' }}
                        >
                            Learn with AI and Discover your Dream Job
                        </Text>

                        <Text
                            style={{ fontSize: 14, textAlign: 'center', fontWeight: 'light', marginVertical: 30 }}
                        >
                            Learn with World's Famous AI ChatGPT 3.5 and Discover your Job based on your interest.
                        </Text>

                        <View style={{ flexDirection: "row", paddingTop: 50, paddingHorizontal: 20, gap: 20 }}>
                            
                            <TouchableOpacity
                                style={{ backgroundColor: "#009EF2", paddingVertical: 15, paddingHorizontal: 20, width: "45%", borderRadius: 10 }}
                                onPress={() => router.push('/login')}
                            >
                                <Text
                                    style={{ fontWeight: 'bold', color: "#ffffff", fontSize: 18, textAlign: "center", letterSpacing: 1 }}
                                >Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ backgroundColor: "#DFE2EC", paddingVertical: 15, paddingHorizontal: 20, width: "45%", borderRadius: 10 }}
                                onPress={() => router.push('/register')}
                            >
                                <Text
                                    style={{ fontWeight: 'bold', color: "#000000", fontSize: 18, textAlign: "center", letterSpacing: 1 }}
                                >
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

export default Welcome;
