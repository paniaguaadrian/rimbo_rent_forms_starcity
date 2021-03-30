import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
// const rimboEmail = "info@rimbo.rent";
const testEmail = "victor@rimbo.rent";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1SC Form => E1R (email to Rimbo)
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

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    randomID,
    agencyName,
    building,
    room,
    tenancyID,
    rentStartDate,
    rentEndDate,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterE2TT = nodemailer.createTransport(
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
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
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
    template: "E2TTEmail",
    context: {
      tenantsName,
      tenantsEmail,
      randomID,
      agencyName,
      building,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, StarCity)
const sendF2SCFormEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    agencyName,
    building,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmail",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmail",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmail",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
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
    template: "E3REmail",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant Email
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
    template: "E3TTEmail",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };
  // Starcity Email
  const SCEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // StarCity Email
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
    template: "E3SCEmail",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

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

// ! E1R Email => E2TT (email to Tenant)
const sendE1REmailEmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    randomID,
    agencyName,
    building,
    room,
    tenancyID,
    rentStartDate,
    rentEndDate,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmailEn",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
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
    template: "E2TTEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      randomID,
      agencyName,
      building,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  res.status(200).json();
};

// ! F2SC Form => E3 (Rimbo, tenant, StarCity)
const sendF2SCFormEmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    agencyName,
    building,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  let optionsE3R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3REmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE3R.use("compile", hbs(optionsE3R));
  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Rimbo Email
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
    template: "E3REmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };
  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant Email
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
    template: "E3TTEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };
  // Starcity Email
  const SCEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // StarCity Email
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
    template: "E3SCEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      building,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(SCEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendF1SCFormEmails,
  sendE1REmailEmails,
  sendF2SCFormEmails,
  sendF1SCFormEmailsEn,
  sendE1REmailEmailsEn,
  sendF2SCFormEmailsEn,
};
