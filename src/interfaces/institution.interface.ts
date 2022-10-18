export interface InstitutionWithState {
  nome: string;
  tipo_instituicao: string;
  municipiosId?: number;
  sigla: string;
  nome_campus: string;
  municipio: string;
  uf: string;
}

export interface Institution {
  nome: string;
  tipo_instituicao: string;
  municipiosId: number;
  sigla: string;
  nome_campus: string;
}
