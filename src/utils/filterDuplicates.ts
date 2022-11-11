import { Course } from "../interfaces/course.interface";
import { CourseInstitutions } from "../interfaces/courseInstitution.interface";
import { InstitutionWithState } from "../interfaces/institution.interface";

const filterDuplicateCourse = (data: Array<Course>) => {
  var treatedCourseArray: Array<Course> = [];
  data.filter((course) => {
    var i = treatedCourseArray.findIndex(
      (x) =>
        x.nome == course.nome &&
        x.grau == course.grau &&
        x.turno == course.turno
    );
    if (i <= -1) {
      treatedCourseArray.push(course);
    }
    return null;
  });
  return treatedCourseArray;
};

const filterDuplicateCourseRelatedWithInstitution = (
  data: Array<CourseInstitutions>
) => {
  var treatedRelationArray: Array<CourseInstitutions> = [];
  data.filter((relation) => {
    var i = treatedRelationArray.findIndex(
      (x) =>
        x.nome_curso == relation.nome_curso &&
        x.nome_instituicao == relation.nome_instituicao &&
        x.grau == relation.grau &&
        x.turno == relation.turno
    );
    if (i <= -1) {
      treatedRelationArray.push(relation);
    }
    return null;
  });
  return treatedRelationArray;
};

const filterDuplicatedFromArray = (dataArray: Array<Course>) => {
  const setData = new Set();

  const filteredData = dataArray.filter((data) => {
    const duplicatedData = setData.has(data.nome && data.grau && data.turno);
    setData.add(data.nome && data.grau && data.turno);
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
  filterDuplicateCourse,
  filterDuplicateCourseRelatedWithInstitution,
};
