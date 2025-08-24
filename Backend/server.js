import { addUserToDatabase } from "./addUserToDatabase.js"


async function handler(request) {
    const url = new URL(request.url);

    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json");
    headersCors.set("Access-Control-Allow-Origin", "*");
    headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    headersCors.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCors
        });
    }

    if (url.pathname === "/login") {

        if (request.method === "POST") {

            const jsonFile = await Deno.readTextFile("./database.json");
            let userDatabase = await JSON.parse(jsonFile);

            const user = await request.json();

            if (user.username === "" || user.password === "") {
                return new Response(JSON.stringify({ message: "Missing username or password." }), {
                    status: 400,
                    headers: headersCors
                });
            }

            const existingUser = userDatabase.find(
                u => u.username === user.username && u.password === user.password
            );

            if (existingUser) {
                return new Response(JSON.stringify(existingUser), {
                    status: 200,
                    headers: headersCors
                });
            } else {
                return new Response(JSON.stringify({ message: "Incorrect username or password." }), {
                    status: 401,
                    headers: headersCors
                });
            }
        }
    }

    if (url.pathname === "/create") {

        if (request.method === "POST") {

            const jsonFile = await Deno.readTextFile("./database.json");
            let userDatabase = await JSON.parse(jsonFile);

            const newUser = await request.json();

            if (newUser.username === "" || newUser.password === "") {
                return new Response(JSON.stringify({ message: "Missing username or password." }), {
                    status: 400,
                    headers: headersCors
                });
            }

            const existingUser = userDatabase.find(
                u => u.username === newUser.username
            );

            if (existingUser) {
                return new Response(JSON.stringify({ message: "User already exists." }), {
                    status: 409,
                    headers: headersCors
                });
            } else {
                addUserToDatabase(newUser);
                return new Response(JSON.stringify({ message: "Account has been created." }), {
                    status: 200,
                    headers: headersCors
                });
            }
        }
    }

    // Om endpoint inte matchar något
    return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
        headers: headersCors
    });
}

Deno.serve(handler);