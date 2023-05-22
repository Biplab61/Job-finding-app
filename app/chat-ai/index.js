import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { useRouter, Stack } from 'expo-router'
import { COLORS } from '../../constants';
import axios from 'axios';

const index = () => {
    const router = useRouter();

    const [data, setData] = useState([{ type: "chat AI", 'text': "Hi How can I help you ?" }]);
    const APIKey = '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';
    const APIEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    // const APIEndpoint = 'https://api.openai.com/v1/chat/completions';


    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {

        setData([...data, { type: "You", 'text': textInput }]);

        if (textInput === '') {
            setData([...data, { type: "chat AI", 'text': 'Please Enter any text to start Chat.' }]);
        }
        else {
            await axios.post(APIEndpoint, {
                prompt: textInput,
                max_tokens: 3000,
                temperature: 0
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${APIKey}`,
                },
            })
                .then((res) => {
                    const text = res.data.choices[0].text.replace(/[\r\n]/gm, '');
                    setData([...data, { type: "You", 'text': textInput }, { type: 'chat AI', 'text': text }]);
                    setTextInput('');
                })
                .catch((err) => {
                    setData([...data, { type: "You", 'text': textInput }, { type: 'chat AI', 'text': "Sorry Faild to get data right now 😔." }]);
                    setTextInput('');
                })
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 10 }}>
                <Stack.Screen options={{ headerShown: false }} />

                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}>
                        Chat AI
                    </Text>
                </View>


                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ display: 'flex', alignItems: 'stretch', padding: 10, justifyContent: item.type === 'You' ? "flex-end" : "flex-start" }}>
                            <Text style={{ fontWeight: 'bold', color: item.type === 'You' ? 'green' : 'red', fontSize: 17 }}>{item.type === 'You' ? 'You: ' : 'Chat AI: '}</Text>
                            <Text style={{ fontSize: 16 }}>{item.text}</Text>
                        </View>
                    )}
                />

                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%', gap: 6, marginTop: 10 }}>
                    <TextInput
                        placeholder="Ask me anything...."
                        value={textInput}
                        placeholderTextColor={COLORS.primary}
                        onChangeText={text => setTextInput(text)}
                        style={{
                            fontSize: 17,
                            padding: 15,
                            width: '70%',
                            borderRadius: 10,
                            backgroundColor: "#DFE2EC",
                        }}
                    />

                    <TouchableOpacity style={{
                        padding: 15,
                        width: '20%',
                        borderRadius: 10,
                        backgroundColor: "#DFE2EC",
                    }}
                        onPress={handleSend}
                    >
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                        }}
                        >
                            SEND
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </>
    );
}

export default index;
