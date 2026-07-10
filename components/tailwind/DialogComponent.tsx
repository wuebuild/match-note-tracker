'use client'
import { Modal } from '@heroui/react'

export default function DialogComponent (props: DialogProps) {
    const { open, children, setOpenDialog, size = 'md', label = 'Dialog' } = props
    return (
        <Modal.Backdrop isOpen={open} onOpenChange={(isOpen) => { if (!isOpen) setOpenDialog() }}>
            <Modal.Container size={size} placement="auto">
                <Modal.Dialog aria-label={label}>
                    <Modal.CloseTrigger />
                    <Modal.Body className="pt-6">
                        {children && children}
                    </Modal.Body>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    )
}

interface DialogProps {
    open: boolean | false,
    children: any,
    setOpenDialog: any,
    size?: 'xs' | 'sm' | 'md' | 'lg',
    label?: string
}
