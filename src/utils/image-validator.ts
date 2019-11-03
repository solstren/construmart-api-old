import { BadRequestException } from "@nestjs/common";

export const imageFileValidator = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  };