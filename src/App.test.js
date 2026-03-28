import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./hooks/useAuth";

jest.mock("./firebase", () => ({
  auth: {},
  db: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((_auth, callback) => {
    callback(null);
    return () => {};
  }),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn((_q, onNext) => {
    onNext({ docs: [] });
    return () => {};
  }),
  serverTimestamp: jest.fn(),
}));

jest.mock("./components/Timer", () => ({
  __esModule: true,
  default: function MockTimer() {
    return <span data-testid="timer-mock">—</span>;
  },
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

test("renders dashboard section headings", async () => {
  render(
    <AuthProvider>
      <DashboardPage />
    </AuthProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /login \/ signup/i })
    ).toBeInTheDocument();
  });
  expect(screen.getByRole("heading", { name: /farmer post/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /buyer flash feed/i })
  ).toBeInTheDocument();
});
