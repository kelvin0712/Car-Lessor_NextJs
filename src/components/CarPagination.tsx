import { PaginationRenderItemParams, Pagination, PaginationItem } from '@material-ui/lab';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { getAsString } from '../getAsString';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';

export function CarPagination({totalPages}: {totalPages: number}) {
    const {query} = useRouter();
    return (
        <Pagination
            page={parseInt(getAsString(query.page) || '1')}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                component={MaterialUiLink}
                query={query}
                item={item}
                {...item}
              />
            )}
          />
    )
}

interface MaterialUiLinkProps {
    item: PaginationRenderItemParams;
    query: ParsedUrlQuery;
  }


const  MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(
    ({ item, query, ...props }, ref) => {
    return (
      <Link
        href={{
          pathname: '/cars',
          query: { ...query, page: item.page },
        }} shallow
      >
        <a ref={ref} {...props}></a>
      </Link>
    )
  }
)