import { ClassSection } from "../models/index.js";

const getClassSectionColor = async (userId) => {
  const colorOptions = [
    "#93995F",
    "#315E78",
    "#2E3F5A",
    "#7B717C",
    "#B56D5F",
    "#795061",
    "#39565A",
    "#99515A",
    "#6F6F87",
    "#E48B6B",
    "#6D9885",
    "#7C6764",
  ];
  const classSections = await ClassSection.query().where("userId", userId);
  const usedColors = classSections.map((classSection) => classSection.color);
  const selectedColor = colorOptions.find((color) => !usedColors.includes(color));
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  const randomColor = colorOptions[randomIndex];

  if (selectedColor) {
    return selectedColor;
  }
  return randomColor;
};

export default getClassSectionColor;
