import {Fragment, ReactNode, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'


interface IProps {

    children?: ReactNode
}

export default function Slideover({children}: IProps) {
    const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0"/>

                    <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <form className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                                    <div className="flex-1 h-0 overflow-y-auto">
                                        <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-lg font-medium text-white">New
                                                    Project</Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <p className="text-sm text-indigo-300">
                                                    Get started by filling in the information below to create your new
                                                    project.
                                                </p>
                                            </div>
                                        </div>

                                        {children}

                                    </div>
                                    <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
