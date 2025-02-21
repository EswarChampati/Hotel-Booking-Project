import { describe, expect, it, vi } from "vitest";
import User from "../../../models/User.model";
import { hash } from "bcryptjs";

vi.mock("mongoose", async () => {
  const actual = await vi.importActual<typeof import("mongoose")>("mongoose");
  return {
    ...actual,
    connect: vi.fn(),
    disconnect: vi.fn(),
  };
});

vi.mock("bcryptjs", () => ({
  hash: vi.fn((password: string) => `hashed-${password}`),
}));

describe("User model testing", () => {
  it("Should create the new user with validData", () => {
    const user = new User({
      email: "Eswar@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "12345678",
    });
    expect(user.email).toBe("Eswar@gmail.com");
    expect(user.firstName).toBe("Eswar");
    expect(user.lastName).toBe("Champati");
  });

  it("Should call the hash function before saving", async () => {
    const user = new User({
      email: "Eswar@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "12345678",
    });
    await user.save();
    expect(hash).toHaveBeenCalledWith("12345678", 8);
    expect(user.password).toBe("hashed-12345678");
  });
});
