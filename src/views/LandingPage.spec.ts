import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import LandingPage from "./LandingPage.vue";
import { showsStore } from "@/stores/shows";

describe("Landing Page", () => {
  it("render when error from getAllShows()", () => {
    const wrapper = mount(LandingPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                showsInfo: {
                  shows: {},
                  genres: {},
                  error: "Api errored out",
                  showClicked: null,
                },
              },
            },
          }),
        ],
      },
    });
    const store = showsStore();
    expect(store.getAllShows).toHaveBeenCalledTimes(1);
    expect(
      wrapper.find('[data-testid="landingPage-error"]').exists()
    ).toBeTruthy();
    expect(
      wrapper.find('[data-testid="landingPage-loading"]').exists()
    ).toBeFalsy();
    expect(
      wrapper.find('[data-testid="landingPage-content"]').exists()
    ).toBeFalsy();
  });

  it("render loading when no error or shows to display", () => {
    const wrapper = mount(LandingPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                showsInfo: {
                  shows: {},
                  genres: {},
                  error: "",
                  showClicked: null,
                },
              },
            },
          }),
        ],
      },
    });
    const store = showsStore();
    expect(store.getAllShows).toHaveBeenCalledTimes(1);
    expect(
      wrapper.find('[data-testid="landingPage-error"]').exists()
    ).toBeFalsy();
    expect(
      wrapper.find('[data-testid="landingPage-loading"]').exists()
    ).toBeTruthy();
    expect(
      wrapper.find('[data-testid="landingPage-content"]').exists()
    ).toBeFalsy();
  });
});
