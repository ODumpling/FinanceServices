import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon} from '@heroicons/react/solid'
import {classNames} from "./utils";

interface IProps {
    currentPage?: number;
    totalCount?: number;
    totalPages?: number;
    onPageChange: (page: number | string) => void
}

export default function Pagination({currentPage, totalCount, totalPages, onPageChange}: IProps) {

    function nextPage() {
        onPageChange(currentPage! + 1);
    }

    function previousPage() {
        onPageChange(currentPage! - 1);
    }

    function pages() {
        const delta = 2

        let range = []
        for (let i = Math.max(2, currentPage! - delta); i <= Math.min(totalPages! - 1, currentPage! + delta); i++) {
            range.push(i)
        }

        if (currentPage! - delta > 2) {
            range.unshift("..")
        }
        if (currentPage! + delta < totalPages! - 1) {
            range.push("...")
        }

        range.unshift(1)
        range.push(totalPages!)

        return range
    }
    return (
        <nav className="border-t border-gray-200 px-6 flex items-center justify-between sm:px-0 my-3">
            <div className="-mt-px w-0 flex-1 flex">
                <button
                    onClick={() => previousPage()}
                    disabled={currentPage === 1}
                    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                    <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {/* Current: "border-cyan-500 text-cyan-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}

                {pages().map((page) => (
                    <button
                        onClick={() => onPageChange(page)}
                        key={page}
                        className={classNames(currentPage === page ? "border-cyan-500 text-cyan-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300", "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium")}
                    >
                        {page}
                    </button>
                ))}

            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
                <button
                    onClick={() => nextPage()}
                    disabled={currentPage === totalPages}
                    className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                    Next
                    <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </button>
            </div>
        </nav>
    )
}
