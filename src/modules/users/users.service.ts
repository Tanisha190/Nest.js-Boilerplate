import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schema/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose/dist/common/mongoose.decorators";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: any) {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }
}