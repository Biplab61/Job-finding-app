import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { COLORS } from '../../../constants'



const Nearbyjobs = ({data}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Nearby Jobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show all</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.cardsContainer}>
   {   data?.map((job)=>{
        return <NearbyJobCard 
          key={`nearby-job-${job?.job_id}`}
          job={job}
          haldlenavigate={()=>router.push(`/job-details/${job.job_id}`)}
        />
      })}
    </View>
  </View>
  )
}

export default Nearbyjobs;