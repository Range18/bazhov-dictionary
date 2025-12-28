import path from "path";
import {existsSync, mkdirSync} from "fs";

export function ensureDir(dirPath: string): void {
    const abs = path.isAbsolute(dirPath) ? dirPath : path.resolve(process.cwd(), dirPath);

    if (!existsSync(abs)) {
        mkdirSync(abs, { recursive: true });
    }
}