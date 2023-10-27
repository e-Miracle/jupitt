import Form from "../forms/form";
const Policies = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-[1rem]">
      <Form type="push" tab="policies" />
      <Form type="in-app" tab="policies" />
    </div>
  );
}

export default Policies;