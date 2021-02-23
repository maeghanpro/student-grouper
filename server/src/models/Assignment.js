const Model = require("./Model.js");

class Assignment extends Model {
  static get tableName() {
    return "assignments";
  }

  static get relationMappings() {
    const { Group, Student } = require("./index.js");

    return {
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: "assignments.groupId",
          to: "groups.id",
        },
      },
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student,
        join: {
          from: "assignments.studentId",
          to: "students.id",
        },
      },
    };
  }
}

module.exports = Assignment;
