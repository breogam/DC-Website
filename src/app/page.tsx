import { defaultLandingPageConfig } from "@/lib/default-content";
import LandingPagePreview from "@/components/landing/LandingPagePreview";

export default function Home() {
  return <LandingPagePreview config={defaultLandingPageConfig} />;
}
