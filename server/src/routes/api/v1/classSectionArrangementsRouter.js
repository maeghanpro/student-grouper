import express from "express";

import { ClassSection } from "../../../models/index.js";
import ClassSectionSerializer from "../../../serializers/ClassSectionSerializer.js";

const classSectionArrangementsRouter = new express.Router({ mergeParams: true });

classSectionArrangementsRouter.get("/", async (req, res) => {
  const { id } = req.params;
  try {
    const classSection = await ClassSection.query().findById(id);
    const serializedClassSection = await ClassSectionSerializer.getDetails(classSection);
    return res.status(200).json({ classSection: serializedClassSection });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

export default classSectionArrangementsRouter;
