import { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from '../../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../../components';
import useFetch from '../../hook/useFetch';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBottom from '../../components/navBottom/NavBottom';



const index = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useFetch('search', {
        query: 'developer jobs in kolkata',
        num_pages: '3'
    });

    const [userDetails, setUserDetails] = useState({});

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('loginDetails');
            if (value !== null) {
                let val = JSON.parse(value);
                setUserDetails(val);
                // AsyncStorage.removeItem('loginDetails');
            }
        } catch (error) {
            setUserDetails(null);
        }
    };
    useEffect(() => {
        retrieveData();
    }, []);

    const handleLogout = () => {
        try {
            AsyncStorage.removeItem('loginDetails');
            alert("Logout Sucessfully");
            router.push('/login');
        }
        catch (error) {
            alert("Please try again");
        }
    }

    const handleChatAI = () => {
            router.push('/chat-ai');
        }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, paddingVertical: 35, paddingHorizontal: 10 }}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                />

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            padding: 10
                        }}
                    >
                        <Welcome searchIcon={icons.search}
                            search={search}
                            setSearch={setSearch}
                            username={userDetails.Name}
                            handleClick={() => {
                                if (search) {
                                    router.push(`search/${search}`)
                                }
                            }}
                        />

                        {isLoading ?
                            <ActivityIndicator size="large" colors={COLORS.primary} style={{ margin: 33, textAlign: "center" }} />
                            : error ? <Text style={{ margin: 33, textAlign: "center" }}>Sorry an Error Occure.</Text>
                                :
                                <>
                                    <Popularjobs data={data.splice(0, 10)} />
                                    <Nearbyjobs data={data.splice(11, 40)} />
                                </>
                        }

                    </View>
                </ScrollView>

                 <NavBottom handleLogout={handleLogout} handleChatAI={handleChatAI}/>

            </SafeAreaView>
        </>
    );
}

export default index;
