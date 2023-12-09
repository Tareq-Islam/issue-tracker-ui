export interface TaskLocationSchemaJson {
  enable: boolean;
}

export enum InsertOption
{
    Required = 1,
    Optional,
    LateInsert
}

export enum ImageOption
{
    Capture = 1,
    Upload
}


export interface TaskImageSchemaJson {
  enable: boolean;
  insertOption: InsertOption;
  imageOption: ImageOption;
}

export interface TaskCauseFindingsSchemaJson {
  enable: boolean;
  insertOption: InsertOption;
}

export interface TaskSolutionSchemaJson {
  enable: boolean;
  insertOption: InsertOption;
}

export interface TaskSchemaJson
{
  location: TaskLocationSchemaJson;
  image: TaskImageSchemaJson;
  causeFindings: TaskCauseFindingsSchemaJson;
  solution: TaskSolutionSchemaJson;
}
