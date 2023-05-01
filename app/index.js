import { useState } from "react";
import { View, ScrollView, SafeAreaView, ActivityIndicator , Text} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'
import useFetch from '../hook/useFetch'


const Home = () => {

    const router = useRouter();

    const { data, isLoading, error } = useFetch('search', {
        query: 'developer jobs in kolkata',
        num_pages: '3'
    });

    const [search, setSearch] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} />
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome searchIcon={icons.search}
                        search={search}
                        setSearch={setSearch}
                        handleClick={()=>{
                            if(search){
                                router.push(`search/${search}`)
                            }
                        }}
                    />

                    {isLoading ? (
                        <ActivityIndicator size="large" colors={COLORS.primary} style={{margin: 33, textAlign: "center"}}/>
                    ) : error ? (<Text style={{margin: 33, textAlign: "center"}}>Sorry an Error Occure.</Text>)
                        : (<>
                            <Popularjobs data={data.splice(0,10)} />
                            <Nearbyjobs data={data.splice(11,40)} />
                        </>)}

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default Home;