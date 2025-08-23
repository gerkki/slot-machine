async function handler(request) {

    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json")
    headersCors.set("Access-Control-Allow-Origin", "*");
    headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    headersCors.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCors
        });
    }

    const url = new URL(request.url);
}

Deno.serve(handler);