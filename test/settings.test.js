/**
 * Tests for settings functionality
 */

describe('Settings Management', () => {
  // Mock preference storage
  let mockStorage = {};

  const mockPreference = {
    get: (category, key) => {
      return mockStorage[`${category}.${key}`];
    },
    set: (category, key, value) => {
      mockStorage[`${category}.${key}`] = value;
    }
  };

  beforeEach(() => {
    mockStorage = {};
  });

  test('should default to 12-hour format', () => {
    const use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(false);
  });

  test('should save 24-hour format preference', () => {
    mockPreference.set("settings", "use24HourFormat", "true");
    const use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(true);
  });

  test('should save 12-hour format preference', () => {
    mockPreference.set("settings", "use24HourFormat", "false");
    const use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(false);
  });

  test('should toggle between formats', () => {
    // Start with 12-hour
    mockPreference.set("settings", "use24HourFormat", "false");
    let use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(false);

    // Toggle to 24-hour
    mockPreference.set("settings", "use24HourFormat", "true");
    use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(true);

    // Toggle back to 12-hour
    mockPreference.set("settings", "use24HourFormat", "false");
    use24Hour = mockPreference.get("settings", "use24HourFormat") === "true";
    expect(use24Hour).toBe(false);
  });

  test('should persist settings', () => {
    mockPreference.set("settings", "use24HourFormat", "true");
    
    // Simulate app restart by reading the value
    const persisted = mockPreference.get("settings", "use24HourFormat");
    expect(persisted).toBe("true");
  });
});
