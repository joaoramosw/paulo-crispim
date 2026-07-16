import { HomeExperience } from "@/components/home/HomeExperience";
import { getPartnerLogos } from "@/lib/partners";

export default function Home() {
  const partnerLogos = getPartnerLogos();

  return <HomeExperience partnerLogos={partnerLogos} />;
}
