import { describe, it, expect } from "vitest";
import { generateTeamKey } from "../api-helper";

describe("generateTeamKey", () => {
  it("should generate a team key with the correct format", () => {
    const programSlug = "testProgram";
    const teamKey = generateTeamKey(programSlug);
    const regex = new RegExp(`^${programSlug}-[0-9A-Za-z]{4}$`);
    expect(teamKey).toMatch(regex);
  });

  it("should generate unique team keys for the same program slug", () => {
    const programSlug = "testProgram";
    const teamKey1 = generateTeamKey(programSlug);
    const teamKey2 = generateTeamKey(programSlug);
    expect(teamKey1).not.toBe(teamKey2);
  });

  it("should generate team keys of length programSlug.length + 5", () => {
    const programSlug = "testProgram";
    const teamKey = generateTeamKey(programSlug);
    expect(teamKey.length).toBe(programSlug.length + 5);
  });
});
