import { Text } from "@/components/text";
import { Logo } from "@/components/Logo";

export function IntroText() {
  return (
    <>
      <Logo variant='original' className="w-20 h-20" />
      <h1 className={"text-3xl font-medium"}> Welcome to the Demostore</h1>
      <Text textSize="text-xl">
        Here you can test inevitable life commerce flows that you can complete with a pasby eID and the pasby app. We have curated an e-commerce store for demonstration purpose.
        <br /><br />Hope you enjoy the experience :)
      </Text>
    </>
  )
}