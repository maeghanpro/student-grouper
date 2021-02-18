import React from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'

import StudentViewPdf from './StudentViewPdf'

const DownloadPdf = ({arrangement}) => {
  return (
    <PDFDownloadLink 
      className="pdf-download-link" 
      document={<StudentViewPdf arrangement={arrangement} />}
      fileName={`${arrangement.name}.pdf`}
    >
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  )
}

export default DownloadPdf