import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from './ui/pagination';
import { cleana } from "cleana"

type PaginationSSRProps = {
    itemsPerPage: number
    totalItems: number
    searchParams: any
}

const PaginationSSR = async ({ itemsPerPage, totalItems, searchParams }: PaginationSSRProps) => {
    const params: any = cleana(await searchParams)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    params.page = Number(params.page);

    const createPageLink = (page: number) => {
        const query = new URLSearchParams({ ...params, page: page.toString() }).toString();
        return `?${query}`;
    };

    const pagesToShow = [
        params.page - 1,
        params.page,
        params.page + 1
    ].filter(page => page > 0 && page <= totalPages);

    return (
        <Pagination style={{ direction: "rtl" }} className='dark:text-contentColor-dark mt-3'>
            <PaginationContent>
                {totalItems > itemsPerPage && <PaginationItem className='lg:flex hidden'>
                    <PaginationPrevious href={createPageLink(params.page > 1 ? params.page - 1 : 1)} />
                </PaginationItem>}
                {params.page > 2 && (
                    <PaginationItem className='flex flex-row items-center'>
                        <PaginationLink href={createPageLink(1)}>1</PaginationLink>
                        {params.page > 3 && <PaginationEllipsis />}
                    </PaginationItem>
                )}
                {pagesToShow.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href={createPageLink(page)}
                            className={`${params.page === page ? 'w-10 h-10 leading-10 md:w-[50px] md:h-[50px] md:leading-[50px] text-center bg-primaryColor text-whiteColor disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-primaryColor' : ''}`}
                            isActive={params.page === page}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {params.page < totalPages - 1 && (
                    <PaginationItem className='flex flex-row items-center'>
                        {params.page < totalPages - 2 && <PaginationEllipsis />}
                        <PaginationLink href={createPageLink(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                )}
                {totalItems > itemsPerPage && <PaginationItem className='lg:flex hidden'>
                    <PaginationNext href={createPageLink(params.page < totalPages ? params.page + 1 : totalPages)} />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSSR;
