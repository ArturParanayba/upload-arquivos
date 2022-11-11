import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readLine from "readline";

import multer from "multer";
import { institutionsUpload } from "./services/institutionsUpload";
import { coursesUpload } from "./services/coursesUpload";
import { courseInstitutionRelationInsert } from "./services/courseInstitutionRelationInsert";
const multerConfig = multer();

const router = Router();
router.post(
  "/upload-cursos",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;

    const readableFile = new Readable();
    readableFile.push(file?.buffer);
    readableFile.push(null);

    const infosLine = readLine.createInterface({
      input: readableFile,
    });

    const { coursesTreatedArray } = await coursesUpload(infosLine);

    const insertCourseOnstitutionRelation =
      await courseInstitutionRelationInsert(
        coursesRelatedWithInstitutionsTreatedArray
      );

    return res.send({
      data: {
        cursos: {
          "Total de cursos cadastrados: ": coursesTreatedArray.length,
          "Cursos cadastrados: ": coursesTreatedArray,
        },
        relacionamentoCursoInstituicao: {
          "Relacionamentos Criados": insertCourseOnstitutionRelation.length,
        },
      },
    });
  }
);
router.post(
  "/upload-instituicoes",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;

    const readableFile = new Readable();
    readableFile.push(file?.buffer);
    readableFile.push(null);

    const infosLine = readLine.createInterface({
      input: readableFile,
    });

    const { filteredInstitutions, errorLog, institutionsUntreated } =
      await institutionsUpload(infosLine);

    return res.json({
      data: {
        instituicoes: {
          "Total de registros: ": institutionsUntreated.length,
          "Instituições cadastradas: ": filteredInstitutions.length,
          "Quantidade de erros:": errorLog.length,
          "Instituições não cadastradas: ": errorLog,
          "Instituições cadastradas com sucesso: ": filteredInstitutions,
        },
      },
    });
  }
);

export { router };
