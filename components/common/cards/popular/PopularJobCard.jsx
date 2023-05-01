import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = (props) => {
  return (
    <TouchableOpacity style={styles.container(props.selectedJob, props.item)}
      onPress={()=> props.haldlenavigate()}
    >
      <TouchableOpacity style={styles.logoContainer(props.selectedJob, props.item)}>
        <Image
          source={{uri: props.item.employer_logo}}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{props.item.employer_name}</Text>

      <View style={styles.infoContainer}>
         <Text style={styles.jobName(props.selectedJob, props.item)} numberOfLines={1}>
          {props.item.job_title}
         </Text>
         <Text style={styles.location}>{props.item.job_state}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard