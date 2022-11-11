import readLine from "readline";
import {
  filterCourseInstitutionRelationData,
  filterDuplicatedFromArray,
  filterDuplicateCourse,
  filterDuplicateCourseRelatedWithInstitution,
} from "../utils/filterDuplicates";
import { Course } from "../interfaces/course.interface";
import { CourseInstitutions } from "../interfaces/courseInstitution.interface";
import { prisma } from "../database/prisma";

const coursesUpload = async (infosLine: readLine.Interface) => {
  const coursesToInsert: Course[] = [];

  const coursesRelatedWithInstitutions: CourseInstitutions[] = [];

  for await (let line of infosLine) {
    const infosLineSplit = line.split(`${process.env.DELIMITER}`);

    coursesToInsert.push({
      nome: infosLineSplit[8],
      grau: infosLineSplit[9],
      turno: infosLineSplit[10],
    });

    // coursesRelatedWithInstitutions.push({
    //   nome_curso: infosLineSplit[8],
    //   nome_instituicao: infosLineSplit[0],
    //   grau: infosLineSplit[9],
    //   turno: infosLineSplit[10],
    // });
  }
  const coursesTreatedArray = filterDuplicateCourse(coursesToInsert);

  // const coursesRelatedWithInstitutionsTreatedArray =
  //   filterDuplicateCourseRelatedWithInstitution(coursesRelatedWithInstitutions);

  await prisma.cursos.createMany({
    data: coursesTreatedArray,
  });

  return {
    coursesTreatedArray,
  };
};

export { coursesUpload };
