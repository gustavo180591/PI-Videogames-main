import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    phone: "",
  });
  // recibe el evento
  // el que sabe donde se hace el click es el event
  const changeHandler = (event) => {
    // leer lo que escribí y guardar en el estado que corresponda.
    //console.log("quiero hacer un cambio");
    //event.target es quien disparó el evento... y.name es el identificador de los input.
    const property = event.target.name;
    const value = event.target.value;

    // para poder modificar el estado
    // se utiliza setForm
    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    // en las lin
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      //console.log(`El email ${form.email} está bien`);
      setErrors({ ...errors, email: "El email está correcto." });
    } else {
      //console.log(`El email ${form.email} está mal`);
      setErrors({ ...errors, email: "Hay un error en email." });
    }
    if (form.email === "") setErrors({ ...errors, email: "Email vacío." });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // hacemos un post, le pasamos al bodu form, hacemos la promesa axios.post("http://localhost:3001/users", form)
    // then y catch son manejadores de promesas.
    axios.post("http://localhost:3001/users", form)
    .then(res=> alert(res))
    .catch(err=> alert(err));
    /* console.log(form);
    alert("apretado el botón"); */
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Email: </label>
        <input
          type="text"
          value={form.email}
          onChange={changeHandler}
          name="email"
        />
        <span>{errors.email}</span>
      </div>

      <div>
        <label>Name: </label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        />
      </div>

      <div>
        <label>Phone: </label>
        <input
          type="text"
          value={form.phone}
          onChange={changeHandler}
          name="phone"
        />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default Form;
