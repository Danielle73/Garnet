import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomeScreen(){
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
      <div className="text-center space-y-6">
        
        <h1 className="text-4xl font-extrabold text-red-700">
          Welcome to Garnet
        </h1>

        <p className="text-gray-700 text-sm max-w-sm mx-auto">
          A simple and beautiful way to track your cycle.
        </p>

        <Button 
          className="mt-4 px-8 py-3 bg-pink-600 hover:bg-pink-700"
          onClick={() => navigate("/tracker")}
        >
          Get Started
        </Button>
      </div>
    </div>
    )
}

export default HomeScreen