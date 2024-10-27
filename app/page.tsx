import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { IntroText } from "./(shared)/intro";

const info = [
  {
    header: "No money will be transferred.",
    description: "The amounts shown here are for test only, no charges will be made or goods fulfilled."
  }, {
    header: "All you need is a pasby eID and the pasby app.",
    description: "To experience the real experience of commerce flows you will need to use your eID and the pasby app."
  }, {
    header: "Your personal data is safe with us.",
    description: "We do not use anything from these commerce flows towards sales or marketing."
  }
]

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <Container className="space-y-4">
        <IntroText/>
        <ul className="list-disc pl-5 space-y-6 text-orange-800">
          {info.map((item, index) => (
            <li key={index} className="pl-2">
              <div className="text-black font-medium">{item.header}</div>
              <p className="text-gray-800">{item.description}</p>
            </li>
          ))}
        </ul>
        <div className="py-8"/>
        <Button href={'/products'}>
          <div className="text-lg">Ready, steady, go!</div>
        </Button>
      </Container>
    </div>
  );
}