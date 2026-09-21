const SLIDES_EMBED =
  "https://docs.google.com/presentation/d/157czHV4F7kuI3VM4m20At5xhBXrGw7dO/embed?start=false&loop=false&delayms=3000";

function AisaGiss() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent px-4 pb-8 pt-28 text-[#D8DEDE] sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          AISA GISS 2026
        </h1>
        <div className="min-h-[28rem] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0C111C] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <iframe
            src={SLIDES_EMBED}
            title="AISA GISS 2026 — Sapex presentation"
            className="h-full min-h-[28rem] w-full"
            allow="fullscreen"
            allowFullScreen
            style={{ height: "calc(100svh - 12.5rem)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AisaGiss;
