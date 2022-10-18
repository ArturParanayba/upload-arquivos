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

const institutionsUpload = async (infosLine: readLine.Interface) => {
  const institutionsUntreated: InstitutionWithState[] = [];

  for await (let line of infosLine) {
    const infosLineSplit = line.split(`${process.env.DELIMITER}`);

    // const municipioToSearch = infosLineSplit[5];
    // const UFToSearch = infosLineSplit[6];

    // const MunicipioId = await searchMunicipio(municipioToSearch, UFToSearch);

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

    try {
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
    } catch (error) {
      errorLog.push({
        nome: institution.nome,
        nome_campus: institution.nome_campus,
        sigla: institution.sigla,
        tipo_instituicao: institution.tipo_instituicao,
      });
      continue;
    }
  }
  //INSERT NO BANCO filteredInstitutions

  return { institutionsUntreated, filteredInstitutions, errorLog };
};

export { institutionsUpload };
