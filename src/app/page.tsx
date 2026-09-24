import Hero from '@/components/Hero';
import RsvpForm from '@/components/RsvpForm';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <AudioPlayer />
      <Hero />
      <RsvpForm />
    </main>
  );
}