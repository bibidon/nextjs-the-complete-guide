import fs from 'fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(id) {
    return db.prepare('SELECT * FROM meals WHERE uid =?').get(id);
}

export async function saveMeal(meal) {
    meal.uid = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.uid}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), error => {
        if (error) {
            throw new Error('Saving image failed.');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (uid, title, image, summary, instructions, creator, creator_email)
        VALUES (@uid,
                @title,
                @image,
                @summary,
                @instructions,
                @creator,
                @creator_email)
    `).run(meal);
}
