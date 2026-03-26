import * as Yup from "yup";
import { ErrorMessage } from "../static";

export const addUniversitySchema = Yup.object({
  name: Yup.string().trim().required("University name is required."),
  country: Yup.string().required("Country is required."),
  city: Yup.string().trim().required("City is required."),
  type: Yup.string().required("Type is required."),
  qsRanking: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .integer("QS World Ranking must be a whole number.")
    .min(1, "QS World Ranking must be at least 1.")
    .notRequired(),
  website: Yup.string()
    .trim()
    .test("website", "Website must be a valid domain or URL.", (value) => {
      if (!value) return true;
      return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(value);
    }),
  status: Yup.mixed<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required."),
});

export const addProgramSchema = Yup.object({
  name: Yup.string().trim().required(ErrorMessage.REQUIRED),
  universityId: Yup.string().required(ErrorMessage.REQUIRED),
  level: Yup.string().required(ErrorMessage.REQUIRED),
  studyMode: Yup.string().required(ErrorMessage.REQUIRED),
  duration: Yup.string(),
  tuitionFee: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value,
    )
    .typeError("Annual tuition must be a valid number.")
    .min(0, "Annual tuition cannot be negative.")
    .required(ErrorMessage.REQUIRED),
  intakes: Yup.string(),
  status: Yup.mixed<"ACTIVE" | "INACTIVE">()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required(ErrorMessage.REQUIRED),
});

