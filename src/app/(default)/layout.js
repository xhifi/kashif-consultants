import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import services from "../../../data/services.js";
import settings from "../../../data/site-settings.js";

export default function DefaultLayout({ children }) {
  return (
    <>
      <SiteHeader settings={settings} services={services} />
      {children}
      <SiteFooter settings={settings} services={services} />
    </>
  );
}
