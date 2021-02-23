const Model = require("./Model.js");

class Group extends Model {
  static get tableName() {
    return "groups";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Assignment, Arrangement, Student } = require("./index.js");

    return {
      assignments: {
        relation: Model.HasManyRelation,
        modelClass: Assignment,
        join: {
          from: "groups.id",
          to: "assignments.groupId",
        },
      },
      arrangement: {
        relation: Model.BelongsToOneRelation,
        modelClass: Arrangement,
        join: {
          from: "groups.arrangementId",
          to: "arrangements.id",
        },
      },
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: "groups.id",
          through: {
            from: "assignments.groupId",
            to: "assignments.studentId",
          },
          to: "students.id",
        },
      },
    };
  }
}

module.exports = Group;
