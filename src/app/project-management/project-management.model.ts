export interface projectModel {
  userId: string;
  projectName: string;
  projectId: string;
  projectStatus: string;
  projectDescription: string;
  projectManager: string,
  projectStartDate: string;
  projectEndDate: string;
  projectDevelopers: string[];
  updatedAt: Date;
}
