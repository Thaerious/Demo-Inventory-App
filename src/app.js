import Express from "express";
import FS from "fs";
import Path from "path";

const port = process.env.port || 8000;
const app = Express();

loadRoutes();

const server = app.listen(port, "0.0.0.0", ()=>{
    console.log(`Server started on port ${port}`);
});

process.on(`SIGINT`, stop);
process.on(`SIGTERM`, stop);

function stop(){
    server.close()
    process.exit();
}

async function loadRoutes(path = process.env.routes || "src/routes") {
    if (!FS.existsSync(path)) return;
    
    const contents = FS.readdirSync(path).sort();

    for (const entry of contents) {
        const fullpath = Path.join(process.cwd(), path, entry);
        const { default: route } = await import(fullpath);
        app.use(route);
    }        
}
