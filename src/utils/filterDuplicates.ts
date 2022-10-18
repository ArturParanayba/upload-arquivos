import { Course } from "../interfaces/course.interface";
import { CourseInstitutions } from "../interfaces/courseInstitution.interface";
import { InstitutionWithState } from "../interfaces/institution.interface";

const filterDuplicatedFromArray = (dataArray: Array<Course>) => {
  const setData = new Set();

  const filteredData = dataArray.filter((data) => {
    const duplicatedData = setData.has(data.nome);
    setData.add(data.nome);
    return !duplicatedData;
  });

  return filteredData;
};

const filterInstitution = (data: Array<InstitutionWithState>) => {
  const setData = new Set();

  const filteredInstitutionArray = data.filter((data) => {
    const duplicatedData = setData.has(data.nome);
    setData.add(data.nome);
    return !duplicatedData;
  });

  return filteredInstitutionArray;
};

const filterCourseInstitutionRelationData = (
  data: Array<CourseInstitutions>
) => {
  const setData = new Set();

  const filteredData = data.filter((data) => {
    const duplicatedData = setData.has(
      data.nome_curso && data.nome_instituicao
    );
    setData.add(data.nome_curso && data.nome_instituicao);
    return !duplicatedData;
  });

  return filteredData;
};

export {
  filterDuplicatedFromArray,
  filterCourseInstitutionRelationData,
  filterInstitution,
};
