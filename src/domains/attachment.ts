export class Attachment {
  _id: string;
  name: string;
  size: number;
  filePath: string;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Attachment) {
    this._id = init._id;
    this.name = init.name;
    this.size = init.size;
    this.filePath = init.filePath;
    this.createdUserId = init.createdUserId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
