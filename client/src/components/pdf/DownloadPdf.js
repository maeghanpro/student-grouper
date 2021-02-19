import React from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'

import StudentViewPdf from './StudentViewPdf'

const DownloadPdf = ({arrangement, classSectionName}) => {
  return (
    <PDFDownloadLink 
      className="pdf-download-link" 
      document={
        <StudentViewPdf 
          arrangement={arrangement} 
          classSectionName={classSectionName}
        />
      }
      fileName={`${arrangement.name}.pdf`}
    >
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  )
}

export default DownloadPdf