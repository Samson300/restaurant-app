const db = require('./conn')

async function getUserById(theId) {
    return await db.any(`SELECT * from users where id=${theId}`)
}

async function main() {
    const user3 = await getUserById(3);
    console.log(user3);
}

main();