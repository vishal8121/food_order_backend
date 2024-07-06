import { Request, Response, NextFunction } from 'express';
import { VandorLoginInputs, EditVandorInput } from '../dto';
import { FindVandor } from './AdminController';
import { GenerateSignature, ValidatePassword } from '../utils/passwordUnility';



export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <VandorLoginInputs>req.body;

  const existingVandor = await FindVandor(email, '');

  if (existingVandor !== null) {
    // validation and give access

    const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);

    if (validation) {
      const signature = await GenerateSignature({
        _id: existingVandor.id,
        email: existingVandor.email,
        foodTypes: existingVandor.foodType,
        name: existingVandor.name
      })

      return res.json(signature);
    } else {
      return res.json({ "messsage": "Password is not valid" });
    }
  }
  return res.json({ "messsage": "login Credentials not valid" });

}



export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor('', user._id);
    return res.json(existingVandor);

  }
  return res.json({
    "messsage": "Vandor Information not found"
  })

}



export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

  const { foodTypes, name, address, phone } = <EditVandorInput>req.body;
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor('', user._id);
    if (existingVandor !== null) {
      existingVandor.foodType = foodTypes,
        existingVandor.name = name,
        existingVandor.address = address,
        existingVandor.phone = phone

      const saveResult = await existingVandor.save();
      return res.json({ "message": "Profile Updated", "data": saveResult });
      ;
    }
    return res.json({ "message": "Something went wrong" });

  }
  return res.json({
    "messsage": "Vandor Information not found"
  })
}



export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
  const { foodTypes, name, address, phone } = <EditVandorInput>req.body;
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor('', user._id);

    if (existingVandor !== null) {
      // console.log(existingVandor);
      existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
      const saveResult = await existingVandor.save();
      return res.json(saveResult);
    }
    return res.json(existingVandor);

  }
  return res.json({
    "messsage": "Vandor Information not found"
  })
}