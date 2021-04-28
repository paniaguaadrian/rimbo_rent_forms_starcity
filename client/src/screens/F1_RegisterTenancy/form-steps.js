import TenantContactDetails from "./tenant-contact-details";
import TenantPersonalDetails from "./tenant-personal-details";
import PropertyDetails from "./property-information";
import Completed from "./completed";

const FormSteps = (step, setStep, tenancy, setTenancy) => [
  {
    title: "Apartment Details",
    titleEs: "Detalles de la propiedad",
    content: (
      <PropertyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Member's contact information",
    titleEs: "Información de contacto del residente",
    content: (
      <TenantContactDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Member's personal information",
    titleEs: "Información personal del residente",
    content: (
      <TenantPersonalDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Listing Complete",
    content: <Completed tenancy={tenancy} />,
  },
];

export default FormSteps;
