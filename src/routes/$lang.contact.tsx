import { createFileRoute } from "@tanstack/react-router";

import { CompanyDetails } from "@/components/contact/CompanyDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) =>
    pageHead("contact", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ContactForm />
      <CompanyDetails />
    </>
  );
}
