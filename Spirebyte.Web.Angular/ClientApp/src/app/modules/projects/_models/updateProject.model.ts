export class ProjectUpdateModel {
  id: string;
  projectUserIds: string[];
  pic: string;
  file: string;
  title: string;
  description: string;

  setUpdateModel(project: any) {
    this.id = project.id;
    this.pic = project.pic;
    this.file = project.file;
    this.projectUserIds = project.projectUserIds || [];
    this.title = project.title || '';
    this.description = project.description;
  }
}
