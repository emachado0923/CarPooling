import React, { Component } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
// Responsive
import { Grid, Row, Col } from "react-native-easy-grid";

const Select = ({title})=>{
  return(
    <View style={styles.container}>
        <Text>{title}</Text>
        <Row style={styles.contSelect}>
          <Picker style={{
            width:'100%'
          }}>
            <Picker.Item label="Casa" value="Calle 42" />
            <Picker.Item label="Casa 2" value="Calle 43" />
          </Picker>

        </Row>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  contSelect: {
    height:'auto',
    borderWidth: 1,
    borderColor: '#00AA37',
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
    marginVertical: 12,
  }
});

export default (Select)


// export default class Select extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   componentDidMount() { }

//   render() {

//     return (
//       <View style={styles.container}>
//         <Text>{}</Text>
//         <Row style={styles.contSelect}>
//           <Picker style={{
//             minWidth: "85%",
//             maxWidth: "85%",
//           }}>
//             <Picker.Item label="Casa" value="Calle 42" />
//             <Picker.Item label="Casa 2" value="Calle 43" />
//           </Picker>

//         </Row>
//       </View>
//     );
//   }
// }
