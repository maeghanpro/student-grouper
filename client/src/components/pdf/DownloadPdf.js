import React from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer'

import PrintFriendlyPdf from './PrintFriendlyPdf'

const DownloadPdf = ({arrangement, classSectionName, studentView}) => {
  return (
    <PDFDownloadLink 
      className="pdf-download-link" 
      document={
        <PrintFriendlyPdf 
          arrangement={arrangement} 
          classSectionName={classSectionName}
          studentView={studentView}
        />
      }
      fileName={`${arrangement.name}.pdf`}
    >
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  )
}

export default DownloadPdf