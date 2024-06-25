import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function TransferPopOver({localTransferFun,guestAddress, setGuestAddress}:{localTransferFun: any, guestAddress: any, setGuestAddress:any}) {
  const [tobeChecked, setTobeChecked] = useState(false);
  const walletAddValidator= /^0x[A-Fa-f0-9]{40}$/;
  const walletValidatorResult = walletAddValidator.test(guestAddress);
  console.log(walletValidatorResult, "there");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full ml-4">Transfer Tokens</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Tokens</DialogTitle>
          <DialogDescription>
            Transfer the tokens to a different wallet address 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address
            </Label>
            <Input
              id="name"
              defaultValue=""
              className={`col-span-3 ${tobeChecked && (!walletValidatorResult)?"bg-rose-300 border-[red] text-red":""}`}
              placeholder="type the wallet address"
              
              onChange={(e)=>{
                setTobeChecked(false);
                setGuestAddress(e.target.value);
              }}
            />
            <span className="absolute bottom-[75px] right-[15px] text-sm text-[red]">{tobeChecked &&  (!walletValidatorResult) && "*please enter correct wallet address"}</span>
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>{
            setTobeChecked(true);
            if(walletValidatorResult===true){
              localTransferFun();
            }
          }}>Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
