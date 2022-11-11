import {
  Institution,
  InstitutionWithState,
} from "../interfaces/institution.interface";
import readLine from "readline";
import { searchMunicipio } from "./searchMunicipio";
import {
  filterDuplicatedFromArray,
  filterInstitution,
} from "../utils/filterDuplicates";
import { prisma } from "../database/prisma";

const institutionsUpload = async (infosLine: readLine.Interface) => {
  const institutionsUntreated: InstitutionWithState[] = [];

  for await (let line of infosLine) {
    const infosLineSplit = line.split(`${process.env.DELIMITER}`);

    institutionsUntreated.push({
      nome: infosLineSplit[0],
      tipo_instituicao: infosLineSplit[2],
      sigla: infosLineSplit[1],
      nome_campus: infosLineSplit[4],
      municipio: infosLineSplit[5],
      uf: infosLineSplit[6],
    });
  }

  const institutionsTreatedArray = filterInstitution(institutionsUntreated);

  const filteredInstitutions: Institution[] = [];

  const errorLog = [];

  for await (let institution of institutionsTreatedArray) {
    const municipioToSearch = institution.municipio;
    const UFToSearch = institution.uf;

    const municipioId = await searchMunicipio(municipioToSearch, UFToSearch);

    if (municipioId === null) {
      errorLog.push({
        nome: institution.nome,
        nome_campus: institution.nome_campus,
        sigla: institution.sigla,
        tipo_instituicao: institution.tipo_instituicao,
        estado: institution.uf,
        municipio: institution.municipio,
        motivo: "O Município informado não está cadastrado na base de dados",
      });
      continue;
    }

    filteredInstitutions.push({
      nome: institution.nome,
      municipiosId: Number(municipioId),
      nome_campus: institution.nome_campus,
      sigla: institution.sigla,
      tipo_instituicao: institution.tipo_instituicao,
    });
  }

  await prisma.instituicoes.createMany({ data: filteredInstitutions });

  return { institutionsUntreated, filteredInstitutions, errorLog };
};

export { institutionsUpload };
