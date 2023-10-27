import Form from '../forms/form'
const Message = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-[1rem]">
      <Form type="push" tab="notification" />
      <Form type="in-app" tab="notification" />
    </div>
  );
}

export default Message