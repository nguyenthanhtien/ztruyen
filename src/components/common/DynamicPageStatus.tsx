import Link from 'next/link';
import Image from 'next/image';
// import { dynamicBlurDataUrl } from '@/components/utils/dynamicBlurDataUrl';
import axios from 'axios';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

const DynamicPageStatus = async ({
    category,
    pageQuery,
    title = false,
}: {
    category: string;
    pageQuery: number;
    title?: boolean;
}) => {
    let res;
    if (category == 'the-loai/tat-ca') {
        res = await axios.get(
            `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${pageQuery}`
        );
    } else {
        res = await axios.get(
            `https://otruyenapi.com/v1/api/${category}?page=${pageQuery}`
        );
    }

    const itemsPerPage = 24;

    const totalItems = res?.data?.data?.params?.pagination?.totalItems || 0;
    const dataGenre: IComic[] = res?.data?.data?.items;

    // const placeholders = await Promise.all(
    //     dataGenre.map((url) =>
    //         dynamicBlurDataUrl(
    //             `${res?.data?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${url.thumb_url}`
    //         )
    //     )
    // );

    return (
        <section className="wrapper pt-6">
            {title && (
                <h1>
                    <p className="capitalize text-xl mb-6">
                        {res?.data?.data?.titlePage}
                    </p>
                </h1>
            )}
            <div className="flex flex-wrap gap-4 mb-8">
                {dataGenre.map((item, index) => {
                    return (
                        <figure
                            key={index}
                            title={item.name}
                            className="flex flex-col w-[calc(100%/3-16px)] sm:w-[calc(100%/4-16px)] md:w-[calc(100%/5-16px)] lg:w-[calc(100%/6-16px)]"
                        >
                            <Link href={`/truyen-tranh/${item.slug}`}>
                                <Image
                                    src={`${res?.data?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`}
                                    width={180}
                                    height={240}
                                    alt={item.name}
                                    sizes="(max-width: 50px) 2vw, max-width: 1920px) 180px)"
                                    quality="60"
                                    priority={index <= 0 ? true : false}
                                    // placeholder="blur"
                                    // blurDataURL={placeholders[index]}
                                    className="aspect-[3/4] bg-secondary dark:bg-primary"
                                ></Image>
                            </Link>
                            <figcaption
                                className="mt-1.5 text-sm line-clamp-1"
                                title={item.name}
                            >
                                <h2>
                                    <Link href={`/truyen-tranh/${item.slug}`}>
                                        {item.name}
                                    </Link>
                                </h2>
                            </figcaption>
                        </figure>
                    );
                })}
                <PaginationWithLinks
                    page={pageQuery}
                    pageSize={itemsPerPage}
                    totalCount={totalItems}
                />
            </div>
        </section>
    );
};

export default DynamicPageStatus;
