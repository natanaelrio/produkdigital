"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import styles from "@/component/headernew.module.css";
import Image from "next/image";

export default function HeaderNew({ slug, title }) {
    const text = `Cek ${title ? title : 'produk ini'}, keren banget!`;
    const url = process.env.NEXT_PUBLIC_URL + '/' + slug;
    const url2 = process.env.NEXT_PUBLIC_URL;
    const message = encodeURIComponent(`${text} ${title ? url : url2}`);
    const pathname = usePathname()
    const back = pathname == "/contact" || pathname == "/terms" || pathname == "/privacy" || pathname == "/about"

    const [open, setOpen] = useState(false);
    const navRef = useRef(null);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Produk", href: "/#produk" },
        { name: "Kontak", href: "/contact" },
    ];

    // Tutup menu jika klik di luar nav
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <header className={styles.header}>
            <div className={styles.containerHeader}>
                {/* Logo */}
                <Link href="/" className={styles.logoHeader}>
                    <Image
                        src={'/logo.png'}
                        width={30}
                        height={30}
                        alt='logoinvesdigi'
                    />
                    Invesdigi
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.navHeader}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.activeLink : ""
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Icons */}
                <div className={styles.rightHeader}>
                    <Link href={`https://wa.me/?text=${message}`} target="_blank" className={styles.share}>
                        <button className={styles.shareBtn}>🔗</button>
                    </Link>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.menuIcon}>
                            {open ? "✕" : "☰"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {open && (
                <nav ref={navRef} className={styles.mobileNav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`${styles.mobileLink} ${pathname === item.href ? styles.activeLink : ""
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
