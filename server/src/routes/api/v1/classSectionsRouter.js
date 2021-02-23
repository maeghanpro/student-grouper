import express from "express";
import { ValidationError } from "objection";

import { ClassSection, User, Student, Arrangement } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import ClassSectionSerializer from "../../../serializers/ClassSectionSerializer.js";
import classSectionArrangementsRouter from "./classSectionArrangementsRouter.js";
import getClassSectionColor from "../../../services/getClassSectionColor.js";

const classSectionsRouter = new express.Router();

classSectionsRouter.use("/:id/arrangements", classSectionArrangementsRouter);

classSectionsRouter.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.query().findById(userId);
    const classSections = await user.$relatedQuery("classSections").orderBy("name");
    const serializedClassSections = await Promise.all(
      classSections.map((classSection) => ClassSectionSerializer.getStudentDetails(classSection))
    );
    return res.status(200).json({ classSections: serializedClassSections });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

classSectionsRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const body = cleanUserInput(req.body);
  try {
    body.color = await getClassSectionColor(userId);
    const classSection = await ClassSection.query().insertAndFetch({ ...body, userId });
    const user = await classSection.$relatedQuery("user");
    const classSections = await user.$relatedQuery("classSections").orderBy("name");
    const serializedClassSections = await Promise.all(
      classSections.map((classSection) => ClassSectionSerializer.getStudentDetails(classSection))
    );
    return res.status(201).json({ classSections: serializedClassSections });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

classSectionsRouter.patch("/", async (req, res) => {
  const body = cleanUserInput(req.body);
  try {
    const classSection = await ClassSection.query().patchAndFetchById(body.id, body);
    const user = await classSection.$relatedQuery("user");
    const classSections = await user.$relatedQuery("classSections").orderBy("name");
    const serializedClassSections = await Promise.all(
      classSections.map((classSection) => ClassSectionSerializer.getStudentDetails(classSection))
    );
    return res.status(200).json({ classSections: serializedClassSections });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

classSectionsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const classSection = await ClassSection.query().findById(id);
    const serializedClassSection = await ClassSectionSerializer.getStudentDetails(classSection);
    return res.status(200).json({ classSection: serializedClassSection });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

classSectionsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const relatedArrangements = await Arrangement.query().where("classSectionId", id);
    await Promise.all(
      relatedArrangements.map(async (arrangement) => {
        const groups = await arrangement.$relatedQuery("groups");
        await Promise.all(groups.map((group) => group.$relatedQuery("assignments").delete()));
        return arrangement.$relatedQuery("groups").delete();
      })
    );
    await Arrangement.query().delete().where("classSectionId", id);
    await Student.query().delete().where("classSectionId", id);
    await ClassSection.query().deleteById(id);
    const user = await User.query().findById(userId);
    const classSections = await user.$relatedQuery("classSections").orderBy("name");
    const serializedClassSections = await Promise.all(
      classSections.map((classSection) => ClassSectionSerializer.getStudentDetails(classSection))
    );
    return res.status(200).json({ classSections: serializedClassSections });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

export default classSectionsRouter;
