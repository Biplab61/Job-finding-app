import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.handlePress}>
      <Image source={props.iconUrl}
      resizeMode="cover"
      style={styles.btnContainer}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn