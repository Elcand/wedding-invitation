import AudioPlayer from "@/components/AudioPlayer";
import BrideGroom from "@/components/BrideGroom";
import Closing from "@/components/Closing";
import EventDetail from "@/components/EventDetail";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import RsvpForm from "@/components/RsvpForm";
import Story from "@/components/Story";
import Wishes from "@/components/Wishes";

export default function Home() {
  return (
    <main className="relative z-10 overflow-hidden bg-transparent text-[#f5f2eb]">
      <AudioPlayer />
      <Hero />
      <BrideGroom />
      <EventDetail />
      <Story />
      <Gallery />
      <RsvpForm />
      <Wishes />
      <Closing />
    </main>
  );
}
