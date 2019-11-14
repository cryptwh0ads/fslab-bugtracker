const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./bugtracker.json");

const { promisify } = require("util");

const addRowToSheet = async () => {
  const doc = new GoogleSpreadsheet(
    "1T-m0EQUv23WWcDcsF6eWOq8NVyhww-ZxTp16EiQ7KGg"
  );
  await promisify(doc.useServiceAccountAuth)(credentials);
  console.log("Spreadsheet opened");
  const info = await promisify(doc.getInfo)();
  const worksheet = info.worksheets[0];
  await promisify(worksheet.addRow)({
    name: "Vinicius",
    email: "test@test.com"
  });
};

addRowToSheet();
/*


doc.useServiceAccountAuth(credentials, err => {
  if (err) {
    console.log("Unable to open spreadsheet");
  } else {
    console.log("Spreadsheet opened");
    doc.getInfo((err, info) => {
      //   console.log(info);
      const worksheet = info.worksheets[0];
      worksheet.addRow({ name: "Vinicius", email: "test@test.com" }, err => {
        console.log("Row added");
      });
    });
  }
});
*/
