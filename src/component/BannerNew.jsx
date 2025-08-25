"use client";

import { useEffect, useState } from "react";
import styles from "@/component/BannerNew.module.css";

export default function BannerNew() {
    const keywords = [
        "Inspirasi",
        "Wawasan",
        "Kreativitas",
        "Inovasi",
        "Pengetahuan",
    ];

    const [wordIndex, setWordIndex] = useState(0); // index kata
    const [visible, setVisible] = useState([]); // index huruf yang tampil
    const letters = keywords[wordIndex].split("");

    useEffect(() => {
        setVisible([]); // reset setiap ganti kata

        letters.forEach((_, index) => {
            setTimeout(() => {
                setVisible((prev) => [...prev, index]);
            }, index * 80); // jeda per huruf
        });

        // setelah kata selesai, tunggu lalu ganti kata
        const timeout = setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % keywords.length);
        }, letters.length * 120 + 1500); // delay total

        return () => clearTimeout(timeout);
    }, [wordIndex]);

    return (
        <div>
            {letters.map((char, i) => (
                <span
                    key={i}
                    className={`${styles.word} ${visible.includes(i) ? styles.show : ""
                        }`}
                >
                    {char}
                </span>
            ))}
        </div>

    );
}
