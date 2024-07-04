import fs from 'fs/promises';

// some utils functions


// a function to read the files
async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        return data.toString();
    } catch (error) {
        console.log(`${filePath}: do not exist`);
        return undefined;
    }
}

async function readJSONFile(filePath) {
    return JSON.parse(await readFile(filePath));
}
// end of utils functions

async function main() {
    const data = (await readJSONFile('./config.json'));
    // this will ensure that empty config file
    if (!data || !data.files) {
        console.error('No files in config.json');
        return;
    }
    const files = data.files;
    /* I like this way of doing things as this will read all of the 3 files in the same time. but as shown in the output expected in the project description it should be file 1, then 2 then 3. But using this way it won't be guaranteed to do that.
    files.forEach(async (file) => {
      if(!text) continue;
      const text = await readFile(file);
      // this will ensure only english characters words and ' - are only counted, upon reading on the internet they do not consider words with special character as normal words words
      text.match( /\b[a-zA-Z'-]+\b/g);
      // if there is nothing found it will show 0
      console.log(`${file}: ${text ? text.length : 0}`);
    })
      */

    for (const file of files) {
        const text = await readFile(file);
        // this will ensure the files that do not exist.
        if (text === undefined) {
            return;
        }
        // this will ensure only english characters and ' - are only counted, upon reading on the internet they do not consider words with special character as normal words
        text.match(/\b[a-zA-Z'-]+\b/g);
        // if there is nothing found it will show 0
        console.log(`${file}: ${text ? text.length : 0}`);
    }
}

// runs the main method, which I encapsulated to not pollute the global scope
main()