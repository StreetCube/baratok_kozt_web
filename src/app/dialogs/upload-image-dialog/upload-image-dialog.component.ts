// upload-image-dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface IFile {
    IMAGE_PATH;
}
@Component({
    selector: 'app-upload-image-dialog',
    templateUrl: './upload-image-dialog.component.html',
})
export class UploadImageDialogComponent {
    selectedFile: File; // Add this line

    form: FormGroup;

    isLoading = false;

    constructor(
        public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    ) {
        this.form = new FormGroup({
            image: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
        });
    }

    onFileSelected(event): void {
        this.selectedFile = event.target.files[0]; // Modify this line
    }

    onUpload(): void { }
//         if (this.selectedFile) {
//             this.isLoading = true;
//             const storage = getStorage();
//             const storageRef = ref(storage, 'images/' + this.selectedFile.name);
    
//             const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);
    
//             uploadTask.on('state_changed', 
//                 (snapshot) => {
//                     // Observe state change events such as progress, pause, and resume
//                     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log('Upload is ' + progress + '% done');
//                 }, 
//                 (error) => {
//                     // Handle unsuccessful uploads
//                     console.log(error);
//                     this.isLoading = false;
//                 }, 
//                 () => {
//                     // Handle successful uploads on complete
//                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                         console.log('File available at', downloadURL);
//                         this.isLoading = false;
//                     });
//                 }
//             );
//         }
//         // if (this.selectedFile) {
//         //     this.isLoading = true;
//         //     const formData = new FormData();
//         //     formData.append('file', this.selectedFile, this.selectedFile.name);

//         //     this.cudService.uploadFile(formData).subscribe((res: IFile) => {
//                 this.isLoading = false;
//                 this.dialogRef.close();
//         //     });
//         // }
//     }
}
