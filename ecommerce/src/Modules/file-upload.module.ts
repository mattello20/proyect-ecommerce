import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/Config/cloudinary';
import { FileUploadController } from 'src/Controllers/file-upload.controller';
import { Products } from 'src/Entities/products.entity';
import { FileUploadRepository } from 'src/Repositories/file-upload.repository';
import { FileUploadService } from 'src/Services/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadRepository, FileUploadService, CloudinaryConfig],
})
export class FileUploadModule {}
