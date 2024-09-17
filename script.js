import path from "node:path";
import fs from "node:fs"
import { Transform } from 'node:stream';
import { log } from "node:console";
const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "data.txt");
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

//#region task 1

readStream.on('data', (chunk) => {
    const chars = chunk.split('');
    chars.forEach((char, index) => {
        setTimeout(() => {
            process.stdout.write(char);
        }, index * 100)
    });
});

//#endregion


//#region task 2

readStream
    .pipe(new Transform({
        transform(chunk) {
            this.push(chunk.toString().toUpperCase());
        }
    }))
    .on('data', (chunk) => {
        log(chunk.toString());
    })

//#endregion