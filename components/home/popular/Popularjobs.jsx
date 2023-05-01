import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useRouter } from 'expo-router'


import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

const Popularjobs = ({data}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
        data={data}
        renderItem={({item})=>(
          <PopularJobCard item={item} haldlenavigate={()=>router.push(`/job-details/${item.job_id}`)}/>
        )}
        keyExtractor={item => item?.job_id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        horizontal
        />
      </View>
    </View>
  )
}

export default Popularjobs;