const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
    try {
        await Promise.all(
        getJokes().map((joke) => {
            return db.joke.create({ data: joke });
        })
        );
        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await db.$disconnect();
    }
}

seed();

function getJokes() {
    return [
        {
        title: "Pencil",
        content: `Why did the pencil go to the dance? Because it had great lead moves!`,
        },
        {
        title: "Ghosts",
        content: `Why did the ghosts go to the party? They heard it was going to be boo-tiful!`,
        },
        {
        title: "Photographer",
        content: `Why was the photographer arrested? Because they framed the wrong person!`,
        },
        {
        title: "Ice Cream",
        content: `What's an ice cream's favorite place to go? Sundae school!`,
        },
        {
        title: "Pizza",
        content: `What do you call a sleeping pizza? A piZZZZZZa!`,
        },
        {
        title: "Shoes",
        content: `Why did the shoes go to the art exhibition? Because they wanted to see some soleful works!`,
        },
        {
        title: "Fish",
        content: `Why did the fish blush? Because it saw the ocean's bottom!`,
        },
        {
        title: "Clock",
        content: `Why was the clock always stressed? It was always under-ticking!`,
        },
        {
        title: "Musicians",
        content: `Why did the musicians bring a ladder to the concert? They wanted to reach new heights!`,
        },
        {
        title: "Snail",
        content: `What did the snail say when it hitched a ride on the turtle? "Wheeee!"`,
        },
    ];
}
