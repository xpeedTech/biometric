import chalk from "chalk";
import moment from "moment";
const consola = {...console};
export const _console = {...console};
console.log = (...args) => consola.log(`[${moment().format("YYYY-MM-DD HH:MM:ss")}]`,chalk.green("[ LOG ]"),...args);
console.info = (...args) => consola.info(`[${moment().format("YYYY-MM-DD HH:MM:ss")}]`,chalk.blue("[INFO ]"),...args);
console.warn = (...args) => consola.warn(`[${moment().format("YYYY-MM-DD HH:MM:ss")}]`,chalk.yellow("[WARN ]"),...args);
console.error = (...args) => consola.error(`[${moment().format("YYYY-MM-DD HH:MM:ss")}]`,chalk.red("[ERROR]"),...args);
console.debug = (...args) => consola.debug(`[${moment().format("YYYY-MM-DD HH:MM:ss")}]`,chalk.yellow("[DEBUG]"), ...args);


export default {};