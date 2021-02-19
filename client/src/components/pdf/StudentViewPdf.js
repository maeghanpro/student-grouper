import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 50
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginRight: 80,
    marginBottom: 10
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 50
  },
  groupTile: {
    flexDirection: 'column',
    border: '2px solid black',
    borderRadius: 4,
    margin: 20
  }, 
  groupName: {
    fontSize: 16,
    marginBottom: 10
  },
  studentName: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 5
  }
});

const StudentViewPdf = ({arrangement, classSectionName}) => {
  const groups = arrangement.groups.map(group => {
    const students = group.students.map(student => {
      return (
        <Text key={student.id} style={styles.studentName}>{student.firstName} {student.lastInitial}</Text>
      )
    })
    return (
      <View key={group.id} style={styles.groupTile}>
        <Text style={styles.groupName}>{group.name}</Text>
        {students}
      </View>
    )
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>{classSectionName} {arrangement.name}</Text>
        </View>
        <View style={styles.groupsGrid}>
          {groups}
        </View>
      </Page>
    </Document>
  )
}

export default StudentViewPdf