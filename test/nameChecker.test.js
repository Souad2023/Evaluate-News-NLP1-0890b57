import { checkForName } from "../src/client/js/nameChecker";


global.alert = jest.fn(); 

describe("Testing name validation", () => {
  test("checkForName should show 'Welcome, Captain!' for valid names", () => {
    checkForName("Picard");
    expect(alert).toHaveBeenCalledWith("Welcome, Captain!"); 
  });

  test("checkForName should show 'Enter a valid captain name' for invalid names", () => {
    checkForName("InvalidName");
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  test("checkForName should show 'Enter a valid captain name' for empty names", () => {
    checkForName(""); 
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  test("checkForName should show 'Enter a valid captain name' for short names", () => {
    checkForName("Ar"); 
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  test("checkForName should show 'Enter a valid captain name' for long invalid names", () => {
    checkForName("Georgiou1234567890"); 
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });
});
