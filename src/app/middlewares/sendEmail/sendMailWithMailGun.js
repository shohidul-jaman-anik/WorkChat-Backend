// const mailgun = require("mailgun.js");
// const DOMAIN = "sandbox09963a2277214188b8d129bbc5d10ecb.mailgun.org";
// const mg = mailgun({ apiKey: "<PRIVATE_API_KEY>", domain: DOMAIN });

// module.exports.sendMailWithMailGun = async (mailData) => {
//     const mail = {
//         from: "Mailgun Sandbox <postmaster@sandbox09963a2277214188b8d129bbc5d10ecb.mailgun.org>",
//         to: mailData.to,
//         subject: mailData.subject,
//         text: mailData.text
//     };

//     try {
//         const result = await mg.messages.create(DOMAIN, mail);
//         console.log(result);
//         return result; // Optionally, you can return the result
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };
