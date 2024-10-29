import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { IntroText } from "../(shared)/intro";
import { Link } from "@/components/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconSymbol } from "@/components/Logo";

const options = [
  {
    header: "Checkout",
    href: "/shop/t-shirt",
    out: true,
    description: "A smooth checkout process with less typing and more sales. No prior authentication required."
  }, {
    header: "Login",
    href: "/shop",
    out: true,
    description: "Straight forward authentication - simple and secure"
  }, {
    header: "3D secure card authentication",
    out: true,
    href: "/shop/cart-checkout",
    description: "Streamline the card transaction flows while meeting strong PSD2 compliancy."
  },
]

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <Container className="space-y-4">
        <IntroText />
        {options.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </Container>
    </div>
  );
}

type Prop = {
  header: string;
  out: boolean;
  description: string;
  href: string;
}

function Card({item}: { item: Prop}) {
  return (
    <div className="w-full bg-gray-900 rounded-lg p-10 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{item.header}</h3>
        <p className="text-white mb-4 font-light text-lg">{item.description}</p>
        {item.out && (<Link href={item.href}>
          <button className={`text-white font-semibold py-3 px-6 rounded-sm ${item.out ? 'hover:bg-[#DD3E3E]' : ''} transition-colors duration-300 ease-in-out flex items-center ring-1 ring-white`} disabled={!item.out}>
            Get started
            <ArrowRightIcon className={`ml-2 w-5 h-5 transition-transform duration-300 ease-in-out ${item.out ? 'group-hover:translate-x-1' : ''}`} />
          </button>
        </Link>)}
        
      </div>
      <div className="pl-4">
        <IconSymbol className="w-16 h-16" color="#fff"/>
      </div>
    </div>
  );
}