import Hero from "@/components/hero"
import SearchForm from "@/components/search-form"
import LuxuryCollection from "@/components/luxury-collection"
import WhyChooseUs from "@/components/why-choose-us"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SearchForm />
      <LuxuryCollection />
      <WhyChooseUs />
      <Footer />
      <FloatingActions />
    </main>
  )
}
