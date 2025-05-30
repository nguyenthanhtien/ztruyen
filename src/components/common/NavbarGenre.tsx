import axios from 'axios';
import Link from 'next/link';

const NavbarGenre = async () => {
    const response = await axios.get(`https://otruyenapi.com/v1/api/the-loai`);
    const data: IGenres[] = response?.data?.data?.items;

    return (
        <nav className="flex justify-center py-3.5 sm:py-[26px] bg-secondary text-primary dark:bg-black dark:text-primary">
            <ul className="flex sm:gap-7 gap-5 text-xs lg:text-[15px] container justify-center wrapper">
                {data.slice(0, 8).map((item, index) => (
                    <li
                        key={index}
                        className={`${
                            index + 1 === 7 || index + 1 === 8
                                ? 'hidden lg:block'
                                : index + 1 === 5 || index + 1 === 6
                                  ? 'hidden sm:block'
                                  : 'block'
                        }`}
                    >
                        <Link href={`/the-loai/${item.slug}.html`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href={`/the-loai/tat-ca.html`}>Tất cả</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarGenre;
