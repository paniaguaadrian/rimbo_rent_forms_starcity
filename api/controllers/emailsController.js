import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
// const rimboEmail = "info@rimbo.rent";
const testEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! RJ1 Form => RJ3, RJ4, RJD Emails.
const sendRJ1FormEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    rentAmount,
    product,
    rentDuration,
    randomID,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterRJ3 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj3Email",
    },
    viewPath: "views/",
  };

  transporterRJ3.use("compile", hbs(optionsRJ3));

  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM/Agency email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rj3Email",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
    },
  };

  transporterRJ3.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  // * START =======> RJ4 Email  @Tenant
  const transporterRJ4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4Email",
    },
    viewPath: "views/",
  };

  transporterRJ4.use("compile", hbs(optionsRJ4));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant's email
    subject: "¡Te damos la bienvenida!",
    // text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rj4Email",
    context: {
      tenantsName,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
      randomID,
    },
  };

  transporterRJ4.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ4 Email  @Tenant

  // * START =======> RJD Email  @Rimbo
  const transporterRJD = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJD = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjdEmail",
    },
    viewPath: "views/",
  };

  transporterRJD.use("compile", hbs(optionsRJD));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `Nuevo inquilino registrado por ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rjdEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJD.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJD Email  @Rimbo

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! RJ1 Form => RJ3, RJ4, RJD Emails
const sendRJ1FormEmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    rentAmount,
    product,
    rentDuration,
    randomID,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterRJ3 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj3EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ3.use("compile", hbs(optionsRJ3));

  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM/Agency email
    subject: "Tenant registered correctly",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rj3EmailEn",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
    },
  };

  transporterRJ3.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  // * START =======> RJ4 Email  @Tenant
  const transporterRJ4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ4.use("compile", hbs(optionsRJ4));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant's email
    subject: "Warm welcome!",
    // text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rj4EmailEn",
    context: {
      tenantsName,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
      randomID,
    },
  };

  transporterRJ4.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ4 Email  @Tenant

  // * START =======> RJD Email  @Rimbo
  const transporterRJD = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJD = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjdEmailEn",
    },
    viewPath: "views/",
  };

  transporterRJD.use("compile", hbs(optionsRJD));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `New tenant added by ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rjdEmailEn",
    context: {
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJD.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJD Email  @Rimbo

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export { sendRJ1FormEmails, sendRJ1FormEmailsEn };
