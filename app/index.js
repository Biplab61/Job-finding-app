import { useState, useEffect } from "react";
import { SafeAreaView, View, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Stack } from "expo-router";
import { COLORS } from '../constants'
import { AuthWelcome } from '../components'
import { images } from '../constants'



const Home = () => {

    const router = useRouter();
    const [loginDetails, setLoginDetails] = useState(null);
    const [loadingSrc, setLoadingSrc] = useState(true);

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('loginDetails');
            if (value !== null) {
                setLoginDetails(value);
            }
        } catch (error) {
            setLoginDetails(null);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setLoadingSrc(false);
            }, 3000);
        retrieveData();
    }, []);





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, paddingVertical: 35, paddingHorizontal: 10 }}>
            {loadingSrc ? <>
                <Stack.Screen
                    options={{
                        headerShadowVisible: false,
                        headerShown: false,
                        headerTitle: "",
                    }}
                />
                <View style={{ display: "flex", justifyContent: "center", top: '40%' }}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: -20 }}>
                        <Image source={images.chat} style={{ height: 50, width: 50 }} />
                    </View>
                    <ImageBackground
                        style={{ height: 90 }}
                        resizeMode='contain'
                        source={images.loading}
                    />
                </View>
            </> :

                (loginDetails !== null ? router.push('/job-home') : <AuthWelcome />)
            }

        </SafeAreaView>
    );
}

export default Home;