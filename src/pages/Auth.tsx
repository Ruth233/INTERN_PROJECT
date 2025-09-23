import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../api";

const Auth = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/app/intern", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Invalid credentials or server unavailable");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{
        backgroundImage: "url(bg.webp)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="flex items-center justify-center min-h-screen "
      >
        <div className="p-15 border border-gray-300 bg-white w-[40%]  rounded-md shadow-md flex flex-col gap-6">
          <p className="text-center">Intern Management System</p>
          <p className="text-center font-bold text-lg">Sign In</p>
          <div>
            <label htmlFor="username">Username</label>
            <div className="border border-gray-300 rounded-md">
              <input
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ADMIN"
                id="username"
                type="text"
                className="bg-transparent outline-none px-3 py-2 w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="border border-gray-300 rounded-md flex justify-between items-center px-1">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type={viewPassword ? "text" : "password"}
                className="bg-transparent outline-none px-3 py-2 w-full"
                placeholder="*********"
              />
              <p onClick={() => setViewPassword((c) => !c)}>
                {viewPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-950 text-white px-2 py-3 rounded-md cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
