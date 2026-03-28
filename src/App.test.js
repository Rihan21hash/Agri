import { render, screen } from "@testing-library/react";
import { AuthProvider } from "./context/AuthContext";

jest.mock("./firebase", () => ({
  auth: {},
  db: {},
  storage: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((_auth, callback) => {
    callback(null);
    return jest.fn();
  }),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(() => ({})),
  onSnapshot: jest.fn((_ref, onNext) => {
    onNext({ exists: () => false });
    return jest.fn();
  }),
  setDoc: jest.fn(() => Promise.resolve()),
  serverTimestamp: jest.fn(),
}));

test("sanity: render and cleanup", () => {
  const { unmount } = render(<div>hello</div>);
  expect(screen.getByText("hello")).toBeInTheDocument();
  unmount();
});

test("AuthProvider mounts and unmounts cleanly", () => {
  const { unmount } = render(
    <AuthProvider>
      <span>child</span>
    </AuthProvider>
  );
  expect(screen.getByText("child")).toBeInTheDocument();
  unmount();
});
