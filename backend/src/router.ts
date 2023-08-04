import { Express } from "express";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import AuthMiddleware from "./middleware/AuthMiddleware";
const routesPath = path.resolve(path.join(__dirname, "routes"));
const pathPrefix = "/api/v1";
async function populate(app: Express, prefix = "", data: any = []) {
    const currentPath = path.resolve(path.join(routesPath, prefix));
    const files = fs.readdirSync(currentPath);
    files.sort((a, b) => {
        const bStat = fs.statSync(path.join(currentPath, b));
        if (bStat.isDirectory()) return 1;
        if (a.startsWith("index")) return 1;
        return -1;
    })
    await Promise.all(files.map(async (file) => {
        const filePath = path.resolve(path.join(currentPath, file))
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) return populate(app, prefix + "/" + file + "/", data);
        if (!file.endsWith("router.ts") && !file.endsWith("router.js")) return false;
        try {
            const module = (await import(filePath));
            const options = module.options || {};
            //
            const router = module.default;
            const routePath = path.resolve(pathPrefix + "/" + (file.startsWith("index") ? prefix : prefix + (file.replace(".router.js", "").replace(".router.ts", ""))));
            // console.log(chalk.yellow(routePath), "-→", path.join(prefix, file))
            data.push({
                endpoint: chalk.yellow(routePath),
                handler: path.join(prefix, file)
            });
            //middlewares
            const middlewares = [];
            if (options.isSecure) {
                middlewares.push(AuthMiddleware({
                    role: options.role || "admin",
                    platform: options.platform || "web"
                }))
            }
            app.use(routePath, ...middlewares, router);
        } catch (err) {
            console.log(err);
        }

    }));
    return data;
}

export default populate;