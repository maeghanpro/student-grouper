import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import AddStudentForm from "./AddStudentForm";
import StudentTableRow from "./StudentTableRow";

const StudentsTable = ({
  students,
  revealAddStudentForm,
  addNewStudent,
  classSectionId,
  closeForm,
  patchStudent,
  clearErrors,
  deleteStudent,
  tableContainerId,
}) => {
  let firstRow;
  if (revealAddStudentForm) {
    firstRow = (
      <AddStudentForm
        addNewStudent={addNewStudent}
        classSectionId={classSectionId}
        closeForm={closeForm}
      />
    );
  }

  const rows = students.map((student) => (
    <StudentTableRow
      key={student.id}
      student={student}
      patchStudent={patchStudent}
      clearErrors={clearErrors}
      deleteStudent={deleteStudent}
    />
  ));

  return (
    <TableContainer id={tableContainerId} className="table" component={Paper}>
      <Table stickyHeader aria-label="students table">
        <TableHead>
          <TableRow className="table-header-row">
            <TableCell>Student Name</TableCell>
            <TableCell align="center">Academic Tier</TableCell>
            <TableCell align="center">Social-Emotional Tier</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {firstRow}
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
