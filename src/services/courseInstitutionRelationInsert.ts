import readLine from "readline";
import { filterCourseInstitutionRelationData } from "../utils/filterDuplicates";
import { CourseInstitutions } from "../interfaces/courseInstitution.interface";
import { prisma } from "../database/prisma";

const courseInstitutionRelationInsert = async (
  data: Array<CourseInstitutions>
) => {
  const relationship: CourseInstitutions[] = [];

  for await (let relation of data) {
    const institutionName = relation.nome_instituicao;
    const courseName = relation.nome_curso;
    const courseType = relation.grau;
    const courseShift = relation.turno;

    const courseId = await prisma.cursos.findFirst({
      where: {
        nome: courseName,
        grau: courseType,
        turno: courseShift,
      },
    });

    const institutionId = await prisma.instituicoes.findFirst({
      where: {
        nome: institutionName,
      },
    });

    relationship.push({
      cursosId: courseId?.id,
      instituicoesId: institutionId?.id,
    });
  }

  const relationsTreatedArray =
    filterCourseInstitutionRelationData(relationship);

  //await prisma.cursos_instituicoes.createMany({ data: relationsTreatedArray });

  console.log("relacionamentos criados: ", relationsTreatedArray.length);
  return relationsTreatedArray;
};

export { courseInstitutionRelationInsert };
