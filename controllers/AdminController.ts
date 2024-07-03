import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utils/passwordUnility";


export const FindVandor = async (email: string, id: string | undefined) => {
  if (email) {
    return await Vandor.findOne({ email: email })
  }
  return await Vandor.findById(id)

}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVandorInput>req.body;

  const existingVandor = await FindVandor(email, '');

  if (existingVandor !== null) {
    return res.json({
      "message": "Vandor already exists"
    })
  }

  // generate the salt
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  // encrypt the password using salt


  const createdVandor = await Vandor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: []

  })

  return res.json(createdVandor)
}



export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {

  const vandors = await Vandor.find();

  if (vandors !== null) {
    return res.json(vandors);
  }
  return res.json({
    "message": "Vandors data not available"
  })

}


export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {

  const vendorId = req.params.id;
  const vandor = await FindVandor('', vendorId);
  if (vandor) {
    return res.json(vandor);
  }
  return res.json({ "message": "Vandor not found" });
}

