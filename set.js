const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
const path = require('path');

if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined 
    ? databasePath 
    : process.env.DATABASE_URL;


const config = {
    session: process.env.SESSION_ID || 'ALPHA;;;H4sIAAAAAAAAA61VWa+iSBj9K5N61bTsW3KThgIVEa8bbpN5KKFYlE0oEOz43yfovdM3mZ7uO0nzVBTwfeec+s7hG0izqMQWboHyDeRFVCOCuyVpcwwUoFW+jwvQBx4iCCigpzez7VEVQo8O1ZM8Mcdq7FemDDWKSUXnoG4DprndROdsv4B7H+TVMY7cnxQkLnt5PYm2v8FMYNQX1ZmqCwo7cC3gcmZcm5HpLAb8Eq3KF3DvKqKoiNLAyEOc4ALFFm7nKCo+CR/OdBy4thPtrZ4oDXsrK5Jl018J0TLeEyuDK4+B1SLYmp+Db9ZBUEzxaXFlj9gQppp2Q5x1m6dwmqrScjSBw5r00Ol4Np7wyyhIsWd6OCURaT+tO1aXxSYe7IY6kzT1iE0Ey+VX7Vi67ZxEctytR+AWX4Z75pO60808uKjhdm9UFPuqx3KtNRsv10aZZPtXS3dN5vQqrB2yun4EPi/eZ+X8f3R3p16QbZjDRQ9jYS7GmNEldePAMAyKxOYjeXs0D7Jd20b5OfjsWaO0y9h2wiDYu2s6ml6ug2NCmMHMyC56ML55a8usUdEG3+EjUhU/QznojTT6oF4v1SmUo4bRVtt8jUmdLps9nmejbc8fH6N8MiStuSJXZhOevHaL4iknIbocD5OipDVqI1Y935ycj+vJQT/qi5cHozNuTQ8o9L0PChxEJSkQibL0sceJfYC8eoXdApOHvEBWBXqzjSuEq/W0sjP+ELpt07MOt56pwUL1gsHNPNrxAC5eQB/kRebissTeOCpJVrQ2LksU4BIofz5OqiNd4CQjeBJ5QAEMy8kUK7AiS1Pc1/LLNUSkRHn+JcUE9IFfZImNgUKKCvfB8wua04YUz8oC1AR9KOpQgBRPs7yuSazE8h3H5Nl1HSW4JCjJgUKLnCjJvEyz9/5vAsINeUFmDCjRDGR5XuA5aBi6pOricCjwlPELIPxvA0JpUFU5XeCHAity4pCVZIlSZRHKkBVYWv85EJa//9UHKW7I01LdILB0H/hRURInrfI4Q967394fItfNqpSs2tSF3QIXQPmwjQmJ0qDsqFUpKtwwqjHseADFR3GJ/5k9XGDvnctbnsLM6yyxGR3YCZxvQYe9K/RvcZQfyBM/XqMFjqVFThY4SqBkQeG+dvt9kKKuFng9Zy3+Y5KVYYU6cd5gd108TFAUl0ABcMLSkSlBY4btSjJGI3URqDBQwXea705+OoWy7ElPoKyblI0EdpdpN9YObbqWJtbrzoj8gDngzYUbUGPu5QdFgAJGaLWazo/MiXOwPsT4MHcXTjZ2m+va95qpvDPofMKdN4tJ4qSO3Gzs2xb762LfMoK4zKjFfnFLRnLUO9ojqMmzS+t4uvrSdfNwHbn4Y7PkSub17pJubQ4Ryh4t5/n2jC3TGh6qXuDND6NFPt+9nnShFeLWPCS2Orv5WbGsD42Y7vn9IltOYC36zboK1uPT7KLK8PrMmEfGxW//lujN/dHj1o/wI6rfjuKXB/oE3s0dde9/qPEW/v8RoJoHT9CvCCwHllYRWlBd+WauZ8cBXJ3ixky5WbKLUTWXtR64dwbIY0T8rEiAAlDqFdljXoqs6gbZTP3sJ82gapraW7rGqCTqd3P8wG+U9HxrXmT5GJUhUECasNqxG/RWzfMVQeTdakDtrlc/Bfe/AdT9dsQgCQAA',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "JOSHUA",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "2349036373104",     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',    
    URL: process.env.URL || "",                         
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no',     
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Joshua',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',  
    ANTICALL_MSG: process.env.ANTICALL_MSG || 'call declined by Joshua',             
    GURL: process.env.GURL || "",
    EVENTS: process.env.EVENTS || "yes",    
    BOT: process.env.BOT_NAME || 'JOSHTEC',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    ADM: process.env.ANTI_DELETE_MESSAGE || 'no',
    
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? new Sequelize({
            dialect: 'sqlite',
            storage: DATABASE_URL,
            logging: false,
        })
        : new Sequelize(DATABASE_URL, {
            dialect: 'postgres',
            ssl: true,
            protocol: 'postgres',
            dialectOptions: {
                native: true,
                ssl: { 
                    require: true, 
                    rejectUnauthorized: false 
                },
            },
            logging: false,
        })
};


let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

module.exports = config;
