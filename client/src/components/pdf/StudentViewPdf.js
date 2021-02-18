import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   },
//   groupsGrid: {
//     flexDirection: 'column',
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   },
//   groupTile: {
//     flexDirection: 'row',
//     border: '2px solid black',
//     borderRadius: 4,
//     margin: 20
//   }, 
//   groupName: {
//     fontSize: 14,
//     textAlign: 'center',
//     fontFamily: 'Roboto'
//   },
//   studentName: {
//     fontSize: 12,
//     textAlign: 'left',
//     fontFamily: 'Roboto'
//   }
// });


const StudentViewPdf = ({arrangement}) => {
  // const groups = arrangement.groups.map(group => {
  //   const students = group.students.map(student => {
  //     return (
  //       <Text>{student.firstName} {student.lastInitial}</Text>
  //     )
  //   })
  //   return (
  //     <View style={styles.groupTile}>
  //       <Text style={styles.groupName}>{groupName}</Text>
  //       {students}
  //     </View>
  //   )
  // })

  // return (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>{arrangement.name}</Text>
  //       </View>
  //       <View style={styles.groupsGrid}>
  //         {groups}
  //       </View>
  //     </Page>
  //   </Document>
  // )

  return <h1>test</h1>
}

export default StudentViewPdf