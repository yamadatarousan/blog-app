'use client'; // Next.js App Routerではクライアントコンポーネントとして指定
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const pathname = usePathname(); // 現在のURLパスを取得
    const [isMenuOpen, setIsMenuOpen] = useState(false); // モバイルメニューの開閉状態
    
    // ナビゲーションアイテムの定義
    const navItems = [
        { name: 'Posts', href: '/posts' },
        { name: 'About', href: '/about' },
    ];

    return (
        <div>hogehoohge</div>
    )
}

export default Navbar;