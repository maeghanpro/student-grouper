import React, { useState } from "react";
import {
 TableCell, TableRow, IconButton, Tooltip 
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import EditStudentForm from "./EditStudentForm";
import DeleteAlertDialog from "../Alerts/DeleteAlertDialog";

const StudentTableRow = ({ student, patchStudent, clearErrors, deleteStudent }) => {
  const [editable, setEditable] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [shouldDelete, setShouldDelete] = useState(false);

  const confirmDelete = () => {
    setDeleteAlert(
      <DeleteAlertDialog
        handleDelete={(confirmation) => {
          setShouldDelete(confirmation);
          setDeleteAlert(null);
        }}
        alertTitle={`Delete Student '${student.firstName} ${student.lastInitial}'?`}
        alertBody={
          "Deleting this student will also delete them from their groups.\nThis action cannot be undone"
        }
        alertReason="delete-student"
      />,
    );
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleClose = () => {
    setEditable(false);
    clearErrors();
  };

  const updateEditable = () => setEditable(false);

  if (shouldDelete) {
    deleteStudent(student.id);
  }

  if (editable) {
    return (
      <EditStudentForm
        previousStudent={student}
        patchStudent={patchStudent}
        updateEditable={updateEditable}
        handleClose={handleClose}
      />
    );
  }
  return (
    <TableRow className="table-row" key={student.id}>
      {deleteAlert}
      <TableCell component="th" scope="row">
        {student.firstName} {student.lastInitial}
      </TableCell>
      <TableCell align="center">{student.academicTier}</TableCell>
      <TableCell align="center">{student.socialEmotionalTier}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit">
          <IconButton
            className="edit-student-icon"
            aria-label="edit"
            color="inherit"
            onClick={handleEdit}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            className="delete-student-icon"
            aria-label="delete"
            color="inherit"
            onClick={confirmDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
