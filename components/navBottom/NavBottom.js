import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, images } from '../../constants'


function NavBottom({handleLogout, handleChatAI}) {
    return (
        <>
            <View style={{ position: "absolute", bottom: 20, alignItems: 'center', display: 'flex', paddingLeft: 20 }}>
                <View style={{ flexDirection: 'row', backgroundColor: COLORS.gray2, width: '100%', justifyContent: 'space-evenly', borderRadius: 20, padding: 10 }}>


                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={images.home}
                            resizeMode="cover"
                            style={{ height: 20, width: 20 }}
                        />
                        <Text style={{ color: '#1680DF' }}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={handleChatAI}>
                        <Image source={images.chat}
                            resizeMode="cover"
                            style={{ height: 20, width: 20 }}
                        />
                        <Text>Chat AI</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={images.profile}
                            resizeMode="cover"
                            style={{ height: 20, width: 20 }}
                        />
                        <Text>Profile</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={images.logout}
                            resizeMode="cover"
                            style={{ height: 20, width: 20 }}
                        />
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default NavBottom;
