import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


export const ButtonSelect = ({ onPress, title, bgColor, colorText, sizeIcon, colorIcon, borderRadius, txtAlign, sizeWidth, sizeHeigth }) => {
  let iconName;
  if (title === 'Conductor') {
    iconName = `car`;
  } else if (title === 'Pasajero') {
    iconName = `male`;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          // flex: 1,
          width: sizeWidth || 150,
          // height: sizeHeigth || 150,
          backgroundColor: bgColor || 'white',
          borderRadius: borderRadius || 0 ,
          display: "flex",
          justifyContent: "flex-end",
          paddingHorizontal:16,
          paddingVertical:12
        }}
      >
        <Text style={{ textAlign: txtAlign || 'center', paddingHorizontal: 16 }}>
          <Icon name={iconName} size={sizeIcon} color={colorIcon} />
        </Text>
        <Text
          style={{
            color: colorText || "black",
            fontSize: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: txtAlign || 'center'
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome5';


// export const ButtonSelect = ({ onPress, title, bgColor, colorText, sizeIcon, colorIcon, radiusRight, radiusLeft, txtAlign }) => {
//   let iconName;
//   if (title === 'Conductor') {
//     iconName = `car`;
//   } else if (title === 'Pasajero') {
//     iconName = `male`;
//   }
//   return (
//     <View style={{ flexDirection: "row" }}>
//       <TouchableOpacity
//         onPress={onPress}
//         style={{
//           flex: 1,
//           maxWidth: 150,
//           height: 150,
//           backgroundColor: bgColor || 'white',
//           borderTopLeftRadius: radiusLeft || 0,
//           borderTopRightRadius: radiusRight || 0,
//           display: "flex",
//           justifyContent: "flex-end",
//           paddingHorizontal:16,
//           paddingVertical:12
//         }}
//       >
//         <Text style={{ textAlign: txtAlign || 'center', paddingHorizontal: 16 }}>
//           <Icon name={iconName} size={sizeIcon} color={colorIcon} />
//         </Text>
//         <Text
//           style={{
//             color: colorText || "black",
//             fontSize: 20,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: txtAlign || 'center'
//           }}
//         >
//           {title}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
