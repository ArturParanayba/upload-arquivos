import { prisma } from "../database/prisma";

interface searchedData {
  id: string;
}

const searchMunicipio = async (
  municipioName: string,
  uf: string
): Promise<string | null> => {
  // const data = "2";
  try {
    const data: searchedData[] = await prisma.$queryRaw`SELECT m.id 
	FROM municipios m 
	  INNER JOIN estados e ON m.estadosId  = e.id 
	    WHERE m.nome = ${municipioName} AND e.uf = ${uf}`;

    return data[0].id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { searchMunicipio };
