import React, { useState } from "react";
import { supabase } from "../SupaBase.js";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        // emailRedirectTo: "any path u want",
      });
      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error("Error signing in:", signInError.message);
        return;
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className=" flex place-items-center px-4 py-2 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700 transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-3 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
      >
        {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
      </button>

    </div>
  );
}

export default Auth;


// import { useState } from "react";
// import { supabase } from "../SupaBase";

// function Auth() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const { email, password } = form;
//     const { error } = isSignUp
//       ? await supabase.auth.signUp({ email, password })
//       : await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       setError(error.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 rounded-lg shadow-md bg-white">
//       <h1 className="text-2xl font-semibold mb-4 text-center">
//         {isSignUp ? "Create an Account" : "Welcome Back"}
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           <span className="text-gray-700">Email</span>
//           <input
//             type="email"
//             name="email"
//             required
//             autoComplete="email"
//             value={form.email}
//             onChange={handleChange}
//             className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="block">
//           <span className="text-gray-700">Password</span>
//           <input
//             type="password"
//             name="password"
//             required
//             autoComplete={isSignUp ? "new-password" : "current-password"}
//             value={form.password}
//             onChange={handleChange}
//             className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         {error && (
//           <p className="text-red-600 text-sm font-medium">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {loading
//             ? isSignUp
//               ? "Creating Account..."
//               : "Signing In..."
//             : isSignUp
//             ? "Sign Up"
//             : "Sign In"}
//         </button>
//       </form>

//       <button
//         onClick={() => setIsSignUp((prev) => !prev)}
//         className="mt-4 w-full text-sm text-blue-600 hover:underline"
//       >
//         {isSignUp
//           ? "Already have an account? Sign In"
//           : "Don't have an account? Sign Up"}
//       </button>
//     </div>
//   );
// }

// export default Auth;
