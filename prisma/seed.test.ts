import { describe, expect, it } from "@jest/globals";

import { extractIdFromUserAgent, generateNeurotapIds } from "./seed.utils";
import path from "path";

require('dotenv').config({path: path.join(__dirname, '../.env')});

describe("generateNeurotapIds function", () => {
  it("should generate an array of 10 ids", () => {
    const ids = generateNeurotapIds();

    expect(ids).toBeInstanceOf(Array);
    expect(ids).toHaveLength(10);
  });

  it("each id should only contain alphanumeric characters", () => {
    const ids = generateNeurotapIds();

    ids.forEach((id) => {
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });
});

describe("Testing extractIdFromUserAgent function", () => {
  it("should extract numeric sequence from predefined string format", () => {
    const input = process.env.ALLOWED_USER_AGENT_ID!;
    const expectedOutput = process.env.EXAMPLE_ID!;
    expect(extractIdFromUserAgent(input)).toBe(expectedOutput);
  });

  it("should return null for non-matching string", () => {
    const input = "Different string";
    expect(extractIdFromUserAgent(input)).toBeNull();
  });

  it("should return null if no numeric sequence present", () => {
    const input = "NEUROTAP-v0.2-BEG!---!---";
    expect(extractIdFromUserAgent(input)).toBeNull();
  });

  it("should handle different numeric sequences correctly", () => {
    const tests = [
      { input: "NEUROTAP-v0.2-BEG!---XYZ123!---", output: "XYZ123" },
      { input: "NEUROTAP-v0.2-BEG!---A1!---", output: "A1" },
    ];

    tests.forEach((test) => {
      expect(extractIdFromUserAgent(test.input)).toBe(test.output);
    });
  });
});
