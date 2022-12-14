import React, { useState } from "react";
import { validateEmail } from "../../utils/helpers";

function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { name, email, message } = formState;

  // HANDLES FORM SUBMIT BUTTON
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
  }

  // HANDLES CHANGES IN THE FORM INPUTS
  function handleChange(e) {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      console.log(isValid);
      // isValid conditional statement
      if (!isValid) {
        setErrorMessage("Your email is invalid.");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    // console.log("errorMessage", errorMessage);

    /* "[e.target.name]" is used to make the property name dynamic. The property name will 
    be determined based on which form element the user types in allowing us to have only 1 
    function vs 3 (1 for each form element) ⬇︎ */
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }
  // console.log(formState);

  // JSX
  return (
    <section>
      <h1 data-testid="h1-contact">Contact me</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        {/* NAME INPUT  */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            onBlur={handleChange}
          />
        </div>
        {/* EMAIL INPUT  */}
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            defaultValue={email}
            onBlur={handleChange}
          />
        </div>
        {/* MESSAGE TEXT AREA */}
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            rows="5"
            defaultValue={message}
            onBlur={handleChange}
          />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button data-testid="submitBtn" type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ContactForm;
