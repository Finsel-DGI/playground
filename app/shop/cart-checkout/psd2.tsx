import { Alert, AlertActions } from "@/components/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { delay, parseInterface } from "@rebatlabs/ui-funs";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { Subheading } from "@/components/heading";
import dayjs from "dayjs";
import { PasbyButton } from "@/components/branding/button";
import { requestToNextSever } from "@/actions/client";
import { PollEIDComponent } from "@finsel-dgi/pasby-react";

export function PSDDialog({ onPaymentCompleted }: {
  onPaymentCompleted: (paid: boolean) => void;
}) {
  let [initialise, setInitialise] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  let [error, setError] = useState<undefined | string>();
  let [identifier, setIdentifier] = useState<undefined | string>();
  const [lock, setLock] = useState<boolean>(false);


  const onOpen = async () => {
    setInitialise(true);
    setIsOpen(true);
    await delay(1200);
    setInitialise(false);
  }

  return (
    <>
      <button type="button" className="rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50" onClick={onOpen}>
        Pay now
      </button>
      <Alert open={isOpen} onClose={setIsOpen} size="sm">
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </AlertActions>
        {!identifier && (
          <>
            {initialise && (<div className="h-96 flex flex-col gap-4 justify-center items-center px-12">
              <Image alt="" src={"/icons/visa.svg"} className={""} width={90} height={90} />
              <Skeleton className="h-2 w-[40%]" />
            </div>)}
            {!initialise && (
              <>
                <Header />
                <Body
                  onConfirmAction={(value) => {
                    setIdentifier(value);
                  }}
                  onError={(e) => {
                    setError(e);
                  }}
                />
                {error && <p className="text-sm text-red-800">{error}</p>}
              </>
            )}
          </>
        )}
        {identifier && (
          <>
            <PollEIDComponent
              lock={lock}
              identifier={identifier}
              pathToPollSever="/api/ping-eid"
              onSuccessful={async () => {
                setLock(true);
                setIsOpen(false);
                onPaymentCompleted(true);
              }}
              onCancelled={() => {
                setLock(true);
                setIdentifier(undefined);
                setIsOpen(false);
              }}
            />
          </>
        )}
      </Alert>
    </>
  );
}

function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <div className={"text-lg font-bold text-white px-4 py-2 bg-gray-800"}>Incar</div>
        <div className={"text-lg font-light text-gray-800 px-2 py-2 ring-black ring-1"}>Bank</div>
      </div>
      <div className="flex items-center gap-1">
        <Image alt="" src={"/icons/visa.svg"} className={""} width={20} height={20} />
        <div className="font-extralight border-l pl-2 text-[.8rem]">ID Check</div>
      </div>
    </div>
  )
}

function Body({ onConfirmAction, onError }: {
  onConfirmAction: (identifier: string) => void;
  onError: (error: string) => void;
}) {
  const date = dayjs(Date.now()).format('D.M.YYYY, H:M');
  const onConfirm = async () => {
    try {
      const res = await requestToNextSever("/confirm-with-pasby", {
        amount: "NGN 18,200",
        card: "424242******4242",
        date: date
      });
      const data = parseInterface(res) as { identifier: string };
      onConfirmAction(data.identifier);
    } catch (error) {
      onError((error as Error).message);
    }
  }

  return (
    <div className="space-y-4 mt-6">
      <Subheading>Approve your payment</Subheading>
      <div className="text-[.9rem] font-light">
        <p>Demobutik</p>
        <p>NGN 18,200</p>
        <p> {date}</p>
        <p>424242******4242</p>
      </div>
      <p className="text-sm font-light">Select &quot;Confirm with pasby&quot; to proceed to payment</p>

      <PasbyButton type='confirm' style="dark" onClick={onConfirm} />
    </div>
  )
}