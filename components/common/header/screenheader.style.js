import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 18,
    height: 18,
    padding: 17,
    backgroundColor: COLORS.white,
    // borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    // boxShadow:"  5px 5px 4px #bcbcbc,-5px -5px 4px #ffffff"
  },
  // btnImg: (dimension) => ({
  //   width: dimension,
  //   height: dimension,
  //   borderRadius: SIZES.small / 1.25,
  // }),
});

export default styles;
