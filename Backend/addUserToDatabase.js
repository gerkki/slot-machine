export async function addUserToDatabase(user) {
    const filePath = "./database.json";
    const jsonFile = await Deno.readTextFile(filePath);
    const userDatabase = await JSON.parse(jsonFile);

    const newUser = {
        username: user.username,
        password: user.password,
        balance: 0,
    };
    userDatabase.push(newUser);
    await Deno.writeTextFile(filePath, JSON.stringify(userDatabase, null, 2));
}