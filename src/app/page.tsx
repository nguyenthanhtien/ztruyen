import axios from 'axios';
import NavbarGenre from '@/components/common/NavbarGenre';
import GridCarousel from '@/app/@Home/gridCarousel';
import Carousel from '@/components/common/carousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://google.com'),
    title: 'Đọc truyện tranh Manhwa, Manga, Manhua Online - Manga Việt ',
    description:
        'Web đọc truyện tranh manhwa, manhua, manga, ngôn tình, tiên hiệp, kiếm hiệp online hay và mới nhất cập nhật liên tục tại google.com',
    keywords: [
        'doc truyen tranh',
        'manga',
        'doc manga',
        'ngon tinh',
        'tien hiep',
    ],
    alternates: {
        canonical: `/`,
        languages: {
            vi: '/vi',
        },
    },
};

export default async function Home() {
    const resHome = await axios.get(`https://otruyenapi.com/v1/api/home`);
    const resPublishing = await axios.get(
        `https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh?sort_field=updatedAt`
    );
    const resComp = await axios.get(
        `https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?sort_field=updatedAt`
    );
    const resCs = await axios.get(
        `https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat?sort_field=updatedAt`
    );

    const resNew = await axios.get(
        `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?sort_field=updatedAt`
    );

    const data = resHome?.data?.data?.items;
    const dataPublishing = resPublishing?.data?.data?.items;
    const dataComp = resComp?.data?.data?.items;
    const dataCs = resCs?.data?.data?.items;
    const dataNew = resNew?.data?.data?.items;
    return (
        <>
            <main>
                <GridCarousel data={data}></GridCarousel>
                <NavbarGenre></NavbarGenre>
                <Carousel
                    data={dataNew}
                    title="Truyện Mới Cập Nhật"
                    titleSeo={true}
                    href="danh-sach/truyen-moi"
                ></Carousel>
                <Carousel
                    data={dataCs}
                    title="Truyện Sắp Ra Mắt"
                    bgColor={true}
                    href="danh-sach/sap-ra-mat"
                ></Carousel>
                <Carousel
                    data={dataPublishing}
                    title="Truyện Đang Phát Hành"
                    href="danh-sach/dang-phat-hanh"
                ></Carousel>
                <Carousel
                    data={dataComp}
                    title="Truyện Đã Hoàn Thành"
                    bgColor={true}
                    href="danh-sach/hoan-thanh"
                ></Carousel>
            </main>
        </>
    );
}
