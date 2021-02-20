import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
  subheader: {
    textAlign: 'center',
    fontSize: 14,
    marginRight: 80,
    marginBottom: 10
  },
  notes: {
    fontSize: 12,
    padding: 10,
    border: 1,
    marginLeft: 40
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 50
  },
  groupTile: {
    flexDirection: 'column',
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

const PrintFriendlyPdf = ({arrangement, classSectionName, studentView}) => {
  const arrangementDetails = (
    <View>
      <Text style={styles.subheader}>{`Type: ${arrangement.type}    Created ${arrangement.createdAt}`} </Text>
      {arrangement.notes? <Text style={styles.notes}>{arrangement.notes}</Text> : null}
    </View>
  )
  const groups = arrangement.groups.map(group => {
    const students = group.students.map(student => {
      return (
        <Text 
          key={student.id} 
          style={styles.studentName}
        >{student.firstName} {student.lastInitial} {!studentView ? `(A${student.academicTier} S${student.socialEmotionalTier})` : undefined}</Text>
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
          <Text style={styles.header}>{classSectionName}</Text>
          <Text style={styles.header}>{arrangement.name}</Text>
          {!studentView ? arrangementDetails: undefined}
        </View>
        <View style={styles.groupsGrid}>
          {groups}
        </View>
      </Page>
    </Document>
  )
}

export default PrintFriendlyPdf