import { handleSubmit } from "./formHandler";

describe("formHandler tests.", () => {

  test("Check for preventDefault execution", () => {
    document.body.innerHTML = `
    <input required id="article-url" type="text" placeholder="https://..." />
    <p id="polarity"></p>
  `;

    delete window.fetch;
    window.fetch = jest.fn(() => Promise.resolve());
    const event = { preventDefault: jest.fn() };
    handleSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

});