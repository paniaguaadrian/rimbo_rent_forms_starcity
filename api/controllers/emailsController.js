import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
const rimboEmail = "info@rimbo.rent";
const starcityEmail = "spain@starcity.com";
// const rimboEmail = "victor@rimbo.rent";
// const starcityEmail = "victor@rimbo.rent";
// const rimboEmail = "paniaguasanchezadrian@gmail.com";
// const starcityEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! F1SC Form => E1R (email to Rimbo) E1SC (email to Starcity)
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

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
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

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmail",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `Nuevo miembro registrado por ${agencyName}`,
    text: "",
    attachments: [
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

  const StarcityEmail = {
    from: "Rimbo info@rimbo.rent",
    to: starcityEmail, // Starcity Email
    subject: "Registro de miembro correcto",
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E1SCEmail",
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

  transporterE1SC.sendMail(StarcityEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

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
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenants Email
    subject:
      "Bienvenido a la revolución de los depósitos - Welcome to the deposit revolution",
    text: "",
    attachments: [
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

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimbo = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmail",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E2REmail",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

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
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsName} Tarjeta registrada correctamente`,
    text: "",
    attachments: [
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
    to: tenantsEmail, // Tenant Email
    subject: "Bienvenido a Starcity & Rimbo",
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
      {
        filename: "Tenant_Guía_&_Reglas_generales_Starcity_ES.pdf",
        path: "./views/images/Tenant_Guía_&_Reglas_generales_Starcity_ES.pdf",
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
    to: starcityEmail, // StarCity Email
    subject: `${tenantsName} Tarjeta registrada correctamente`,
    text: "",
    attachments: [
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

  const transporterE1R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
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

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE1R.use("compile", hbs(optionsE1R));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `New Member Listing by ${agencyName}`,
    text: "",
    attachments: [
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

  const StarcityEmail = {
    from: "Rimbo info@rimbo.rent",
    to: starcityEmail, // Starcity Email
    subject: "Member successfully registered",
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E1SCEmailEn",
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

  transporterE1SC.sendMail(StarcityEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

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
    to: tenantsEmail, // Rimbo Email
    subject: "Welcome to the deposit revolution",
    text: "",
    attachments: [
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

  res.status(200).json();
};

// ! F2SC Form => E2R (email to Rimbo that informs tenant is on F2SC)
const sendNotificationRimboEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    randomID,
  } = req.body;

  const transporterE2R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2REmailEn",
    },
    viewPath: "views/",
  };

  transporterE2R.use("compile", hbs(optionsE2R));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: rimboEmail, // Rimbo Email
    subject: `${agencyName}-${tenantsName}-Registration Start`,
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
    ],
    template: "E2REmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      agencyName,
      randomID,
    },
  };

  transporterE2R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

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
    to: rimboEmail, // Rimbo Email
    subject: `${tenantsName} Card successfully registered`,
    text: "",
    attachments: [
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
    to: tenantsEmail, // Tenant Email
    subject: "Welcome to Starcity & Rimbo",
    text: "",
    attachments: [
      {
        filename: "starcity-logo.png",
        path: "./views/images/starcity-logo.png",
        cid: "starcitylogo",
      },
      {
        filename: "Tenant_General_Rules_&_Guidelines_Starcity_EN.pdf",
        path:
          "./views/images/Tenant_General_Rules_&_Guidelines_Starcity_EN.pdf",
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
    to: starcityEmail, // StarCity Email
    subject: `${tenantsName} Card successfully registered`,
    text: "",
    attachments: [
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
  sendNotificationRimbo,
  sendF2SCFormEmails,
  sendF1SCFormEmailsEn,
  sendE1REmailEmailsEn,
  sendNotificationRimboEn,
  sendF2SCFormEmailsEn,
};
