import * as Dialogue from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

interface ModalProps {
    isOpen: boolean,
    onChange: (open: boolean) => void,
    title: string,
    children: React.ReactNode
}

const Modal = ({ isOpen, onChange, title, children }: ModalProps) => {
    return (
        <Dialogue.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialogue.Portal>
                <Dialogue.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
                <Dialogue.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[95vh] w-full md:w-[90vw] md:max-w-[450px] focus:outline-none p-[15px] pb-[0px]  bg-neutral-800 rounded-md -translate-x-1/2 -translate-y-1/2">
                    <Dialogue.Title className="text-xl text-center font-bold mb-4">{title}</Dialogue.Title>
                    <div>
                        {children}
                    </div>
                    <Dialogue.Close asChild>
                        <button className="text-neutral-500 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
                            <IoMdClose />
                        </button>
                    </Dialogue.Close>
                </Dialogue.Content>
            </Dialogue.Portal>
        </Dialogue.Root>
    )
}

export default Modal
