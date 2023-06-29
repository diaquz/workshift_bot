const { Button, TextInput, TextArea } = require("components/Inputs");
const { useState } = require("react");


const FeedbackForm = ({user}) => {

    const [form, setForm] = useState({ title: "", message: "" });

    return (
        <>
        <div className="flex flex-col space-y-5">

            <TextInput name="title-input" label="Заголовок" value={form.title} onChange={(e) => setForm({...form, title: e})} />

            <TextArea label="Сообщение" value={form.message} onChange={(e) => setForm({...form, message: e})} />
         
            
            <div className="flex flex-row mx-10 my-10 justify-between">
                <Button label="Отмена" onClick={() => {}} />
                <Button label="Сохранить" onClick={() => {}} />
            </div>
        </div>
    </>
    );
};

export default FeedbackForm;
