import React from 'react';

const index = () => {
    return (
        <>
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
        </>
    );
}

export default index;
