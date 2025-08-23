import styles from '@/component/listcontent.module.css'
import { Slugify } from '@/utils/slug';
import Image from 'next/image'
import Link from 'next/link';
import { LuFileSymlink } from "react-icons/lu";

export default function ListContent({ data }) {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.judul}>
                    <div id='produk'>Temukan Buku Digital Terbaik</div>
                </div>
            </div>
            <div className={styles.contentluar}>
                <div className={styles.content2}>
                    <div className={styles.content2dalam}>
                        {data?.map((data, i) => {
                            return (
                                <Link href={`/${Slugify(data?.title)}`} className={styles.kotak} key={i}>
                                    <div className={styles.gambar}>
                                        <Image src={data?.image} alt={data?.title} width='1000' height='400' ></Image>
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.ikon}>
                                            <LuFileSymlink />
                                        </div>
                                        <div className={styles.title}>
                                            <div className={styles.judul}>
                                                {data?.title}
                                            </div>
                                            {/* <div className={styles.download}>
                                                Download File (.pdf)
                                            </div> */}
                                            <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} className={styles.deskripsi}>
                                                {/* {data?.deskripsi} */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}


                    </div>
                </div>
            </div>
        </>
    )
}