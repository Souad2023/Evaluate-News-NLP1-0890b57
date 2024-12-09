import { isValidURL } from "../src/client/js/formHandler";

describe("Testing form submission", () => {
  // محاكاة DOM وإنشاء العنصر قبل كل اختبار
  beforeEach(() => {
    // إنشاء عنصر form وهمي في البيئة
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

    // التأكد من أن العنصر موجود
    expect(form).not.toBeNull();

    // هنا نقوم بإنشاء دالة مقلدة (mock function) للتأكد من أنه تم استدعاؤها
    const handleSubmit = jest.fn();

    // إضافة مستمع الحدث "submit" إلى النموذج
    form.addEventListener("submit", handleSubmit);

    // محاكاة تقديم النموذج
    form.dispatchEvent(new Event("submit"));

    // التأكد من أن الدالة قد تم استدعاؤها مرة واحدة
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
