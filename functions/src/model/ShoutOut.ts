import { ObjectID } from "mongodb";

export default interface ShoutOut {
  _id?: ObjectID;
  to: string;
  from: string;
  message: string;
}
