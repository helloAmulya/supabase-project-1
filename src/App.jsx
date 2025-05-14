import { useState, useEffect } from "react";
import { supabase } from "./SupaBase";
import TaskM from "./components/TaskM";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  // first of all we will check if any session in present or not

  async function fetchSession() {
    const { data, error } = await supabase.auth.getSession();
    setSession(data.session);

    if (error) {
      console.log("Error retrieving session :: ", error.message);
    }
  }

  useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }
  

  return (
    <div className="bg-[#242424] min-h-screen flex flex-col text-white justify-center items-center font-[sans-serif]">
      {session ? (
        <>
          <TaskM session={session} />
          <button onClick={handleLogout} >Logout</button>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
