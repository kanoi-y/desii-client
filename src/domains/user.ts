export class User {
  _id: string
  name: string
  description: string
  email: string
  iconImageId: string
  createdAt: Date
  updatedAt: Date
  constructor({
    _id,
    name,
    description,
    email,
    iconImageId,
    createdAt,
    updatedAt,
  }: User) {
    this._id = _id
    this.name = name
    this.description = description
    this.email = email
    this.iconImageId = iconImageId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
