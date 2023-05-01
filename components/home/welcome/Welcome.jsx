import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
// import { Neomorph } from 'react-native-neomorph-shadows'

import styles from './welcome.style'
import { SIZES } from '../../../constants'


const jobTypes = ["Full-time", "Part-time", "Internship"]


const Welcome = (props) => {

  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time")

  const handleSearch = (item) => {
    router.push(`/search/${item}`);
  }

  return (
    <View>

      <View style={styles.container}>
        <Text style={styles.userName}>Hello Biplab,</Text>
        <Text style={styles.welcomeMessage}>Find your perfect Job</Text>
      </View>

      <View style={styles.searchContainer}>
        
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={props.search}
            placeholder='What are you looking for..?'
            onChangeText={(text) => { props.setSearch(text)}}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={props.handleClick}>
          <Image
            source={props.searchIcon}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)}
            onPress={()=>{setActiveJobType(item); handleSearch(item)}}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      </View>


    </View>
  )
}

export default Welcome