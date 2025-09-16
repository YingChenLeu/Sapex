import { Earth } from "lucide-react";
import AISCT from "@/assets/aisctlogo.jpg"; 

const Community = () => {
  return (
    <div className="min-h-screen bg-[#0A0D17] text-[#D8DEDE] py-12 pt-[100px]">

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sapex Communities
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* School 1 */}
          <div className="bg-[#2D4F53]/50 border border-[#A8D3CC]/20 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <Earth className="w-12 h-12 text-[#A8D3CC] animate-pulse" />
              <h3 className="text-xl font-semibold text-[#D8DEDE]">
                Sapex Global
              </h3>
            </div>
          </div>

          {/* School 2 */}
          <div className="bg-[#2D4F53]/50 border border-[#A8D3CC]/20 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={AISCT}
                alt="AISCT Logo"
                className="w-12 h-12 text-[#A8D3CC] animate-pulse"
              />
              <h3 className="text-xl font-semibold text-[#D8DEDE]">
                American International School of Cape Town
              </h3>
            </div>
          </div>

          {/* School 3 */}
          <div className="bg-[#2D4F53]/50 border border-[#A8D3CC]/20 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <Earth className="w-8 h-8 text-[#A8D3CC] animate-pulse" />
              <h3 className="text-xl font-semibold text-[#D8DEDE]">
                SchoolName3
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
