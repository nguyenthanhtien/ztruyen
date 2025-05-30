import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const keyword = (await searchParams).keyword || '';
    return {
        title: `${keyword} - Kết quả tìm kiếm | Manga Việt`,
        description: `Tìm truyện tranh - Tất cả truyện đều có thể tìm thấy tại Manga Việt`,
        keywords: [
            `tìm truyện tranh`,
            `tìm truyện tiếng việt`,
            `đọc truyện tranh`,
            `tìm ${keyword} với google.com`,
            `kết quả tìm kiếm ${keyword} từ google.com`,
        ],
        alternates: {
            canonical: `/tim-kiem?keyword=${keyword}`,
            languages: {
                vi: `/vi/tim-kiem?keyword=${keyword}`,
            },
        },
        openGraph: {
            title: `${keyword} - Kết quả tìm kiếm | Manga Việt`,
            description: `Tìm truyện tranh - Tất cả truyện đều có thể tìm thấy tại Manga Việt`,
            images: [
                {
                    url: '/logo-all.png',
                    width: 400,
                    height: 200,
                },
            ],
        },
    };
}
const SearchPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const keyword = (await searchParams).keyword || '';
    const pageQuery =
        parseInt(((await searchParams).page as string) || '1') || 1;
    const res = await axios.get(
        `https://otruyenapi.com/v1/api/tim-kiem?keyword=${keyword}&page=${pageQuery}`
    );
    const data: IComic[] = res?.data?.data?.items;
    const itemsPerPage = 24;
    const totalItems = res?.data?.data?.params?.pagination?.totalItems || 0;
    return (
        <section className="wrapper">
            <div className="flex gap-[5px] text-sm py-8">
                <span className="text-[#32aaff]">{`"${keyword}"`}</span>
                <span>Kết quả tìm kiếm</span>
            </div>
            <div className="flex flex-wrap gap-4">
                {data.map((item, index) => {
                    return (
                        <figure
                            key={index}
                            className="flex gap-4 lg:w-[calc(100%/3-16px)]"
                        >
                            <Link href={`/truyen-tranh/${item.slug}`}>
                                <Image
                                    src={`${res?.data?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`}
                                    width={135}
                                    height={180}
                                    alt={item.name}
                                    sizes="(max-width: 50px) 2vw, max-width: 1920px) 180px)"
                                    quality="60"
                                    priority={index <= 0 ? true : false}
                                    // placeholder="blur"
                                    // blurDataURL={placeholders[index]}
                                    className="aspect-[3/4] bg-secondary dark:bg-primary"
                                ></Image>
                            </Link>
                            <figcaption className="w-[180px] mt-1.5 text-lg flex flex-col justify-between">
                                <h1 className="line-clamp-1 font-medium">
                                    <Link
                                        href={`/truyen-tranh/${item.slug}`}
                                        title={item.name}
                                    >
                                        {item.name}
                                    </Link>
                                </h1>
                                <div className="text-xs text-black/30 dark:text-white/30">
                                    <ul className="flex gap-2 line-clamp-1">
                                        {item.author.map((author, index) => (
                                            <li
                                                key={index}
                                                className="flex-shrink-0"
                                            >
                                                {author}
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="flex gap-2 line-clamp-1">
                                        {item.category.map(
                                            (category, index) => (
                                                <li
                                                    key={index}
                                                    className="flex-shrink-0"
                                                >
                                                    {category.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div>{item.status}</div>
                                </div>
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
export default SearchPage;
