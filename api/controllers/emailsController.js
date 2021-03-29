import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
// const rimboEmail = "info@rimbo.rent";
const testEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1SC Form => E1R
const sendF1SCFormEmails = async (req, res) => {
  const {
    agencyName,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    room,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmail",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E1REmail",
    context: {
      agencyName,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      room,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! F1SC Form => E1R
const sendF1SCFormEmailsEn = async (req, res) => {
  const {
    agencyName,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    acceptanceCriteria,
    rentStartDate,
    rentEndDate,
    tenancyID,
    building,
    room,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE1R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1REmailEn",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo Email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E1REmailEn",
    context: {
      agencyName,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      acceptanceCriteria,
      rentStartDate,
      rentEndDate,
      tenancyID,
      building,
      room,
    },
  };

  transporterE1R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export { sendF1SCFormEmails, sendF1SCFormEmailsEn };
