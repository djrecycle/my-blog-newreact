import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationHome({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const handlePageClick = (page) => {
        onPageChange(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => handlePageClick(currentPage - 1)}
                        />
                    </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => handlePageClick(currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
