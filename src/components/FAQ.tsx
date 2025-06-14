
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who can use this platform?",
    a: "Anyone seeking care at a participating public hospital or clinic can register and use the portal.",
  },
  {
    q: "Is my information safe?",
    a: "Yes, all personal medical data is protected and only accessible by you and authorized health professionals.",
  },
  {
    q: "Can I access test results online?",
    a: "Yes, you can view lab results, prescriptions, and appointment history through your account.",
  },
  {
    q: "Is there a cost to use this portal?",
    a: "No, the portal is free for all patients accessing public healthcare services.",
  },
];

const FAQ = () => (
  <section className="py-14 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faqs.map((f, idx) => (
          <AccordionItem key={f.q} value={`item-${idx}`}>
            <AccordionTrigger className="text-lg font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
