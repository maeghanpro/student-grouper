import StudentSerializer from "./StudentSerializer.js";

class GroupSerializer {
  static getSummary(group) {
    const allowedAttributes = ["id", "name", "arrangementId"];
    const serializedGroup = {};

    for (const attribute of allowedAttributes) {
      serializedGroup[attribute] = group[attribute];
    }

    return serializedGroup;
  }

  static async getDetails(group) {
    const serializedGroup = this.getSummary(group);

    serializedGroup.students = await group.$relatedQuery("students").orderBy("firstName");
    serializedGroup.students = serializedGroup.students.map((student) =>
      StudentSerializer.getSummary(student)
    );

    return serializedGroup;
  }
}

export default GroupSerializer;
