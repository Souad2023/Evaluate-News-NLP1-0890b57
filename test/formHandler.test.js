import { isValidURL } from "../src/client/js/formHandler";

describe("Testing form submission", () => {
 
  beforeEach(() => {
    
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" name="url" placeholder="Enter URL" required>
        <button id="submitButton" type="submit">Submit</button>
      </form>
      <div id="results"></div>
    `;
  });

  test("should call handleSubmit on form submit", () => {
    const form = document.getElementById("urlForm");

    
    expect(form).not.toBeNull();

    
    const handleSubmit = jest.fn();

    form.addEventListener("submit", handleSubmit);

    
    form.dispatchEvent(new Event("submit"));

    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("should validate URL correctly", () => {
    const validURL = "https://api.meaningcloud.com/sentiment-2.1";
    expect(isValidURL(validURL)).toBe(true);
  });

  test("should return false for invalid URL", () => {
    const invalidURL = "htp://invalid-url";
    expect(isValidURL(invalidURL)).toBe(false);
  });
});
