describe("Message Bot Client", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("throws error if url is not provided", () => {
    process.env.REACT_APP_ENDPOINT_BASE_URL = "";

    expect(() => {
      require("./message-bot");
    }).toThrowError("missing parameter for setting socket client.");
  });

  it("throws error if token is not provided", () => {
    process.env.REACT_APP_ENDPOINT_URL_TOKEN = "";

    expect(() => {
      require("./message-bot");
    }).toThrowError("missing parameter for setting socket client.");
  });
});

// workaround for isolatedModule in tsconfig.json
export {};
