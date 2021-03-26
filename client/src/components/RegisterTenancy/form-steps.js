import TenantContactDetails from "./tenant-contact-details";
import TenantPersonalDetails from "./tenant-personal-details";
import PropertyDetails from "./property-information";
import Completed from "./completed";

const FormSteps = (step, setStep, tenancy, setTenancy) => [
  {
    title: "Apartment Details",
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
    title: "Tenant contact information",
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
    title: "Tenant personal information",
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
