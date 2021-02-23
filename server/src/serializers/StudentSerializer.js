class StudentSerializer {
  static getSummary(student) {
    const allowedAttributes = [
      "id",
      "firstName",
      "lastInitial",
      "academicTier",
      "socialEmotionalTier",
    ];
    const serializedStudent = {};

    for (const attribute of allowedAttributes) {
      serializedStudent[attribute] = student[attribute];
    }

    return serializedStudent;
  }
}

export default StudentSerializer;
