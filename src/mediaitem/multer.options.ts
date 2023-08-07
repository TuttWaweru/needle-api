import * as fs from 'fs';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

//TODO: UPDATE STORAGE AND FILTER CALLBACK FUNCTIONS
//TODO: UPDATE MEDIA TABLE SCHEMA TO PROVIDE SUPPORTED TYPES

export class FileUpload {
    // constructor () {}
    
    static randomNameGenerator (nameLength: number, randomizer: number) { return Array(nameLength).fill(null).map(() => Math.round(Math.random() * randomizer).toString(randomizer)).join('')}
    
    static directoryCreator (dir)  {
        if (process.env.NODE_ENV === 'production') {
            if (!fs.existsSync(join(__dirname, '..', '..', `assets/${dir}`))){
                fs.mkdirSync(join(__dirname, '..', '..', `assets/${dir}`));
                return { dir, status: "created" };
            } else { return { dir, status: "exists" }; }
        } else {
            if (!fs.existsSync(join(__dirname, '..', '..', '..', `assets/sanii/${dir}`))){
                fs.mkdirSync(join(__dirname, '..', '..', '..', `assets/sanii/${dir}`));
                return { dir, status: "created" };
            } else { return { dir, status: "exists" }; }
        }
    }

    static regexFileExtensionFilters () {
        return [
            { type: "image", regex: new RegExp("\.(jpg|jpeg|png|gif)$", "g") },
            { type: "video", regex: new RegExp("\.(mp4|mov|wmv|flv|avi|webm|mkv)$", "g") },
            { type: "audio", regex: new RegExp("\.(wav|m3u|mp3|aac|flac)$", "g") },
            { type: "document", regex: new RegExp("\.(doc|docx|html|htm|xls|xlsx|txt|ppt|pptx|csv|pdf)$", "g") },
        ]
    }

    static fileFilter (req, file, callback) {
        const selectedPattern = FileUpload.regexFileExtensionFilters().find(pattern => pattern.type == req.params.type)
        if (selectedPattern !== undefined) {
            if (!file.originalname.match(selectedPattern.regex)) {
                return callback(new Error(`Only ${selectedPattern.type} files are allowed!`), false);
            }
            callback(null, true);
        } else {
            callback(new Error('No media type found!'), false)
        }
    };

    static randomFileName (req, file, callback) {
        const fileExtName = extname(file.originalname);
        const randomName = FileUpload.randomNameGenerator(8, 16);
        callback(null, `${randomName}${fileExtName}`);
        //TODO: CHECK IF FILE NAME EXISTS
    };

    static fileDestination (req, file, callback) {
    
        const userDirectory = Buffer.from(req?.user?.email).toString("base64").replace(/[^a-zA-Z0-9]/g, "")
        const dir = `${userDirectory}/${req.params.type.split("|").reduce((result, val, i) => `${i == 0 ? val : result+"/"+val}`, "")}`
        // DYNAMICALLY CREATE FOLDERS RECURSIVELY ALLOWING NESTING OF FOLDERS
        dir.split("/").reduce((result, val, i) => [ ...result, FileUpload.directoryCreator(`${(i === 0) ? val : result[i-1].dir+"/"+val}`) ], [])
        if (process.env.NODE_ENV === 'production') {
            callback(null, join(__dirname, '..', '..', `assets/${dir}`))
        } else {
            callback(null, join(__dirname, '..', '..', '..', `assets/sanii/${dir}`));
        }
    };

    static UploadOptions () {
        return {
            storage: diskStorage({
                destination: FileUpload.fileDestination,
                filename: FileUpload.randomFileName
            }),
            fileFilter: FileUpload.fileFilter
        }
    }
}